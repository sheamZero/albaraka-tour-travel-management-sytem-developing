import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";



export const useGetReviewsByPackageId = (packageId) => {
    // console.log("pdkalsjls", packageId)
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


export const useGetSpecificUserReviews = () => {
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/reviews/user");
            return data;
        },
    });
};


export const useAddRateAndReview = () => {
  const axiosSecure = useAxiosSecure();

  return useMutation({
    mutationFn: async (reviewInfo) => {
      const { data } = await axiosSecure.post('/review', reviewInfo)
      return data;
    },
  })
}