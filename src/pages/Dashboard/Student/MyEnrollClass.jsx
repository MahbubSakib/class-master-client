
import { Link } from 'react-router-dom';
import useEnrolledClasses from '../../../hooks/useEnrolledClasses';

const MyEnrollClass = () => {
    const { enrolledClasses, isLoading } = useEnrolledClasses();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
            {enrolledClasses.length ? enrolledClasses.map((classItem) => (
                <div key={classItem._id} className="card bg-white shadow-lg rounded-md p-4">
                    <img
                        src={classItem.image}
                        alt={classItem.title}
                        className="w-full h-48 object-cover rounded-md"
                    />
                    <div className="mt-4">
                        <h3 className="text-xl font-bold">{classItem.title}</h3>
                        <p className="text-gray-600">Instructor: {classItem.name}</p>
                        <Link to={`/dashboard/myEnrollClass/${classItem._id}`}>
                            <button className="btn bg-primary text-white mt-4">Continue</button>
                        </Link>
                    </div>
                </div>
            )) : <>
                <p className='text-2xl font-semibold text-center'>No Enrollment</p>
            </>}
        </div>
    );
};

export default MyEnrollClass;