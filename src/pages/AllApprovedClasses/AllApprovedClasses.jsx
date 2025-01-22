import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const AllApprovedClasses = () => {
    const axiosPublic = useAxiosPublic();

    const { data: allApprovedClasses = [], refetch } = useQuery({
        queryKey: ['allApprovedClasses'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allApprovedClasses');
            return res.data;
        }
    });

    return (
        <div className='bg-background'>
            <div className='py-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-10/12 mx-auto min-h-screen'>
            {allApprovedClasses.length > 0 ?
                allApprovedClasses.map(item => <div key={item._id} className="card bg-base-100 shadow-xl">
                    <figure>
                        <img
                            className="h-60 w-full object-cover"
                            src={item.image}
                            alt="class"
                        />
                    </figure>
                    <div className="card-body bg-white shadow-lg rounded-lg p-6">
                        <div className="space-y-1">
                            {/* Title */}
                            <p className="text-lg font-semibold">
                                <span className="font-bold">Title:</span> {item.title || 'Title not available'}
                            </p>

                            {/* Name */}
                            <p className="text-lg font-semibold">
                                <span className="font-bold">Name:</span> {item.name}
                            </p>

                            {/* Price */}
                            <p className="text-lg font-semibold">
                                <span className="font-bold">Price:</span> {item.price ? `${item.price}$` : 'Price not set'}
                            </p>

                            {/* Description */}
                            <p className="text-lg font-semibold">
                                <span className=" font-bold">Description:</span>{' '}
                                {item.description ? `${item.description.slice(0, 50)}...` : 'No description'}
                            </p>

                            {/* Email */}
                            <p className="text-lg font-semibold">
                                <span className="font-bold">Email:</span> {item.email}
                            </p>

                            {/* Status */}
                            <p className="text-lg font-semibold">
                                <span className="font-bold">Status:</span> {item.status || 'Pending'}
                            </p>
                        </div>
                        <Link to={`/class/${item._id}`}>
                            <button className='btn w-full mt-5 bg-primary'>Enroll</button>
                        </Link>
                    </div>
                </div>) : 
                <h2 className='text-2xl font-semibold'>No Classes uploaded Yet</h2>
            }
        </div>
        </div>
    );
};

export default AllApprovedClasses;