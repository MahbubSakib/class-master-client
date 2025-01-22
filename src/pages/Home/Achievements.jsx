import React from 'react';

const Achievements = () => {
    const achievements = [
        { id: 1, title: "Courses Completed", value: "10,000+" },
        { id: 2, title: "Active Teachers", value: "500+" },
        { id: 3, title: "Awards Won", value: "15+" },
        { id: 4, title: "Global Reach", value: "50+ Countries" },
    ];

    return (
        <div className="achievements-section py-16">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-primary mb-8">Our Achievements</h2>
                <p className="text-lg text-gray-700 mb-12">
                    We are proud of what we’ve accomplished with the help of our teachers and students. 
                    Here are some milestones we’ve achieved so far:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {achievements.map(({ id, title, value }) => (
                        <div
                            key={id}
                            className="achievement-card bg-white p-6 rounded-lg shadow-md"
                        >
                            <p className="text-5xl font-bold text-blue-500 mb-4">{value}</p>
                            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Achievements;
