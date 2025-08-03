import React from 'react';

const NewsletterBox = () => {

  const OnSubmitHandler=(event)=>{
    event.preventDefault();
  }



  return (
    <div className='bg-gray-50 py-16 px-4 flex flex-col items-center text-center'>
      {/* Heading */}
      <p className='text-2xl sm:text-3xl font-semibold text-gray-800 max-w-lg'>
        Subscribe Now And Get 20% Off
      </p>

      {/* Subtext */}
      <p className='text-gray-500 mt-2 max-w-md text-sm sm:text-base'>
        Join our newsletter to receive updates and exclusive offers in your inbox.
      </p>

      {/* Form */}
      <form className='mt-6 w-full max-w-xl flex flex-col sm:flex-row items-center gap-4'
         onSubmit={OnSubmitHandler}    >
        <input
          type='email'
          className='w-full flex-1 px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-sm'
          placeholder='Enter your email'
          required
        />
        <button
          type='submit'
          className='bg-black text-white px-6 py-3 text-sm rounded hover:bg-gray-900 transition-all duration-200'
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
