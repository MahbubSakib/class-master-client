import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-primary mb-4">
          About Us
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Welcome to our platform, where we aim to provide high-quality and
          engaging educational experiences for students and teachers alike. Our
          mission is to empower learners and educators through innovation,
          creativity, and accessibility.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Our team consists of experienced professionals committed to building a
          community that values learning and collaboration. We believe in
          providing a supportive environment that fosters growth and inspires
          success.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          Thank you for being a part of our journey. We are excited to have you
          with us and look forward to achieving great things together!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
