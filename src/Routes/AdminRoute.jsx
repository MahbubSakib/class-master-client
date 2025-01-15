import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";

const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const [isAdmin, isAdminLoading]= useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <Loader></Loader>
    }

    if(user && isAdmin){
        return children;
    }

    if (!isAdmin) {
        return <Navigate state={location.pathname} to="/" replace />;
    }
};

export default AdminRoute;