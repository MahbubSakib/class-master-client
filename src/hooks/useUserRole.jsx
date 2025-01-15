import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUserRole = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: userRole, isPending: isRoleLoading } = useQuery({
        queryKey: [user?.email, 'userRole'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            console.log('User role:', res.data.role);
            return res.data?.role; // 'admin', 'teacher', or 'student'
        },
        enabled: !!user?.email, // Avoid unnecessary queries
    });

    return [userRole, isRoleLoading];
};

export default useUserRole;
