import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useEnrolledClasses = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: enrolledClasses = [], isLoading } = useQuery({
        queryKey: ['enrolledClasses', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/my-enroll-classes', { params: { email: user?.email } });
            return res.data;
        },
        enabled: !!user?.email, // Only fetch if email is available
    });

    return { enrolledClasses, isLoading };
};

export default useEnrolledClasses;
