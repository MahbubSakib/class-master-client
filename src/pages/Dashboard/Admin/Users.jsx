import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const Users = () => {
    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const itemsPerPage = 6; // Number of items per page

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', searchQuery],
        queryFn: async () => {
            const res = await axiosSecure.get('/users', {
                params: {
                    name: searchQuery, // Pass search query for name
                    email: searchQuery, // Pass search query for email
                },
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`,
                },
            });
            return res.data;
        },
    });

    const handleSearch = (e) => {
        setSearchQuery(e.target.value); // Update search input
        refetch(); // Trigger re-fetch with the updated query
    };

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to assign this user as admin. This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make them admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${user._id}`)
                    .then((res) => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${user.name} has been successfully assigned as an admin.`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was an issue while making this user an admin.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    // Pagination Logic
    const totalItems = users.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = users.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div className="flex justify-between items-center my-5">
                <h3 className="text-3xl">All Users</h3>
                <h3 className="text-3xl">Total Users: {users.length}</h3>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="border p-2 rounded-lg"
                />
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Make Admin</th>
                                <th>User Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{startIndex + index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.role === 'admin' ? (
                                            <button
                                                className="px-3 py-1 bg-[#d97706] text-white text-sm rounded-lg shadow hover:bg-[#d94506] transition opacity-50 cursor-not-allowed"
                                                disabled
                                            >
                                                Make Admin
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className="px-3 py-1 text-white text-sm rounded-lg shadow bg-[#d97706] hover:bg-[#d94506]"
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        <img
                                            className="w-12 rounded-full"
                                            src={user.photo}
                                            alt="User"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-5 space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Users;
