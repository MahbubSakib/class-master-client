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
import Users from "../pages/Dashboard/Admin/Users";
import MyProfile from "../pages/Dashboard/Admin/MyProfile";
import MyClass from "../pages/Dashboard/Teacher/MyClass";
import TeacherProfile from "../pages/Dashboard/Teacher/TeacherProfile";
import AllClasses from "../pages/Dashboard/Admin/AllClasses";
import AllApprovedClasses from "../pages/AllApprovedClasses/AllApprovedClasses";
import ClassDetails from "../pages/Dashboard/Teacher/ClassDetails";
import ClassEnrollDetails from "../pages/ClassEnrollDetails/ClassEnrollDetails";
import Payment from "../pages/Payment/Payment";
import MyEnrollClassDetails from "../pages/Dashboard/Student/MyEnrolledClassDetails";
import StudentProfile from "../pages/Dashboard/Student/StudentProfile";
import Welcome from "../pages/Dashboard/Welcome";
import Error404 from "../pages/Error/Error404";
import AboutUs from "../pages/About/AboutUs";
import ContactUs from "../pages/Contact/ContactUs";

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
                path: '/allClasses',
                element: <AllApprovedClasses></AllApprovedClasses>
            },
            {
                path: '/class/:id',
                element: <PrivateRoute><ClassEnrollDetails></ClassEnrollDetails></PrivateRoute>
            },
            {
                path: '/teachOnClassMaster',
                element: <PrivateRoute><TeachOnClassMaster></TeachOnClassMaster></PrivateRoute>
            },
            {
                path: '/payment/:id',
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/about-us',
                element: <AboutUs></AboutUs>
            },
            {
                path: 'contact-us',
                element: <ContactUs></ContactUs>
            }
        ]

    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // admin route
            {
                path: '/dashboard',
                element: <PrivateRoute><Welcome></Welcome></PrivateRoute>
            },
            {
                path: '/dashboard/teachersRequest',
                element: <AdminRoute><TeachersRequest></TeachersRequest></AdminRoute>
            },
            {
                path: '/dashboard/users',
                element: <AdminRoute><Users></Users></AdminRoute>
            },
            {
                path: '/dashboard/allClasses',
                element: <AdminRoute><AllClasses></AllClasses></AdminRoute>
            },
            {
                path: '/dashboard/adminProfile',
                element: <AdminRoute><MyProfile></MyProfile></AdminRoute>
            },

            // teacher route
            {
                path: '/dashboard/addClass',
                element: <TeacherRoute><AddClass></AddClass></TeacherRoute>
            },
            {
                path: '/dashboard/myClass',
                element: <TeacherRoute><MyClass></MyClass></TeacherRoute>
            },
            {
                path: '/dashboard/myClass/:id',
                element: <PrivateRoute><ClassDetails></ClassDetails></PrivateRoute>
            },
            {
                path: '/dashboard/teacherProfile',
                element: <TeacherRoute><MyProfile></MyProfile></TeacherRoute>
            },

            // student route
            {
                path: '/dashboard/myEnrollClass',
                element: <StudentRoute><MyEnrollClass></MyEnrollClass></StudentRoute>
            },
            {
                path: '/dashboard/studentProfile',
                element: <StudentRoute><MyProfile></MyProfile></StudentRoute>
            },
            {
                path: '/dashboard/myEnrollClass/:id',
                element: <StudentRoute><MyEnrollClassDetails></MyEnrollClassDetails></StudentRoute>
            },

        ]
    },
    {
        path: "*",
        element: <Error404></Error404>
    }
]);

export default Router;