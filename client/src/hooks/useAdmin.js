
import React from 'react';
import { useAuth } from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const { user } = useAuth();
    const email = user?.email;
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${email}`);
            return res.data?.isAdmin;
        }
    })
    return { isAdmin, isAdminLoading }
};



export default useAdmin;