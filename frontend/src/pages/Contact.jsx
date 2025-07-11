import React from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-14 pb-20 text-gray-800 border-t">
      {/* Title */}
      <div className="mb-12 text-center">
        <Title text1="CONTACT" text2="US" />
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          We'd love to hear from you! Reach out to us through any of the channels below.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column - Image and Store Info */}
        <div className="lg:w-1/2">
          {/* Image */}
          <div className="mb-8">
            <img
              src={assets.contact_img}
              alt="Contact"
              className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Store Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-4 text-center">Our Store</h3>
            <div className="space-y-3 text-center">
              <p className="text-gray-700">
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                54709 Willms Station, Suite 350, Washington, USA
              </p>
              <p className="text-gray-700">
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (415) 555-0132
              </p>
              <p className="text-gray-700">
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                admin@forever.com
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <h4 className="text-lg font-semibold mb-2">Careers at Forever</h4>
              <p className="text-gray-600 mb-4">Learn more about our teams and job openings.</p>
              <button className="border border-black text-black px-6 py-2 text-sm hover:bg-black hover:text-white transition rounded-md">
                Explore Jobs
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Developer Info */}
        <div className="lg:w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
            <h3 className="text-xl font-semibold mb-4 text-center">Developer Info</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div>
                  <p className="font-medium">Name:</p>
                  <p className="text-gray-700">Madhukar S</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <div>
                  <p className="font-medium">Location:</p>
                  <p className="text-gray-700">India</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-medium">Field:</p>
                  <p className="text-gray-700">MERN Stack & E-commerce App Development</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="font-medium">Email:</p>
                  <p className="text-gray-700">madhukar.dev@email.com</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <h4 className="text-lg font-semibold mb-2 text-center">Currently Building</h4>
              <p className="text-gray-600 text-center mb-6">
                Full-stack shopping app with React, Context API, Tailwind, and Express.js.
              </p>
              
              <div className="flex justify-center space-x-4">
                <button className="bg-black text-white px-6 py-2 text-sm hover:bg-gray-800 transition rounded-md">
                  View Portfolio
                </button>
                <button className="border border-black text-black px-6 py-2 text-sm hover:bg-gray-100 transition rounded-md">
                  Hire Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="mt-16 max-w-3xl mx-auto">
        <NewsletterBox />
      </div>
    </div>
  );
};

export default Contact;