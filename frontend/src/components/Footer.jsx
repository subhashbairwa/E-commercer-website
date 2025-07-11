import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className=" mt-5 bg-gray-50 px-6 sm:px-10 py-10 text-sm text-gray-700">
      {/* Main Footer Grid */}
      <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-10">
        
        {/* Logo + Description */}
        <div>
          <img src={assets.logo} alt="logo" className="mb-5 w-14" />
          <p className="max-w-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo architecto quod cumque nobis ullam ea atque culpa voluptatibus asperiores in.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">COMPANY</h3>
          <ul className="space-y-2">
            <li className="hover:text-black cursor-pointer">Home</li>
            <li className="hover:text-black cursor-pointer">About Us</li>
            <li className="hover:text-black cursor-pointer">Delivery</li>
            <li className="hover:text-black cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">GET IN TOUCH</h3>
          <ul className="space-y-2">
            <li className="hover:text-black">9660200340</li>
            <li className="hover:text-black">subhashbairwa606@gmail.com</li>
            <li className="hover:text-black">contact@forever.com</li>
          </ul>
        </div>
      </div>

      {/* Divider and Bottom Note */}
      <div className="mt-10 border-t pt-4 text-center text-xs text-gray-500">
        © 2025 Forever.com — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
