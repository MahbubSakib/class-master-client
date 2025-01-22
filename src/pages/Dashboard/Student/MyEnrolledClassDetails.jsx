import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAssignments from '../../../hooks/useAssignments';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import ReactStars from "react-rating-stars-component";
import { AuthContext } from '../../../provider/AuthProvider';

const MyEnrollClassDetails = () => {
    const { id: classId } = useParams();
    const { assignments, isLoading } = useAssignments(classId);
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);
    const [submissionLink, setSubmissionLink] = useState('');
    const { user } = useContext(AuthContext);

    // Handle rating change
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    // Handle evaluation submission
    // Handle evaluation submission
    const handleEvaluationSubmit = async (e) => {
        e.preventDefault();

        if (!rating) {
            Swal.fire({
                title: 'Error!',
                text: 'Rating is required. Please provide a rating.',
                icon: 'error',
                confirmButtonText: 'Close',
            });
            return; // Stop form submission
        }

        const evaluationData = {
            classId,
            studentEmail: user.email,
            studentName: user.displayName,
            studentImage: user.photoURL,
            description,
            rating,
        };

        try {
            const res = await axiosSecure.post('/submit-evaluation', evaluationData);
            console.log(res.data); // Debug response

            if (res.data?.insertedId) {
                Swal.fire('Success', `Evaluation for submitted successfully!`, 'success');
                setIsModalOpen(false); // Close modal
                setDescription(''); // Reset fields
                setRating(0);
            } else {
                throw new Error('Failed to submit evaluation.');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to submit evaluation.', 'error');
        }
    };



    // Open submission modal for assignments
    const openSubmitModal = (assignmentId) => {
        setSelectedAssignmentId(assignmentId);
        setIsSubmitModalOpen(true);
    };

    // Handle assignment submission
    const handleAssignmentSubmit = async (e) => {
        e.preventDefault();

        const assignmentData = {
            assignmentId: selectedAssignmentId,
            studentEmail: user?.email,
            submissionData: submissionLink, // Correcting the naming
        };

        try {
            const res = await axiosSecure.post('/submit-assignment', assignmentData);
            console.log(res.data); // Debug response

            if (res.data?.insertedId) {
                Swal.fire('Success', 'Assignment submitted successfully', 'success');
                setIsSubmitModalOpen(false); // Close modal
                setSubmissionLink(''); // Reset fields
            } else {
                throw new Error('Failed to submit assignment.');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to submit assignment', 'error');
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            {/* Teaching Evaluation Button */}
            <button
                className="btn bg-primary mt-6"
                onClick={() => setIsModalOpen(true)}
            >
                Teaching Evaluation Report
            </button>
            {/* Assignments Table */}
            <div className='overflow-x-auto'>
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Deadline</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.map((assignment) => (
                            <tr key={assignment._id}>
                                <td>{assignment.title}</td>
                                <td>{assignment.description}</td>
                                <td>{assignment.deadline}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => openSubmitModal(assignment._id)}
                                    >
                                        Submit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            {/* Evaluation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h2 className="text-2xl font-semibold mb-4">Teaching Evaluation Report</h2>
                        <form onSubmit={handleEvaluationSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Description</label>
                                <textarea
                                    className="w-full p-2 border rounded"
                                    rows="4"
                                    placeholder="Write your feedback here..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Rating</label>
                                <ReactStars
                                    count={5}
                                    onChange={handleRatingChange}
                                    size={30}
                                    isHalf={true}
                                    value={rating}
                                    activeColor="#ffd700"
                                />
                                {!rating && (
                                    <p className="text-red-500 text-sm mt-1">
                                        Rating is required. Please provide a rating.
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="btn btn-secondary mr-4"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Send
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}

            {/* Assignment Submission Modal */}
            {isSubmitModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h2 className="text-2xl font-semibold mb-4">Submit Assignment</h2>
                        <form onSubmit={handleAssignmentSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Submission Link</label>
                                <input
                                    type="url"
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter your submission link here..."
                                    value={submissionLink}
                                    onChange={(e) => setSubmissionLink(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="btn btn-secondary mr-4"
                                    onClick={() => setIsSubmitModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyEnrollClassDetails;
