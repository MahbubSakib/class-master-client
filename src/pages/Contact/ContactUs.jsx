import React from "react";

const ContactUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">
          Contact Us
        </h1>
        <div className="space-y-6 text-gray-700">
          <div>
            <h2 className="text-lg font-semibold">Email</h2>
            <p>
              <a
                href="mailto:contact@example.com"
                className="text-primary hover:underline"
              >
                contact@example.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Phone</h2>
            <p>
              <a
                href="tel:+1234567890"
                className="text-primary hover:underline"
              >
                +567-890
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Address</h2>
            <p>
              123 ABC, Suite 101
              <br />
              XYZ City, EC 56789
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Business Hours</h2>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday - Sunday: Closed</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-lg font-semibold">Follow Us</h2>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600"
            >
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-800"
            >
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900"
            >
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
