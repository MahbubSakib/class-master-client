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

const Register = () => {
    const googleProvider = new GoogleAuthProvider();
    const { createNewUser, setUser, updateUser } = useContext(AuthContext);
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: registerAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const name = form.get('name');
        const email = form.get('email');
        const photo = form.get('photo');
        const password = form.get('password');
        // console.log(name, email, photo, password);

        setError('')

        const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!regex.test(password)) {
            Swal.fire({
                title: 'Error!',
                text: 'Password must have at least 1 upper case, 1 lower case and must have 6 characters long.',
                icon: 'error',
                confirmButtonText: 'Close'
            })
            return
        }
        createNewUser(email, password)
            .then(result => {
                const user = result.user;
                setUser(user);
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        Swal.fire({
                            title: 'Registered!',
                            text: 'Successfully Registered',
                            icon: 'success',
                            confirmButtonText: 'Close'
                        })
                        navigate('/')
                    })
            })
            .catch((err) => {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was a problem registering your account, try again.',
                    icon: 'error',
                    confirmButtonText: 'Close'
                })
            });
    }
    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(() => {
                toast.success('Registration successful!');
                Swal.fire({
                    title: 'Registered!',
                    text: 'Successfully Registered',
                    icon: 'success',
                    confirmButtonText: 'Close'
                })
                navigate('/');
            })
            .catch((error) => {
                toast.error('Error during registration: ' + error.message);
                Swal.fire({
                    title: 'Error!',
                    text: 'There was a problem registering your account, try again.',
                    icon: 'error',
                    confirmButtonText: 'Close'
                })
            });
    };

    return (
        <div className="bg-[#F8F8F8] text-[#4A4A4A] min-h-screen flex items-center justify-center">
            <div className="w-10/12 mx-auto flex flex-wrap lg:flex-nowrap items-center">
                <div className="w-full lg:w-1/2">
                    <h2 className="text-3xl text-[#4A4A4A] font-bold text-center py-10">Register</h2>
                    <div className="card bg-base-100 max-w-sm shrink-0 shadow-2xl flex justify-center items-center w-10/12 mx-auto mb-9">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo-URL</span>
                                </label>
                                <input type="text" name="photo" placeholder="photo-url" className="input input-bordered" required />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password" placeholder="password" className="input input-bordered" required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 bottom-4">
                                    {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                                </button>
                            </div>
                            {
                                error && (
                                    <p className="text-sm text-red-500">{error}</p>
                                )
                            }
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