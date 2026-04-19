import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"
import { useAuth } from "./useAuth";




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
