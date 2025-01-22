import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import 'swiper/swiper-bundle.min.css';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';  // Custom hook to secure Axios requests

const PopularClasses = () => {
    const [popularClasses, setPopularClasses] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        // Fetch the popular classes from the backend
        const fetchPopularClasses = async () => {
            try {
                const response = await axiosSecure.get('/popular-classes');  // Assuming this is the API endpoint to fetch classes
                const sortedClasses = response.data.sort((a, b) => b.enrollmentCount - a.enrollmentCount);  // Sort by highest enrollmentCount
                setPopularClasses(sortedClasses.slice(0, 5));  // Get the top 5 popular classes
            } catch (error) {
                Swal.fire('Error', 'Failed to fetch popular classes.', 'error');
            }
        };

        fetchPopularClasses();
    }, [axiosSecure]);

    return (
        <div className='w-11/12 mx-auto'>
            <div className="popular-classes py-12">
                <h2 className="text-4xl font-bold text-center text-primary mb-10">Popular Classes</h2>

                <Swiper
                    spaceBetween={30}
                    slidesPerView={3}
                    // loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {popularClasses.length > 0 ? (
                        popularClasses.map((cls) => (
                            <SwiperSlide key={cls._id} className="h-full">
                                <div className="class-card bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                                    <img src={cls.image} alt={cls.title} className="w-full h-48 object-cover" />
                                    <div className="p-4 flex-grow flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-xl font-semibold">{cls.title}</h3>
                                            <p className="text-sm text-gray-600">{cls.description ? `${cls.description.slice(0, 100)}...` : 'No description'}</p>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-lg font-bold text-blue-500">${cls.price}</p>
                                            <p className="text-sm text-gray-500">Enrolled: {cls.enrollmentCount ? cls.enrollmentCount : 0}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">No popular classes available.</div>
                    )}
                </Swiper>
            </div>
        </div>


    );
};

export default PopularClasses;
