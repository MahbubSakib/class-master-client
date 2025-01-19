import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useParams } from 'react-router-dom';

const ClassEnrollDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [classDetails, setClassDetails] = useState({});

    useEffect(() => {
        axiosSecure.get(`/class/${id}`).then(res => setClassDetails(res.data));
    }, [id]);
    console.log(classDetails);
    return (
        <div className='bg-background'>
            <div className='w-10/12 mx-auto py-10'>
                <h2 className='text-2xl font-semibold text-center pb-10'>Class Details</h2>
                <div className="w-8/12 mx-auto">
                    <div className="card card-side bg-white shadow-xl rounded-lg overflow-hidden">
                        <figure className="w-2/5 p-2">
                            <img src={classDetails.image} alt="Class" className="rounded-md object-cover w-full h-full" />
                        </figure>
                        <div className="card-body p-6 space-y-4">
                            <p className="text-lg font-semibold text-gray-700">Title: <span className="font-normal">{classDetails.title}</span></p>
                            <p className="text-lg font-semibold text-gray-700">Name: <span className="font-normal">{classDetails.name}</span></p>
                            <p className="text-lg font-semibold text-gray-700">Email: <span className="font-normal">{classDetails.email}</span></p>
                            <p className="text-lg font-semibold text-gray-700">Price: <span className="font-normal">${classDetails.price}</span></p>
                            <p className="text-lg font-semibold text-gray-700">Enrolled: <span className="font-normal">-</span></p>
                            <p className="text-lg font-semibold text-gray-700">Description: <span className="font-normal">{classDetails.description}</span></p>
                            <button className="bg-primary text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                                Enroll
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default ClassEnrollDetails;