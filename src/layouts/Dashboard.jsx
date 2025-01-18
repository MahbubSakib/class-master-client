import React from 'react';
import { FaAccusoft, FaBook, FaCalendar, FaClipboard, FaEnvelope, FaEnvelopeSquare, FaEnvira, FaHome, FaHourglass, FaList, FaMemory, FaSchool, FaShoppingCart, FaSymfony, FaUser, FaUsers, FaUtensils } from 'react-icons/fa';
import { MdApproval } from "react-icons/md";
import { NavLink, Outlet } from 'react-router-dom';
// import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';
import useUserRole from '../hooks/useUserRole';

const Dashboard = () => {
    // const [cart] = useCart();
    // get isAdmin value from database
    const [userRole, isRoleLoading] = useUserRole();
    return (
        <div className='flex w-11/12'>
            <div className='w-64 min-h-screen bg-orange-400'>
                <ul className='menu p-4'>
                    {userRole === "admin" && (
                        <>
                            <li>
                                <NavLink to={'/dashboard/teachersRequest'}>
                                    <MdApproval />
                                    Teachers Request
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/users'}>
                                    <FaUsers></FaUsers>
                                    Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/allClasses'}>
                                    <FaList></FaList>
                                    All Classes
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/adminProfile'}>
                                    <FaBook></FaBook>
                                    My Profile
                                </NavLink>
                            </li>

                        </>

                    )}
                    {userRole === "teacher" && (
                        <>
                            <li>
                                <NavLink to={'/dashboard/addClass'}>
                                    <FaClipboard></FaClipboard>
                                    Add Class
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/myClass'}>
                                    <FaHourglass></FaHourglass>
                                    My Class
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/teacherProfile'}>
                                    <FaBook></FaBook>
                                    My Profile
                                </NavLink>
                            </li>
                        </>
                    )}
                    {userRole === "student" && (
                        <>
                            <li>
                                <NavLink to={'/dashboard/myEnrollClass'}>
                                    <FaSchool></FaSchool>
                                    My Enroll Class
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/studentProfile'}>
                                    <FaBook></FaBook>
                                    My Profile
                                </NavLink>
                            </li>
                        </>


                    )}



                    <div className='divider'></div>
                    <li>
                        <NavLink to={'/'}>
                            <FaHome></FaHome>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/'}>
                            <FaEnvelope></FaEnvelope>
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className='flex-1 p-8'>
                <Outlet>

                </Outlet>
            </div>
        </div>
    );
};

export default Dashboard;