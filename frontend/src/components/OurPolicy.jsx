import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around items-center gap-10 sm:gap-4 px-4 py-16 text-center text-xs md:text-base text-gray-700 mb-2 bg-gray-50'>
      
      {/* Policy 1 */}
      <div className='max-w-xs'>
        <img src={assets.exchange_icon} alt="exchange_icon" className='w-12 m-auto mb-4' />
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We provide a hassle-free exchange policy.</p>
      </div>
      
      {/* Policy 2 */}
      <div className='max-w-xs'>
        <img src={assets.quality_icon} alt="quality_icon" className='w-12 m-auto mb-4' />
        <p className='font-semibold'>7 Days Return</p>
        <p className='text-gray-400'>We provide a 7-day return policy for all orders.</p>
      </div>

      {/* Policy 3 */}
      <div className='max-w-xs'>
        <img src={assets.support_img} alt="support_icon" className='w-12 m-auto mb-4' />
        <p className='font-semibold'>Best Customer Support</p>
        <p className='text-gray-400'>We offer 24/7 customer support for all queries.</p>
      </div>

    </div>
  );
};

export default OurPolicy;
