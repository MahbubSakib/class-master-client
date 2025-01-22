import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { FaStar } from 'react-icons/fa';


const FeedbackCarousel = () => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // To track current feedback index
    const axiosSecure = useAxiosSecure();
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FaStar
                    key={i}
                    size={24}
                    color={i <= Math.floor(rating) ? "#ffd700" : "#e4e5e9"}
                />
            );
        }
        return stars;
    };

    useEffect(() => {
        // Fetch the feedback data from the backend
        const fetchFeedback = async () => {
            try {
                const res = await axiosSecure.get('/get-feedback');
                if (res.data.success) {
                    setFeedbackList(res.data.feedback);
                } else {
                    console.log('No feedback found.');
                }
            } catch (error) {
                console.error('Error fetching feedback:', error);
            }
        };

        fetchFeedback();
    }, []);

    // Handle the next and previous button clicks
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbackList.length); // Loop back to the first feedback
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + feedbackList.length) % feedbackList.length); // Loop to the last feedback
    };
    // console.log(feedbackList[currentIndex].rating);

    return (
        <div className="feedback-section py-12">
            <h2 className="text-4xl font-bold text-center text-primary mb-10">What Our Students Say</h2>

            {feedbackList.length > 0 ? (
                <div className="feedback-container bg-white rounded-lg shadow-md p-6 mx-auto max-w-xl">
                    <p className="text-xl font-semibold text-gray-500 text-center mb-4">{feedbackList[currentIndex].classTitle}</p>
                    <img
                        src={feedbackList[currentIndex].studentImage}
                        alt={feedbackList[currentIndex].studentName}
                        className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold text-center">{feedbackList[currentIndex].studentName}</h3>

                    <p className="text-gray-600 italic text-center">"{feedbackList[currentIndex].description}"</p>

                    {/* Display Rating */}
                    <div className="flex justify-center mt-4">
                        {renderStars(feedbackList[currentIndex].rating)}
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            className="px-4 py-2 bg-primary text-white rounded-lg text-2xl"
                            onClick={handlePrev}
                        >
                            <MdSkipPrevious></MdSkipPrevious>
                        </button>
                        <button
                            className="px-4 py-2 bg-primary text-white rounded-lg text-2xl"
                            onClick={handleNext}
                        >
                            <MdSkipNext></MdSkipNext>
                        </button>
                    </div>
                </div>

            ) : (
                <div className="text-center text-gray-500">No feedback available.</div>
            )}
        </div>
    );
};

export default FeedbackCarousel;
