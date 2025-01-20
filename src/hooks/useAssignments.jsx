import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAssignments = (classId) => {
    const axiosSecure = useAxiosSecure();

    const { data: assignments = [], isLoading } = useQuery({
        queryKey: ['assignments', classId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assignments/${classId}`);
            return res.data;
        },
        enabled: !!classId, // Fetch only if classId is available
    });

    return { assignments, isLoading };
};

export default useAssignments;
