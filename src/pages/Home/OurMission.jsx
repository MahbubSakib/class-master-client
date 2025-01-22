import worldImg from "../../assets/better-world.jpg"

const OurMission = () => {
    return (
        <div className="our-mission-section py-16">
        <h2 className="text-4xl font-bold text-center text-primary mb-6">Our Mission</h2>
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
                {/* Left Side: Image */}
                <div className="image">
                    <img
                        src={worldImg}
                        alt="Our Mission"
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                </div>

                {/* Right Side: Mission Content */}
                <div className="content">
                    
                    <p className="text-lg text-gray-700 mb-6">
                        Our mission is to create a world where education is accessible, engaging, 
                        and empowering for everyone. We aim to connect passionate educators with 
                        eager learners and foster an environment of growth, curiosity, and innovation.
                    </p>
                    <p className="text-lg text-gray-700">
                        By bridging the gap between teachers and students, we aspire to make 
                        learning an exciting and fulfilling journey for all.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OurMission;
