import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom';

const TeachOnClassMaster = () => {
    const { register, handleSubmit } = useForm()
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const fetchUserRole = async (email) => {
        const { data } = await axiosPublic.get('/userRole', { params: { email } });
        console.log(data.role);
        return data.role;
    }

    const { data: role, isLoading, error } = useQuery({
        queryKey: ['userRole', user?.email],
        queryFn: () => fetchUserRole(user.email),
        enabled: !!user, // Only fetch if user exists
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading role: {error.message}</div>;

    // if (role === 'teacher') {
    //     return <div>Welcome to our site! Thank you for being a valued teacher in our community.</div>;
    // }

    const onSubmit = async (data) => {
        try {
            const requestData = {
                ...data,
                email: user.email,  // Include user email
                imageUrl: user.photoURL,  // Include the image URL
                status: "pending",  // Set the status
            };

            const res = await axiosPublic.post('/teachOnClassMaster', requestData);

            if (res.status === 200) {
                console.log('Application submitted successfully:', res.data);
            } else {
                console.error('Error submitting application:', res.statusText);
            }
        } catch (error) {
            console.error('Error during submission:', error);
        }
    };
    return (
        <div className='bg-[#fef3c7]'>
            {role === 'teacher' ? <>
                <div className='w-10/12 mx-auto'>
                    <h2 className='text-2xl text-center py-5 font-bold text-[#f59e0b]'>Welcome to our Teaching Community!</h2>
                    <p className='text-lg mt-2 text-gray-700'>
                        Thank you for being a valued teacher in our community. Your expertise and dedication play a crucial role in shaping the future of our students.
                    </p>
                    <p className='mt-4 text-gray-600'>
                        Explore your dashboard, manage your classes, and connect with other educators. We're here to support you every step of the way.
                    </p>
                    <div className='text-center'>
                        <Link to={'/'}>
                            <button className='mt-6 px-4 py-2 bg-[#f59e0b] mb-10 text-white rounded-lg shadow hover:bg-[#d97706] transition'>
                                Go to Dashboard
                            </button>
                        </Link>
                    </div>
                </div>
            </> :

                <div className='min-h-80 py-10'>
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-5">
                        <div className="flex space-x-4">
                            <div className="form-control w-full flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Name</span>
                                </label>
                                <input
                                    {...register("name", { required: true })}
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control w-full flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Email</span>
                                </label>
                                <input
                                    {...register("email", { required: true })}
                                    type="email"
                                    className="input input-bordered w-full"
                                    defaultValue={user?.email}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className='flex space-x-4'>
                            <div className="form-control w-full flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Profile Picture</span>
                                </label>
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={user?.photoURL || 'default-image-path.jpg'}
                                        alt="Profile"
                                        className="w-16 h-16 rounded-full border border-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="form-control w-full flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Experience Level</span>
                                </label>
                                <select
                                    {...register("experience", { required: true })}
                                    className="select select-bordered w-full"
                                    defaultValue=""
                                >
                                    <option disabled value="">Select experience level</option>
                                    <option value="beginner">Beginner</option>
                                    <option value="mid-level">Mid-level</option>
                                    <option value="experienced">Experienced</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <div className="form-control w-full flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Title</span>
                                </label>
                                <input
                                    {...register("title", { required: true })}
                                    type="text"
                                    placeholder="Enter the position title"
                                    className="input input-bordered w-full"
                                />
                            </div>

                            <div className="form-control w-full flex-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Category</span>
                                </label>
                                <select
                                    {...register("category", { required: true })}
                                    className="select select-bordered w-full"
                                    defaultValue=""
                                >
                                    <option disabled value="">Select a category</option>
                                    <option value="web-development">Web Development</option>
                                    <option value="digital-marketing">Digital Marketing</option>
                                    <option value="graphic-design">Graphic Design</option>
                                    <option value="content-writing">Content Writing</option>
                                    <option value="data-science">Data Science</option>
                                </select>
                            </div>
                        </div>

                        {/* <div className="form-control w-full flex-1">
                    <label className="label">
                        <span className="label-text font-semibold">Category</span>
                    </label>
                    <select
                        {...register("category", { required: true })}
                        className="select select-bordered w-full"
                        defaultValue=""
                    >
                        <option disabled value="">Select a category</option>
                        <option value="web-development">Web Development</option>
                        <option value="digital-marketing">Digital Marketing</option>
                        <option value="graphic-design">Graphic Design</option>
                        <option value="content-writing">Content Writing</option>
                        <option value="data-science">Data Science</option>
                    </select>
                </div> */}

                        <button type="submit" className="btn bg-primary hover:bg-[#d95506] w-full">
                            Submit for Review
                        </button>
                    </form>


                </div>
            }
        </div>

    );
};

export default TeachOnClassMaster;