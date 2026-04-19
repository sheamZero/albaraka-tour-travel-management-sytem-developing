import React from "react";
import { useDeleteBooking, useGetAllBookings, useUpdateBookingStatus } from "../../../../hooks/useBooking";

import BookingTableRows from "../../../../components/Dashboard/AllBookings/BookingTableRows";
import { confirmAction } from "../../../../utils/swal";

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

    // approve
    const handleApproveBooking = (id) => {
        updateStatus({ id, status: "approved" });
    }
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
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-secondary">
                    All Bookings (    {bookings.length})
                </h2>

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
                                    handleApproveBooking={handleApproveBooking}
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