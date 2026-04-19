// import { useAuth } from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery, } from "@tanstack/react-query";



export const useGetAllPackage = () => {
    // const { user } = useAuth();
    // const email = user?.email;
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["packages",],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/packages");
            return data;
        },
        // enabled: !!email,
    });
}

export const useGetSinglePackage = (id) => {
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["package", id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/package/${id}`);
            return data;
        },
        enabled: !!id,
    });
}



export const usePackagesByCategory = (category) => {
    const axiosPublic = useAxiosPublic();

    console.log("category---------------------------------------", category)

    return useQuery({
        queryKey: ["packages", category],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/packages/category?cat=${category}`);
            return data;
        },
        enabled: !!category,
    });
};




export const useCategoryCounts = ()=>{
      const axiosPublic = useAxiosPublic();

       return useQuery({
        queryKey: ["category-counts"],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/categories-with-count");
            return data;
        },
        staleTime: 5 * 60 * 1000, // cache for 5 minutes
    });
}