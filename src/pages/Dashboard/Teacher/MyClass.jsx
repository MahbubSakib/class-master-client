import React, { useContext, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { AuthContext } from '../../../provider/AuthProvider';
import { Link } from 'react-router-dom';

const MyClass = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const [selectedClass, setSelectedClass] = useState(null); // To store the class to be updated
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

    // console.log(user.email);
    const { data: myClass = [], refetch } = useQuery({
        queryKey: ['myClass', user.email], // Include email in query key for caching
        queryFn: async () => {
            const res = await axiosPublic.get('/myClass', { params: { email: user.email } });
            return res.data;
        },
    });

    // Open Modal
    const handleOpenModal = (item) => {
        setSelectedClass(item);
        setIsModalOpen(true);
    };

    // Handle Update
    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const updatedClass = {
            title: formData.get('title'),
            price: formData.get('price'),
            description: formData.get('description'),
        };

        try {
            const res = await axiosSecure.patch(`/update-class/${selectedClass._id}`, updatedClass);
            if (res.data.modifiedCount > 0) {
                Swal.fire('Success', 'Class updated successfully', 'success');
                setIsModalOpen(false);
                refetch();
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to update the class', 'error');
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/delete-class/${id}`);
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your class has been deleted.",
                            icon: "success",
                        });
                        refetch();
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: "Failed to delete the class.",
                        icon: "error",
                    });
                }
            }
        });
    };

    return (
        <div className='mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
            {myClass.map(item => (
                <div className="card card-compact bg-base-100 shadow-xl border-2 border-gray-400 p-4" key={item._id}>
                    {/* Image */}
                    <figure>
                        <img
                            className="h-40 w-full object-cover"
                            src={item.image}
                            alt="class"
                        />
                    </figure>

                    {/* Card Body */}
                    <div className="card-body grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Left Column */}
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <span title='title' className="text-gray-500 mr-2">
                                    <i className="fas fa-heading"></i>
                                </span>
                                <p className="text-sm font-medium">{item.title || 'Title not available'}</p>
                            </div>
                            <div className="flex items-center">
                                <span title='Name' className="text-gray-500 mr-2">
                                    <i className="fas fa-user"></i>
                                </span>
                                <p className="text-sm font-medium">{item.name}</p>
                            </div>
                            <div className="flex items-center">
                                <span title='Email' className="text-gray-500 mr-2">
                                    <i className="fas fa-envelope"></i>
                                </span>
                                <p className="text-sm font-medium">{item.email}</p>
                            </div>
                            <div className="flex items-center">
                                <span title='Status' className="text-gray-500 mr-2">
                                    <i className="fas fa-info-circle"></i>
                                </span>
                                <p className="text-sm font-medium capitalize">{item.status || 'pending'}</p>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <span title='Price' className="text-gray-500 mr-2">
                                    <i className="fas fa-dollar-sign"></i>
                                </span>
                                <p className="text-sm font-medium">{item.price || 'Price not set'}</p>
                            </div>
                            <div className="flex items-center">
                                <span title='Description' className="text-gray-500 mr-2">
                                    <i className="fas fa-align-left"></i>
                                </span>
                                <p className="text-sm font-medium">
                                    {item.description
                                        ? `${item.description.slice(0, 10)}...`
                                        : 'No description'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-around mt-4">
                        <button
                            onClick={() => handleOpenModal(item)}
                            className="btn btn-primary btn-sm"
                        >
                            <i className="fas fa-edit px-2"></i>
                        </button>
                        <button
                            onClick={() => handleDelete(item._id)}
                            className="btn btn-error btn-sm">
                            <i className="fas fa-trash-alt px-2"></i>
                        </button>

                        <button
                            className="btn btn-secondary btn-sm"
                            disabled={item.status !== 'approved'}
                        >
                            <Link to={`/dashboard/myClass/${item._id}`}>
                                <i className="fas fa-eye px-2"></i>
                            </Link>
                        </button>


                    </div>
                </div>
            ))}

            {/* Update Modal */}
            {isModalOpen && selectedClass && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-1/2">
                        <h3 className="text-xl font-semibold mb-4">Update Class</h3>
                        <form onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Title</label>
                                <input
                                    name="title"
                                    defaultValue={selectedClass.title}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Price</label>
                                <input
                                    name="price"
                                    type="number"
                                    defaultValue={selectedClass.price}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Description</label>
                                <textarea
                                    name="description"
                                    defaultValue={selectedClass.description}
                                    className="textarea textarea-bordered w-full"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyClass;
