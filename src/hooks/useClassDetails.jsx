import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from './useAxiosSecure'; // Import your secure Axios instance
import useAxiosPublic from './useAxiosPublic';

const useClassDetails = (id) => {
    const axiosPublic = useAxiosPublic();

    // Use the `useQuery` hook to fetch class details
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['classDetails', id],
        queryFn: async () => {
            if (!id) return null; // Handle cases where ID is not provided
            const res = await axiosPublic.get(`/class/${id}`);
            return res.data;
        },
        enabled: !!id, // Only fetch if ID is available
    });

    return { classDetails: data, isLoading, error, refetch };
};

export default useClassDetails;
