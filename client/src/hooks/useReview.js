import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";



export const useGetReviewsByPackageId = (packageId) => {
    console.log("pdkalsjls", packageId)
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["reviews", packageId],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/reviews/${packageId}`);
            return data;
        },
        enabled: !!packageId,
    });
};