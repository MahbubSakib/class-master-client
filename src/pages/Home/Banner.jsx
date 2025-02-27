import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.jpg";

const Banner = () => {
    return (
        <div className="relative">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop
                className="w-full bg-center bg-cover h-[440px]"
            >
                <SwiperSlide>
                    <div className="relative w-full h-full">
                        <img src={banner1} alt="Slide 1" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        <div className="absolute animate__animated animate__bounce top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#C6E7FF] text-center font-semibold bg-black bg-opacity-40 px-4 py-2 rounded-lg text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                            Empowering Learning, One Step at a Time!
                        </div>
                    </div>
                </SwiperSlide><SwiperSlide>
                    <div className="relative w-full h-full">
                        <img src={banner2} alt="Slide 1" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        <div className="absolute animate__animated animate__bounce top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#C6E7FF] text-center font-semibold bg-black bg-opacity-40 px-4 py-2 rounded-lg text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                            Your Success Starts Here – Let's Begin!
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full h-full">
                        <img src={banner3} alt="Slide 1" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        <div className="absolute animate__animated animate__bounce top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#C6E7FF] text-center font-semibold bg-black bg-opacity-40 px-4 py-2 rounded-lg text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                            Join the Journey of Growth and Excellence!
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full h-full">
                        <img src={banner4} alt="Slide 1" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        <div className="absolute animate__animated animate__bounce top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#C6E7FF] text-center font-semibold bg-black bg-opacity-40 px-4 py-2 rounded-lg text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                            Discover, Learn, and Achieve Your Goals!
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;