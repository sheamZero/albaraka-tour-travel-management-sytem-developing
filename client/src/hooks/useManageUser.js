import toast from "react-hot-toast";
import { useAuth } from "./useAuth";
import useAxiosSecure from "./useAxiosSecure"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";



export const useGetAllUsers = () => {
    const { user } = useAuth();
    const email = user?.email;
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["users", email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users`);
            return data;
        },
        enabled: !!email, // only run query if email exists
    });
}


export const useMakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => {
      const { data } = await axiosSecure.patch(`/users/admin/${userId}`);
      return data;
    },

    onSuccess: (data) => {
      if (data.modifiedCount > 0 || data.success) {
        toast.success("User promoted to admin!", { position: "top-right" });

        // refetch users
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to make admin",
        { position: "top-right" }
      );
    }
  });
};

export const useMakeUser= () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => {
      const { data } = await axiosSecure.patch(`/users/user/${userId}`);
      return data;
    },

    onSuccess: (data) => {
      if (data.modifiedCount > 0 || data.success) {
        toast.success("User promoted to user!", { position: "top-right" });

        // refetch users
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to make admin",
        { position: "top-right" }
      );
    }
  });
};


export const useDeleteUser = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (userId) => {
            const { data } = await axiosSecure.delete(`/users/${userId}`);
            return data;
        },
        onSuccess: (data) => {
            if (data.deletedCount || data.success) {
                toast.success("User deleted successfully!", { position: "top-right" });
                // Invalidate and refetch users query
                queryClient.invalidateQueries({ queryKey: ["users"] });
            }
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete user", { position: "top-right" });
        }
    });
}



