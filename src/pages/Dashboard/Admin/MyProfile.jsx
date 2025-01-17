import React, { useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../provider/AuthProvider';
import { FaTrashAlt, FaUser, FaUsers } from 'react-icons/fa';

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: userProfile = {}, isLoading, isError } = useQuery({
        queryKey: ['myProfile', user?.email],
        queryFn: async () => {
            if (!user?.email) throw new Error('User email not available');
            const res = await axiosSecure.get(`/user-profile?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email // Only run the query if the email exists
    });

    if (isLoading) {
        return <p className="text-center text-gray-500">Loading profile...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-500">Failed to load profile. Please try again later.</p>;
    }

    return (
        <div className="max-w-md mx-auto bg-gradient-to-r from-blue-500 via-teal-500 to-blue-600 text-white shadow-xl rounded-2xl p-8 mt-10">
            <h2 className="text-3xl font-extrabold text-center text-white mb-8">My Profile</h2>
            <div className="flex flex-col items-center space-y-6">
                {/* Profile Image */}
                <img
                    src={userProfile.photo || 'https://via.placeholder.com/150'}
                    alt={userProfile.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl transform transition-all duration-300 hover:scale-110"
                />
                {/* User Information */}
                <div className="text-center space-y-4">
                    <p className="text-2xl font-semibold">{userProfile.name}</p>
                    <p className="text-sm text-gray-200 uppercase">{userProfile.role}</p>
                    <p className="text-sm text-gray-100">{userProfile.email}</p>
                    <p className="text-sm text-gray-100">{userProfile.phone || 'Phone not available'}</p>
                </div>
            </div>
        </div>

    );
};

export default MyProfile;
