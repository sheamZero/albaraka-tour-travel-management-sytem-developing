import React from "react";
import {
  Users,
  CalendarCheck,
  Package,
  TrendingUp,
  DollarSign,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { useAdminStats } from "../../../../hooks/useAdminStats";

const AdminHome = () => {
  const { data, isLoading } = useAdminStats();

  if (isLoading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  console.log("data", data);

  const stats = data.bookings;

  // -------------------------
  // PIE DATA
  // -------------------------
  const pieData = [
    { name: "Pending", value: stats.pending },
    { name: "Completed", value: stats.completed },
    { name: "Rejected", value: stats.rejected },
  ];

  const COLORS = ["#facc15", "#22c55e", "#ef4444"];

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="bg-primary/10 p-6 rounded-2xl border shadow-sm">
        <h1 className="text-3xl font-bold text-secondary">
          Admin Dashboard
        </h1>
        <p className="text-text mt-1">
          Real-time overview of your platform activity.
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        <div className="bg-white p-5 border rounded-xl flex justify-between">
          <div>
            <p>Total Bookings</p>
            <h2 className="text-2xl font-bold text-primary">
              {stats.total}
            </h2>
          </div>
          <CalendarCheck />
        </div>

        <div className="bg-white p-5 border rounded-xl flex justify-between">
          <div>
            <p>Users</p>
            <h2 className="text-2xl font-bold text-primary">
              {data.users.total}
            </h2>
          </div>
          <Users />
        </div>

        <div className="bg-white p-5 border rounded-xl flex justify-between">
          <div>
            <p>Packages</p>
            <h2 className="text-2xl font-bold text-primary">
              {data.packages}
            </h2>
          </div>
          <Package />
        </div>

        <div className="bg-white p-5 border rounded-xl flex justify-between">
          <div>
            <p>Revenue</p>
            <h2 className="text-2xl font-bold text-primary">
              ${data.revenue}
            </h2>
          </div>
          <DollarSign />
        </div>

        <div className="bg-white p-5 border rounded-xl flex justify-between">
          <div>
            <p>Completed</p>
            <h2 className="text-2xl font-bold text-green-600">
              {stats.completed}
            </h2>
          </div>
          <TrendingUp />
        </div>

      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LINE CHART */}
        <div className="bg-white p-5 border rounded-xl">
          <h2 className="font-semibold mb-4">Booking Trend (7 Days)</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.bookingTrend}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white p-5 border rounded-xl">
          <h2 className="font-semibold mb-4">Booking Status</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={100}>
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* RECENT BOOKINGS */}
      <div className="bg-white p-5 border rounded-xl">
        <h2 className="font-semibold mb-4">Recent Bookings</h2>

        <p className="text-text">
          You can now render last 5 bookings here using your booking API.
        </p>
      </div>

    </div>
  );
};

export default AdminHome;