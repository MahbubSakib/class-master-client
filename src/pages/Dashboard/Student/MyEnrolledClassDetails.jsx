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
    const [evaluationData, setEvaluationData] = useState({ description: '', rating: 0 });
    const [rating, setRating] = useState(0);
    const {user} = useContext(AuthContext);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleAssignmentSubmit = async (assignmentId) => {
        try {
            const res = await axiosSecure.post('/submit-assignment', {
                assignmentId,
                studentEmail: user?.email, // Replace with logged-in user's email
                submissionData: 'Submission text or file', // Customize as needed
            });

            Swal.fire('Success', 'Assignment submitted successfully', 'success');
        } catch (error) {
            Swal.fire('Error', 'Failed to submit assignment', 'error');
        }
    };

    const handleEvaluationSubmit = async (e) => {
        e.preventDefault();

        const evaluationData = {
            classId,
            studentEmail: user.email,
            description,
            rating,
        };

        try {
            const res = await axiosSecure.post('/submit-evaluation', evaluationData);
            if (res.data.insertedId) {
                Swal.fire('Success', 'Evaluation submitted successfully!', 'success');
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to submit evaluation.', 'error');
        }
    };


    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            {/* Assignments Table */}
            <table className="table-auto w-full border">
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
                                    onClick={() => handleAssignmentSubmit(assignment._id)}
                                >
                                    Submit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Evaluation Button */}
            <button
                className="btn btn-secondary mt-6"
                onClick={() => setIsModalOpen(true)}
            >
                Teaching Evaluation Report
            </button>

            {/* Evaluation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="modal-content">
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
        </div>
    );
};

export default MyEnrollClassDetails;

