import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUser, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Users = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            return res.data;
        }
    });

    const handleMakeAdmin = user => {
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
                    .then(res => {
                        console.log(res.data);
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
                    .catch(err => {
                        Swal.fire({
                            title: "Error!",
                            text: "There was an issue while making this user an admin.",
                            icon: "error"
                        });
                    });
            }
        });
    }

    return (
        <div>
            <div className='flex justify-evenly my-5'>
                <h3 className='text-3xl'>All Users</h3>
                <h3 className='text-3xl'>Total Users: {users.length}</h3>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
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
                            {
                                users.map((user, index) => <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.role === 'admin' ?
                                            <button
                                                className="px-3 py-1 bg-[#d97706] text-white text-sm rounded-lg shadow hover:bg-[#d94506] transition opacity-50 cursor-not-allowed"
                                                disabled
                                            >
                                                Make Admin
                                            </button>
                                            :
                                            <button onClick={() => handleMakeAdmin(user)} className="px-3 py-1 text-white text-sm rounded-lg shadow bg-[#d97706] hover:bg-[#d94506]">
                                                Make Admin
                                            </button>}
                                    </td>
                                    <td>
                                        <img className='w-12 rounded-full' src={user.photo} alt="User Image" />
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;