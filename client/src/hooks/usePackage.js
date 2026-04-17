import { useAuth } from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery, } from "@tanstack/react-query";



export const useGetAllPackage = ()=>{
    const { user } = useAuth();
    const email = user?.email;
    const axiosSecure = useAxiosSecure();

    return useQuery({
        queryKey: ["users", email],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/packages");
            return data;
        },
        enabled: !!email, 
    });
}