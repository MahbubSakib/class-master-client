import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthContext } from "../../provider/AuthProvider";
import registerAnimation from "../../assets/RegistrationAnimation.json"
import Lottie from "react-lottie";
import auth from "../../firebase/firebase.init";
import { useForm } from 'react-hook-form';
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
    const googleProvider = new GoogleAuthProvider();
    const { createNewUser, setUser, updateUser } = useContext(AuthContext);
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: registerAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);

        const photoURL = data.photoURL

        createNewUser(data.email, data.password)
            .then((result) => {
                const loggedUser = result.user;
                console.log(loggedUser);

                updateUser(data.name, photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photo: photoURL,
                            role: 'student',
                        };

                        axiosPublic.post('/users', userInfo)
                            .then((res) => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Registered successfully',
                                        showConfirmButton: false,
                                        timer: 1500,
                                    });
                                    navigate('/');
                                }
                            })
                            .catch((error) => {
                                console.error('Error saving user info:', error);
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Failed to save user information. Please try again.',
                                    icon: 'error',
                                    confirmButtonText: 'Close',
                                });
                            });
                    })
                    .catch((error) => {
                        console.error('Error updating user profile:', error);
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to update user profile. Please try again.',
                            icon: 'error',
                            confirmButtonText: 'Close',
                        });
                    });
            })
            .catch((error) => {
                console.error('Error creating new user:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to create a new account. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Close',
                });
            });
    };


    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const loggedUser = result.user;
                console.log(loggedUser);
    
                const userInfo = {
                    name: loggedUser.displayName || 'Google User',
                    email: loggedUser.email,
                    photo: loggedUser.photoURL || '',
                    role: 'student'
                };
    
                axiosPublic.post('/users', userInfo)
                    .then((res) => {
                        if (res.data.insertedId || res.data.message === 'user already exist') {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Logged in successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/');
                        }
                    })
                    .catch((error) => {
                        console.error('Error saving user info:', error);
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to save user details. Please try again.',
                            icon: 'error',
                            confirmButtonText: 'Close'
                        });
                    });
            })
            .catch((error) => {
                console.error('Error during Google login:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'There was a problem logging in. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Close'
                });
            });
    };    
    

    return (
        <div className="bg-[#F8F8F8] text-[#4A4A4A] min-h-screen flex items-center justify-center">
            <div className="w-10/12 mx-auto flex flex-wrap lg:flex-nowrap items-center">
                <div className="w-full lg:w-1/2">
                    <h2 className="text-3xl text-[#4A4A4A] font-bold text-center py-10">Register</h2>
                    <div className="card bg-base-100 max-w-sm shrink-0 shadow-2xl flex justify-center items-center w-10/12 mx-auto mb-9">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                                {errors.name?.type === "required" && (
                                    <p role="alert" className='text-red-500 mt-1'>Name is required</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="photoURL" className="input input-bordered" />
                                {errors.photoURL?.type === "required" && (
                                    <p role="alert" className='text-red-500 mt-1'>Photo URL is required</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email?.type === "required" && (
                                    <p role="alert" className='text-red-500 mt-1'>Email is required</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters long" },
                                        maxLength: { value: 20, message: "Password must not exceed 20 characters" },
                                        pattern: {
                                            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                                            message: "Password must include at least one uppercase, one lowercase, and one number"
                                        }
                                    })}
                                    placeholder="password"
                                    className="input input-bordered"
                                />
                                {errors.password && (
                                    <p role="alert" className="text-red-500 mt-1">{errors.password.message}</p>
                                )}
                                {/* <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label> */}
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn bg-primary text-white hover:bg-[#e0891a]">Register</button>
                            </div>
                            <div className="divider">OR</div>
                            <div className="mb-5">
                                <button type="button" onClick={handleGoogleLogin} className="btn px-16 bg-primary text-[#F8F8F8] hover:bg-[#e0891a]"><FcGoogle className="text-lg" style={{ backgroundColor: 'white', borderRadius: '20%' }} /> Register with Google</button>
                            </div>
                        </form>

                        <button className="pb-10">
                            Already have an account? <NavLink to={'/login'}><span className="text-blue-800 hover:text-red-500">Login</span></NavLink>
                        </button>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 p-5 flex justify-center">
                    <Lottie options={defaultOptions} height={400} width={400} />
                </div>
            </div>
        </div>
    );
};

export default Register;