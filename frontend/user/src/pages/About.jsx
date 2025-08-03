import React from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className="px-4 sm:px-8 pt-12 pb-20 text-gray-800 border-t">
      {/* Heading */}
      <div className="mb-10 text-center">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* Image + Text */}
      <div className="flex flex-col md:flex-row gap-8 mb-14 items-center">
        <img
          src={assets.about_img}
          alt="About"
          className="w-full md:w-[45%] rounded-lg shadow-md"
        />
        <div className="text-sm sm:text-base space-y-4 leading-relaxed md:w-[55%]">
          <p>
            {/* Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with one simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes. */}
          </p>
          <p>
            Since our inception, we’ve worked tirelessly to curate a diverse selection of high-quality products that not only serve real-world performance, from fashion and beauty to electronics and home essentials. We offer an extensive collection sourced from trusted brands and suppliers.
          </p>

          {/* Our Mission */}
          <div>
            <h3 className="text-lg font-semibold mt-6 mb-2">Our Mission</h3>
            <p>
              Our mission at Forever is to empower customers with choice, convenience, and confidence. We’re dedicated to providing a seamless shopping experience that exceeds expectations—from browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div>
        <h3 className="text-xl font-semibold mb-6 text-center">WHY CHOOSE US ———</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm sm:text-base text-center">
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <h4 className="font-semibold mb-2">Quality Assurance</h4>
            <p>
              We stand behind each product we offer and work only with trusted vendors to maintain our stringent quality standards.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <h4 className="font-semibold mb-2">Convenience</h4>
            <p>
              Our user-friendly platform and fast delivery ensure a smooth shopping experience, from browsing to doorstep.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <h4 className="font-semibold mb-2">Exceptional Customer Service</h4>
            <p>
              Our team is committed to resolving your concerns and making your satisfaction our priority.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="mt-20">
        <NewsletterBox />
      </div>
    </div>
  );
};

export default About;
