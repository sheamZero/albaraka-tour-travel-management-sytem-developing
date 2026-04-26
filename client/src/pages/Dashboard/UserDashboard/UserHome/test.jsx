import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CreditCard, MapPin, Heart } from "lucide-react";

const UserHome = () => {
  return (
    <div className="space-y-6 px-4 lg:px-10">

      {/* Welcome Section */}
      <div className="bg-primary/10 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-primary">
          Welcome back, Traveler 👋
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage your trips, bookings, and favorite destinations here.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Trips
            </CardTitle>
            <MapPin className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-muted-foreground">
              Trips booked so far
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Trips
            </CardTitle>
            <Calendar className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs text-muted-foreground">
              Upcoming travel plans
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Payments
            </CardTitle>
            <CreditCard className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$2,400</p>
            <p className="text-xs text-muted-foreground">
              Total spent on trips
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Wishlist
            </CardTitle>
            <Heart className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">5</p>
            <p className="text-xs text-muted-foreground">
              Saved destinations
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Upcoming Trips */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Trips</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">

            <div className="flex items-center justify-between border rounded-lg p-4">
              <div>
                <h4 className="font-medium">Cox’s Bazar Beach Tour</h4>
                <p className="text-sm text-gray-500">
                  12 June - 15 June
                </p>
              </div>

              <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                Confirmed
              </span>
            </div>

            <div className="flex items-center justify-between border rounded-lg p-4">
              <div>
                <h4 className="font-medium">Sajek Valley Adventure</h4>
                <p className="text-sm text-gray-500">
                  2 July - 4 July
                </p>
              </div>

              <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                Pending
              </span>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">

            <div className="flex justify-between border rounded-lg p-3">
              <span>Bandarban Hill Track</span>
              <span className="text-sm text-gray-500">Paid</span>
            </div>

            <div className="flex justify-between border rounded-lg p-3">
              <span>Saint Martin Island</span>
              <span className="text-sm text-gray-500">Paid</span>
            </div>

            <div className="flex justify-between border rounded-lg p-3">
              <span>Sundarbans Wildlife Tour</span>
              <span className="text-sm text-gray-500">Pending</span>
            </div>

          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default UserHome;