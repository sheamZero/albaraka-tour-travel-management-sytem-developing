// import { useAuth } from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery, } from "@tanstack/react-query";



export const useGetAllPackage = ({ page, limit } = {}) => {
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["packages", page, limit],
        queryFn: async () => {
            let url = "/packages";

            // 👉 if pagination params exist, use them
            if (page && limit) {
                url = `/packages?page=${page}&limit=${limit}`;
            }

            const { data } = await axiosSecure.get(url);
            return data;
        },
        keepPreviousData: !!page,
    });
};

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




export const useCategoryCounts = () => {
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