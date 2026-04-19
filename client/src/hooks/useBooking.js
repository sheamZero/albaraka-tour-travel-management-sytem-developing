import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"
import { useAuth } from "./useAuth";
import toast from "react-hot-toast";



// for admin 
export const useGetAllBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["bookings"],

    queryFn: async () => {
      const { data } = await axiosSecure.get("/bookings");
      return data;
    },

    enabled: !!user?.email,
  });
};

export const useUpdateBookingStatus = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await axiosSecure.patch(
        `/bookings/status/${id}`,
        { status }
      );
      return data;
    },
    onSuccess: (data) => {
      if (data?.modifiedCount || data?.success) {
        toast.success("Booking status updated successfully");

        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        });
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update booking status");
    }
  });
};

// delete
export const useDeleteBooking = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingId) => {
      const { data } = await axiosSecure.delete(`/bookings/${bookingId}`);
      return data;
    },
    onSuccess: (data) => {
      console.log(data, " inside hooks")
      if (data.deletedCount || data.success) {
        toast.success("Booking deleted successfully!");
        // Invalidate and refetch users query
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete booking");
    }
  });
}




// for user
export const useGetAllSpecificUserBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["user-bookings", user?.email],

    queryFn: async () => {
      const { data } = await axiosSecure.get("/packages/my-bookings");
      return data;
    },

    enabled: !!user?.email,
  });
};


// add a booking item
export const usePackageBooking = () => {
  const axiosSecure = useAxiosSecure();

  return useMutation({
    mutationFn: async (packageItem) => {
      const { data } = await axiosSecure.post('/package/booking', packageItem)
      return data;
    },
  })
}
