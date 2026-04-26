import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"
import { useAuth } from "./useAuth";


export const useGetSpecificUserPayment = () =>{
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();

    return useQuery({
    queryKey: ["user-payments", user?.email],

    queryFn: async () => {
      const { data } = await axiosSecure.get("/my-payments");
      return data;
    },

    enabled: !!user?.email,
  });
}