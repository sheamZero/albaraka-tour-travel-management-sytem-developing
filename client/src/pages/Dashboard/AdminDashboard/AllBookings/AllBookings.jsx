import React from "react";
import { useDeleteBooking, useGetAllBookings, useUpdateBookingStatus } from "../../../../hooks/useBooking";

import BookingTableRows from "../../../../components/Dashboard/AllBookings/BookingTableRows";
import { confirmAction } from "../../../../utils/swal";
import { CalendarCheck } from "lucide-react";

const AllBookings = () => {
    const { data, isLoading } = useGetAllBookings();
    const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdateBookingStatus();
    const { mutate: deleteBooking, isPending: isDeletePending } = useDeleteBooking();

    if (isLoading)
        return (
            <div className="p-6 text-center text-secondary/70">
                Loading bookings...
            </div>
        );
    const bookings = data?.data || [];

    // reject
    const handleRejectBooking = (id) => {
        updateStatus({ id, status: "rejected" });
    }
    // completed
    const handleCompleteBooking = (id) => {
        updateStatus({ id, status: "completed" });
    }
    // delte
    const handleDeleteBooking = async (id) => {
        const isConfirmed = await confirmAction({
            title: "Delete Booking?",
            text: "This action cannot be undone!",
            confirmText: "Yes, delete it",
        });

        if (!isConfirmed) return;

        deleteBooking(id);
    };
    return (
        <div className="p-6">
            {/* Header */}
            <div className="bg-primary/10 p-6 rounded-2xl shadow-sm border mb-6 flex items-center justify-between">

                {/* Left */}
                <div>
                    <h1 className="text-2xl font-bold text-secondary flex items-center gap-2">
                        <CalendarCheck className="text-primary w-6 h-6" />
                        All Bookings
                    </h1>

                    <p className="text-text mt-1">
                        Manage your trips, bookings and reviews from here.
                    </p>
                </div>

                {/* Right (Total Count) */}
                <div className="text-right">
                    <p className="text-sm text-text">Total Bookings</p>
                    <h2 className="text-2xl font-bold text-primary">
                        {bookings.length}
                    </h2>
                </div>

            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-secondary/10 bg-white shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-primary text-white text-lg uppercase tracking-wider">
                        <tr>
                            <th className="p-4 text-left">#</th>
                            <th className="p-4 text-left">User</th>
                            <th className="p-4 text-left">Package</th>
                            <th className="p-4 text-left">Dates</th>
                            <th className="p-4 text-left">Price</th>
                            <th className="p-4 text-left">Payment</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-secondary/10">
                        {
                            bookings.map((item, index) => (
                                <BookingTableRows
                                    isDeletePending={isDeletePending}
                                    isUpdatingStatus={isUpdatingStatus}
                                    key={item._id}
                                    item={item}
                                    index={index}
                                    // handleApproveBooking={handleApproveBooking}
                                    handleRejectBooking={handleRejectBooking}
                                    handleDeleteBooking={handleDeleteBooking}
                                    handleCompleteBooking={handleCompleteBooking}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBookings;