import { PlusCircle, Users, CalendarCheck, Package, TrendingUp, DollarSign, } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, } from "recharts";
import { useAdminStats } from "../../../../hooks/useAdminStats";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const { data, isLoading } = useAdminStats();
  const navigate = useNavigate();

  if (isLoading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  const stats = data.bookings;

  const pieData = [
    { name: "Pending", value: stats.pending },
    { name: "Completed", value: stats.completed },
    { name: "Rejected", value: stats.rejected },
  ];

  const COLORS = ["#facc15", "#22c55e", "#ef4444"];

  return (
    <div className="p-6 space-y-6">

      {/* header */}
      <div className="bg-primary/10 p-6 rounded-2xl border shadow-sm">
        <h1 className="text-3xl font-bold text-secondary">
          Admin Dashboard
        </h1>
        <p className="text-text mt-1">
          Real-time overview of your platform activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        {/* Total Bookings */}
        <div className="p-5 rounded-xl text-white shadow-md bg-linear-to-r from-blue-500 to-indigo-600 flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">Total Bookings</p>
            <h2 className="text-2xl font-bold">{stats.total}</h2>
          </div>
          <CalendarCheck className="w-6 h-6 opacity-90" />
        </div>

        {/* Users */}
        <div className="p-5 rounded-xl text-white shadow-md bg-linear-to-r from-purple-500 to-pink-500 flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">Users</p>
            <h2 className="text-2xl font-bold">{data.users.total}</h2>
          </div>
          <Users className="w-6 h-6 opacity-90" />
        </div>

        {/* Packages */}
        <div className="p-5 rounded-xl text-white shadow-md bg-linear-to-r from-green-500 to-emerald-600 flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">Packages</p>
            <h2 className="text-2xl font-bold">{data.packages}</h2>
          </div>
          <Package className="w-6 h-6 opacity-90" />
        </div>

        {/* Revenue */}
        <div className="p-5 rounded-xl text-white shadow-md bg-linear-to-r from-yellow-500 to-orange-500 flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">Revenue</p>
            <h2 className="text-2xl font-bold">${data.revenue}</h2>
          </div>
          <DollarSign className="w-6 h-6 opacity-90" />
        </div>

        {/* Completed */}
        <div className="p-5 rounded-xl text-white shadow-md bg-linear-to-r from-emerald-500 to-teal-600 flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">Completed</p>
            <h2 className="text-2xl font-bold">{stats.completed}</h2>
          </div>
          <TrendingUp className="w-6 h-6 opacity-90" />
        </div>

      </div>

      {/* charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* line chart */}
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

        {/* pie chart */}
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

      {/* recent bookings */}
      <div className="bg-primary/10 p-5 border rounded-xl">

        <h2 className="font-semibold mb-4 text-secondary">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

          <button
            onClick={() => navigate("/dashboard/admin/add-package")}
            className="flex items-center gap-2 p-3 rounded-lg bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <PlusCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Add Package</span>
          </button>

          <button
            onClick={() => navigate("/dashboard/admin/manage-users")}
            className="flex items-center gap-2 p-3 rounded-lg bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Manage Users</span>
          </button>

          <button
            onClick={() => navigate("/dashboard/admin/all-bookings")}
            className="flex items-center gap-2 p-3 rounded-lg bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <CalendarCheck className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Bookings</span>
          </button>

          <button
            onClick={() => navigate("/dashboard/admin/all-package")}
            className="flex items-center gap-2 p-3 rounded-lg bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <Package className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Packages</span>
          </button>

        </div>
      </div>

    </div>
  );
};

export default AdminHome;