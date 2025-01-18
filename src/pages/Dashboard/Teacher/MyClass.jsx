import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const MyClass = () => {
    const axiosSecure = useAxiosSecure();

    const { data: myClass = [], refetch } = useQuery({
        queryKey: ['myClass'],
        queryFn: async () => {
            const res = await axiosSecure.get('/myClass');
            return res.data;
        },
    });

    return (
        <div className='mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
            {
                myClass.map(item => (
                    <div className="card card-compact bg-base-100 shadow-xl border-2 border-gray-400 p-4">
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
                            <button className="btn btn-primary btn-sm">
                                <i className="fas fa-edit px-2"></i>
                            </button>
                            <button className="btn btn-error btn-sm">
                                <i className="fas fa-trash-alt px-2"></i>
                            </button>
                            <button className="btn btn-secondary btn-sm">
                                <i className="fas fa-eye px-2"></i>
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default MyClass;