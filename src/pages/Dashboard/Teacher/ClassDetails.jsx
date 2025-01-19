import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ClassDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [classDetails, setClassDetails] = useState({});
    const [assignments, setAssignments] = useState([]);
    const [submissions, setSubmissions] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Fetch class details
        axiosSecure.get(`/class/${id}`).then(res => setClassDetails(res.data));

        // Fetch assignments
        axiosSecure.get(`/assignments/${id}`).then(res => setAssignments(res.data));

        // Fetch total submissions
        axiosSecure.get(`/submissions/${id}`).then(res => setSubmissions(res.data.totalSubmissions));
    }, [id]);

    const handleAddAssignment = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newAssignment = {
            title: formData.get('title'),
            deadline: formData.get('deadline'),
            description: formData.get('description'),
            classId: id,
        };

        try {
            const res = await axiosSecure.post('/assignment', newAssignment);
            if (res.data.insertedId) {
                Swal.fire('Success', 'Assignment added successfully', 'success');
                setAssignments(prev => [...prev, newAssignment]);
                setIsModalOpen(false);
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to add assignment', 'error');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Class Progress</h2>

            {/* Progress Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card shadow p-4">
                    <h3 className="text-lg font-semibold">Total Enrollment</h3>
                    <p>{classDetails.totalEnrollment || 0}</p>
                </div>
                <div className="card shadow p-4">
                    <h3 className="text-lg font-semibold">Total Assignments</h3>
                    <p>{assignments.length}</p>
                </div>
                <div className="card shadow p-4">
                    <h3 className="text-lg font-semibold">Total Submissions</h3>
                    <p>{submissions}</p>
                </div>
            </div>

            {/* Add Assignment Section */}
            <div className="mt-6">
                <button
                    className="btn btn-primary"
                    onClick={() => setIsModalOpen(true)}
                >
                    Create Assignment
                </button>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="modal-box">
                            <form onSubmit={handleAddAssignment} className="space-y-2">
                                {/* Title */}
                                <div className='flex gap-2'>
                                    <div className="form-group w-full">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            className="input input-bordered w-full px-4 py-2 rounded-lg border-gray-300 focus:ring focus:ring-blue-300 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    {/* Deadline */}
                                    <div className="form-group w-full">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                                        <input
                                            type="date"
                                            name="deadline"
                                            className="input input-bordered w-full px-4 py-2 rounded-lg border-gray-300 focus:ring focus:ring-blue-300 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="form-group">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        className="textarea textarea-bordered w-full px-4 py-2 rounded-lg border-gray-300 focus:ring focus:ring-blue-300 focus:border-blue-500"
                                        rows="2"
                                        required
                                    ></textarea>
                                </div>

                                {/* Buttons */}
                                <div className="form-group mt-4 flex justify-end space-x-2">
                                    <button type="submit" className="btn btn-success px-6 py-2 rounded-lg shadow-md hover:bg-green-700">
                                        Add Assignment
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-error px-6 py-2 rounded-lg shadow-md hover:bg-red-700"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                )}
            </div>

            <h2 className='text-xl font-semibold text-center mt-5'>Assignments</h2>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Deadline</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                assignments.map((assignment, index) => <tr>
                                    <th>{index + 1}</th>
                                    <td>{assignment.title}</td>
                                    <td>{assignment.description}</td>
                                    <td>{assignment.deadline}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ClassDetails;
