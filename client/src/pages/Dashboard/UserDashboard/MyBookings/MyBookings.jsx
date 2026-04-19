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

const MyBookings = () => {
  const { data: mybookings = [], isLoading } =
    useGetAllSpecificUserBookings();

  const [filter, setFilter] = useState("all");

  if (isLoading) return <p>Loading...</p>;

  const filteredBookings =
    filter === "all"
      ? mybookings
      : mybookings.filter((b) => b.status === filter);

      console.log("filterd booking", filteredBookings)

  return (
    <section className="p-6">
      {/* Header with Dropdown */}
      <div className="flex items-center gap-10 mb-6">
        <h1 className="text-2xl text-secondary font-bold">
          My Bookings ({filteredBookings.length})
        </h1>

        {/* Dropdown Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            {["all", "pending", "completed"].map((tab) => (
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
      {filteredBookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        /* Grid Cards */
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyBookings;