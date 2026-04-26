import { SmilePlus } from "lucide-react";
import React from "react";
import {
  FaSuitcaseRolling,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["user-statistic"],
    queryFn: async () => {
      const res = await axiosSecure.get("/userStatistics");
      return res.data;
    },
  });

  if (isLoading) return <p>loading...</p>;

  const stats = data.stats;
  const bookingTrendData = data.bookingTrendData || [];
  const recentBookings = data.recentBookings || []
  const COLORS = ["#22c55e", "#facc15"];

  return (
    <div className="p-6 space-y-6">


      <div className="bg-primary/10 p-6 rounded-2xl shadow-sm border">
        <h1 className="text-2xl font-bold text-secondary flex items-center gap-2">
          <span>Welcome back</span>
          <SmilePlus className="text-yellow-500" />
        </h1>
        <p className="text-text mt-1">
          Manage your trips, bookings and reviews from here.
        </p>
      </div>

      {/* 🔹 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Total Bookings */}
        <div className="p-5 rounded-xl shadow-sm text-white flex items-center gap-4 bg-linear-to-r from-blue-500 to-indigo-500">
          <FaSuitcaseRolling className="text-2xl" />
          <div>
            <p className="text-sm">Total Bookings</p>
            <h2 className="text-xl font-bold">{stats.total}</h2>
          </div>
        </div>

        {/* Completed */}
        <div className="p-5 rounded-xl shadow-sm text-white flex items-center gap-4 bg-linear-to-r from-green-500 to-emerald-600">
          <FaCheckCircle className="text-2xl" />
          <div>
            <p className="text-sm ">Completed</p>
            <h2 className="text-xl font-bold">{stats.completed}</h2>
          </div>
        </div>

        {/* Pending */}
        <div className="p-5 rounded-xl shadow-sm text-white flex items-center gap-4 bg-linear-to-r from-orange-400 to-orange-500">
          <FaClock className="text-2xl" />
          <div>
            <p className="text-sm">Pending</p>
            <h2 className="text-xl font-bold">{stats.pending}</h2>
          </div>
        </div>

        {/* Total Spent */}
        <div className="p-5 rounded-xl shadow-sm text-white flex items-center gap-4 bg-linear-to-r from-purple-500 to-pink-500">
          <span className="text-2xl font-bold ">$</span>
          <div>
            <p className="text-sm">Total Spent</p>
            <h2 className="text-xl font-bold">${stats.totalPay}</h2>
          </div>
        </div>

      </div>

      {/* 🔹 Chart + Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 📊 Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-lg font-semibold text-secondary mb-4">
            Booking Trend
          </h2>

          <div className="w-full h-64">
            <ResponsiveContainer>
              <LineChart data={bookingTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#22c55e"
                  strokeWidth={2}
                />

                <Line
                  type="monotone"
                  dataKey="pending"
                  stroke="#facc15"
                  strokeWidth={2}
                />

                <Line
                  type="monotone"
                  dataKey="confirmed"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 📦 Recent Bookings */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">
            Recent Bookings
          </h2>

          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex justify-between items-center border p-3 rounded-lg"
              >
                <div>
                  <p className="font-medium">{booking.title}</p>

                  {booking.status === "completed" && (
                    <button className="text-xs text-primary mt-1">
                      Write Review
                    </button>
                  )}
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${booking.status === "completed"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                    }`}
                >
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 CTA */}
      <div className="bg-primary text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">
            Explore new destinations 🌍
          </h2>
          <p className="text-sm opacity-90">
            Find your next adventure and book your dream trip.
          </p>
        </div>

        <button 
        onClick={()=>navigate("/packages")}
        className="bg-white text-primary px-5 py-2 rounded-full font-semibold hover:opacity-90">
          Browse Packages
        </button>
      </div>

    </div>
  );
};

export default UserHome;