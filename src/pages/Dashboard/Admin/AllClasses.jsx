import React, { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AllClasses = () => {
    const axiosPublic = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const itemsPerPage = 6; // Number of items per page

    const { data: allClasses = [], refetch } = useQuery({
        queryKey: ['allClasses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allClass');
            return res.data;
        },
    });

    const handleStatusUpdate = async (id, status) => {
        try {
            const res = await axiosPublic.patch(`/updateClassStatus/${id}`, { status });
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Success!',
                    text: `Class has been ${status}.`,
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                refetch(); // Refresh the data
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    // Pagination Logic
    const totalItems = allClasses.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = allClasses.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr className="text-center">
                            <th></th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Email</th>
                            <th>Description</th>
                            <th>Approve</th>
                            <th>Reject</th>
                            <th>Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={item._id}>
                                <th>{startIndex + index + 1}</th>
                                <td>{item.title}</td>
                                <td>
                                    <img
                                        className="w-12 rounded-full"
                                        src={item.image}
                                        alt="User"
                                    />
                                </td>
                                <td>{item.email}</td>
                                <td title={item.description}>
                                    {item.description
                                        ? `${item.description.slice(0, 15)}...`
                                        : 'No description'}
                                </td>
                                <td>
                                    <button
                                        className={`btn ${item.status === 'approved' ? 'btn-success' : 'btn-primary'}`}
                                        disabled={item.status === 'approved' || item.status === 'rejected'}
                                        onClick={() => handleStatusUpdate(item._id, 'approved')}
                                    >
                                        {item.status === 'approved' ? 'Approved' : 'Approve'}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className={`btn ${item.status === 'rejected' ? 'btn-error' : 'btn-primary'}`}
                                        disabled={item.status === 'approved' || item.status === 'rejected'}
                                        onClick={() => handleStatusUpdate(item._id, 'rejected')}
                                    >
                                        {item.status === 'rejected' ? 'Rejected' : 'Reject'}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-secondary"
                                        disabled={item.status !== 'approved'}
                                    >
                                        <Link to={`/dashboard/myClass/${item._id}`}>
                                            {item.status === 'approved'
                                                ? 'Progress'
                                                : item.status === 'rejected'
                                                ? 'Rejected'
                                                : 'Pending'}
                                        </Link>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

export default AllClasses;
