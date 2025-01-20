import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useClassEnrollMent = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useContext(AuthContext);
    const { refetch, data: classEnroll = [] } = useQuery({
        queryKey: ['classEnroll', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/class/${id}`);
            return res.data;
        }
    })

    return [classEnroll, refetch]
};

export default useClassEnrollMent;