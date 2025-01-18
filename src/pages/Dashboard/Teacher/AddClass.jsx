import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddClass = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb, get url
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if(res.data.success){
            const classItem = {
                title: data.title,
                name: data.name,
                email: data.email,
                price: parseFloat(data.price),
                description: data.description,
                image: res.data.data.display_url,
                status: 'pending'
            }
            const classRes = await axiosSecure.post('/class', classItem)
            console.log(classRes.data);
            if(classRes.data.insertedId){
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Class added.',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/dashboard/myClass');
            }
        }
        console.log('with image url', res.data);
    }

    return (
        <div className=" px-4">
            <h2 className='text-4xl font-semibold mb-5 text-center'>Add a Class</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md space-y-5">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Title Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Title</span>
                        </label>
                        <input
                            {...register("title", { required: true })}
                            type="text"
                            placeholder="Title..."
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Name Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Name</span>
                        </label>
                        <input
                            {...register("name", { required: true })}
                            type="text"
                            defaultValue={user?.displayName}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            defaultValue={user?.email}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Price Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Price</span>
                        </label>
                        <input
                            {...register("price", { required: true })}
                            type="number"
                            placeholder="Price..."
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Description Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Description</span>
                        </label>
                        <textarea
                            {...register("description", { required: true })}
                            className="textarea textarea-bordered w-full"
                            placeholder="Description..."
                        ></textarea>
                    </div>

                    {/* Image Upload Field */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Image</span>
                        </label>
                        <input
                            {...register("image", { required: true })}
                            type="file"
                            className="file-input file-input-bordered w-full"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn bg-primary hover:bg-[#d95506] w-full mt-4"
                >
                    Add Class
                </button>
            </form>
        </div>

    );
};

export default AddClass;