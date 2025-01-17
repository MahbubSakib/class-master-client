import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const TeachersRequest = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    // Fetch the teacher requests
    const { data: requests = [], refetch } = useQuery({
        queryKey: ['requests'],
        queryFn: async () => {
            const res = await axiosPublic.get('/teachersRequest');
            return res.data;
        },
    });

    // Approve request
    const handleApprove = async (id) => {
        try {
            await axiosPublic.post(`/updateTeacherRequest/${id}`, { status: 'accepted' });
            refetch(); // Refresh the data after updating
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Request approved.',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error('Error approving request:', error);
        }
    };

    // Reject request
    const handleReject = async (id) => {
        try {
            await axiosPublic.post(`/updateTeacherRequest/${id}`, { status: 'rejected' });
            refetch(); // Refresh the data after updating
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Request rejected.',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

    return (
        <div>
            <h2 className='text-2xl font-semibold text-center'>Teacher Requests</h2>
            <div className='overflow-x-auto p-4'>
                <table className="table-auto w-full border border-gray-200 rounded-lg shadow-lg">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Image</th>
                            <th className="px-4 py-2 text-left">Experience</th>
                            <th className="px-4 py-2 text-left">Title</th>
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request._id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2">{request.name}</td>
                                <td className="px-4 py-2">
                                    <img
                                        src={request.imageUrl}
                                        alt={request.name}
                                        className="w-12 h-12 object-cover rounded-full border"
                                    />
                                </td>
                                <td className="px-4 py-2 capitalize">{request.experience}</td>
                                <td className="px-4 py-2">{request.title}</td>
                                <td className="px-4 py-2 capitalize">{request.category}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`px-2 py-1 rounded-full capitalize text-sm ${request.status === 'pending'
                                            ? 'bg-yellow-200 text-yellow-700'
                                            : 'bg-green-200 text-green-700'
                                            }`}
                                    >
                                        {request.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2">
                                    {request.status === 'pending' ? (
                                        <div className="flex space-x-2">
                                            <button
                                                className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg shadow hover:bg-green-600 transition"
                                                onClick={() => handleApprove(request._id)}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg shadow hover:bg-red-600 transition"
                                                onClick={() => handleReject(request._id)}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex space-x-2">
                                            <button
                                                className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg shadow hover:bg-green-600 transition opacity-50 cursor-not-allowed"
                                                disabled
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg shadow hover:bg-red-600 transition opacity-50 cursor-not-allowed"
                                                disabled
                                            >
                                                Reject
                                            </button>
                                        </div>

                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default TeachersRequest;
