import React, { useState } from "react";
import { useGetAllSpecificUserBookings } from "../../../../hooks/useBooking";
import BookingCard from "../../../../components/Dashboard/MyBookings/BookingCard";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import ReviewPackageModal from "../../../../components/Modals/ReviewPackageModal";
import PaymentModal from "../../../../components/Modals/PaymentModal";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [paymentModal, setPaymentModal] = useState(false);
  const [selectedPaymentBooking, setSelectedPaymentBooking] = useState(null);

  const [reviewModal, setReviewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { data: mybookings = [], isLoading } = useGetAllSpecificUserBookings();

  const [filter, setFilter] = useState("all");

  if (isLoading) return <p>Loading...</p>;

  const filteredBookings =
    filter === "all"
      ? mybookings
      : mybookings.filter((b) => b.status === filter);



  const handlePay = (booking) => {
    setSelectedPaymentBooking(booking);
    setPaymentModal(true);
  };

  const handlePaymentConfirm = async (method) => {
    console.log("click method : ", method)
    console.log("click booking : ", selectedPaymentBooking)
    if (method === "sslcommerz") {
      try {
        const res = await axiosSecure.post("/create-sslcz-payment", {
          bookingId: selectedPaymentBooking._id
        });

        console.log("response ", res)

        const gatewayUrl = res.data.url;

        window.location.replace(gatewayUrl);
      } catch (error) {
        console.error(error?.message);
      }
    }
  };

  const handleRateUs = (booking) => {
    setSelectedBooking(booking);
    setReviewModal(true);
  };

  // console.log("filterd booking", filteredBookings)

  return (
    <section className="px-4 lg:px-10 py-6">
      <div className="bg-primary/10 text-secondary p-5 rounded-xl shadow text-left flex  gap-10 mb-6">
        <div className=" ">
          <h2 className="text-xl font-bold">My Bookings</h2>
          <p className="text-sm opacity-80 mt-1">
            Total Transactions: {filteredBookings.length}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {["all", "pending", "rejected", "completed"].map((tab) => (
              <DropdownMenuItem
                key={tab}
                onClick={() => setFilter(tab)}
                className={filter === tab ? "font-semibold" : ""}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>


      {/* Empty State */}
      {
        filteredBookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          /* Grid Cards */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              filteredBookings.map((booking) => (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  handleRateUs={handleRateUs}
                  handlePay={handlePay}
                />
              ))
            }
          </div>
        )
      }


      <PaymentModal
        open={paymentModal}
        setOpen={setPaymentModal}
        booking={selectedPaymentBooking}
        handlePaymentConfirm={handlePaymentConfirm}
      />

      <ReviewPackageModal
        open={reviewModal}
        setOpen={setReviewModal}
        booking={selectedBooking}
      />


    </section>
  );
};

export default MyBookings;