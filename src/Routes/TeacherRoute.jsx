import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useUserRole from "../hooks/useUserRole";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";

const TeacherRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [userRole, isRoleLoading] = useUserRole();
    const location = useLocation();

    if (loading || isRoleLoading) {
        return <Loader />;
    }

    // Explicitly check if the role is "teacher"
    if (user && userRole === "teacher") {
        return children;
    }

    // Redirect for unauthorized users
    return <Navigate state={{ from: location }} to="/" replace />;
};

export default TeacherRoute;
