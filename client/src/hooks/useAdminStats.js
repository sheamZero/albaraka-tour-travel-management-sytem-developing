import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

export const useAdminStats = () => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-statistics");
      return res.data.data;
    },
  });
};