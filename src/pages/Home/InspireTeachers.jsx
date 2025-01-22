import teacherImg from "../../assets/teacher.jpg"

const InspireTeachers = () => {
    return (
        <div className="inspire-teachers-section py-16">
            <h2 className="text-4xl font-bold text-center text-primary mb-10">
                Inspire Future Generations
            </h2>
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left Side: Content Section */}
                <div className="content">

                    <p className="text-lg text-gray-700 mb-6">
                        Join our platform as a teacher and make a difference in the lives of students
                        worldwide. Share your knowledge, connect with eager learners, and grow as an educator.
                        Whether you're passionate about technology, arts, science, or any other subject,
                        we provide the tools and support you need to succeed.
                    </p>
                    <p className="text-lg text-gray-700 mb-6">
                        Become a part of a thriving community of educators and contribute to building
                        a brighter future for all. Start your journey today and inspire a new generation
                        of learners!
                    </p>
                    <a
                        href="/teachOnClassMaster"
                        className="inline-block bg-primary text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#d95506] transition duration-300"
                    >
                        Join as a Teacher
                    </a>
                </div>

                {/* Right Side: Image */}
                <div className="image">
                    <img
                        src={teacherImg}
                        alt="Inspire Teachers"
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default InspireTeachers;
