// import { useAuth } from "./useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";



export const useGetAllPackage = ({ page, limit } = {}) => {
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["packages", page, limit],
        queryFn: async () => {
            let url = "/packages";

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

export const useUpdatePackage = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }) => {
            const res = await axiosSecure.patch(`/admin/package/${id}`, data);
            return res.data;
        },

        onSuccess: (data) => {
            if (data?.modifiedCount > 0 || data?.success) {
                toast.success("Package updated successfully!");

                queryClient.invalidateQueries({ queryKey: ["packages"] });
            } else {
                toast.error("No changes made");
            }
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message || "Update failed"
            );
        },
    });
};

export const useDeletePackage = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/admin/package/${id}`);
            return data;
        },

        onSuccess: (data) => {
            // MongoDB deleteOne → deletedCount
            if (data?.deletedCount > 0 || data?.success) {
                toast.success("Package deleted successfully!", {
                    position: "top-right",
                });

                // 🔹 correct query key
                queryClient.invalidateQueries({ queryKey: ["packages"] });
            } else {
                toast.error("Failed to delete package");
            }
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message || "Delete failed",
                { position: "top-right" }
            );
        },
    });
};