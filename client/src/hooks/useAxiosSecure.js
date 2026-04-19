import axios from "axios";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { signOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = axiosSecure.interceptors.response.use(
            (res) => res,
            async (error) => {

                const status = error?.response?.status;

                if (status === 401 || status === 403) {
                    await signOutUser();
                    navigate("/signin", { replace: true, state: {} });
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.response.eject(interceptor);
        };

    }, [signOutUser, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;