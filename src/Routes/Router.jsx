import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layouts/Dashboard";
import AdminRoute from "./AdminRoute";
import TeachersRequest from "../pages/Dashboard/Admin/TeachersRequest";
import TeacherRoute from "./TeacherRoute";
import StudentRoute from "./StudentRoute";
import AddClass from "../pages/Dashboard/Teacher/AddClass";
import MyEnrollClass from "../pages/Dashboard/Student/MyEnrollClass";
import TeachOnClassMaster from "../pages/TeachOnClassMaster/TeachOnClassMaster";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/teachOnClassMaster',
                element: <PrivateRoute><TeachOnClassMaster></TeachOnClassMaster></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]

    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // admin route
            {
                path: '/dashboard/teachersRequest',
                element: <AdminRoute><TeachersRequest></TeachersRequest></AdminRoute>
            },

            // teacher route
            {
                path: '/dashboard/addClass',
                element: <TeacherRoute><AddClass></AddClass></TeacherRoute>
            },

            // student route
            {
                path: '/dashboard/myEnrollClass',
                element: <StudentRoute><MyEnrollClass></MyEnrollClass></StudentRoute>
            },
            
        ]
    }
]);

export default Router;