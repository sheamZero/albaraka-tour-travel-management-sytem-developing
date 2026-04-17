// import { useAuth } from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery, } from "@tanstack/react-query";



export const useGetAllPackage = () => {
    // const { user } = useAuth();
    // const email = user?.email;
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["packages", ],
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