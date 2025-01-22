import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import image from "../../assets/stats.jpg"

const StatsSection = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalClasses, setTotalClasses] = useState(0);
    const [totalEnrollments, setTotalEnrollments] = useState(0);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        // Fetch total users
        const fetchTotalUsers = async () => {
            try {
                const res = await axiosSecure.get('/total-users');
                setTotalUsers(res.data.totalUsers);
            } catch (error) {
                console.error('Error fetching total users:', error);
            }
        };

        // Fetch total classes
        const fetchTotalClasses = async () => {
            try {
                const res = await axiosSecure.get('/total-classes');
                setTotalClasses(res.data.totalClasses);
            } catch (error) {
                console.error('Error fetching total classes:', error);
            }
        };

        // Fetch total enrollments
        const fetchTotalEnrollments = async () => {
            try {
                const res = await axiosSecure.get('/total-enrollments');
                setTotalEnrollments(res.data.totalEnrollments);
            } catch (error) {
                console.error('Error fetching total enrollments:', error);
            }
        };

        fetchTotalUsers();
        fetchTotalClasses();
        fetchTotalEnrollments();
    }, []);

    return (
        <div className="stats-section py-16">
            <h2 className="text-4xl font-bold text-center text-primary mb-10">Stats</h2>
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left side: Stats Cards */}
                <div className="stats-cards space-y-8">
                    <div className="stat-card bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-center">Total Users</h3>
                        <p className="text-4xl font-bold text-center text-blue-500">{totalUsers}</p>
                    </div>
                    <div className="stat-card bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-center">Total Classes</h3>
                        <p className="text-4xl font-bold text-center text-blue-500">{totalClasses}</p>
                    </div>
                    <div className="stat-card bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-center">Total Enrollments</h3>
                        <p className="text-4xl font-bold text-center text-blue-500">{totalEnrollments}</p>
                    </div>
                </div>

                {/* Right side: Image */}
                <div className="right-side text-center">
                    <img
                        src={image}
                        alt="Website Image"
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default StatsSection;
