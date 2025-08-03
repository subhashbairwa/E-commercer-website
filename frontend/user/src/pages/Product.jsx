import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productID } = useParams();
  const { products, currency ,addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    const item = products.find((item) => item._id == productID);
    if (item) {
      setProductData(item);
      setImage(item.images && item.images.length > 0 ? item.images[0] : ""); // Defensive check
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productID, products]);

  if (!productData) return <div className='text-center py-10'>Loading...</div>;

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex flex-col sm:flex-row gap-12 sm:gap-12'>
        <div className='flex-1 flex flex-col-reverse sm:flex-row gap-3'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.17%] w-full'>
            {/* Render thumbnails */}
            {productData.images && productData.images.length > 0 && productData.images.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt={`product-thumbnail-${index}`}
              />
            ))}
          </div>

          <div className='w-full sm:w-[80%]'>
            {/* Main image */}
            <img className='w-full h-auto' src={image} alt="product-main" />
          </div>
        </div>

        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3.5" alt="star" />
            <img src={assets.star_icon} className="w-3.5" alt="star" />
            <img src={assets.star_icon} className="w-3.5" alt="star" />
            <img src={assets.star_icon} className="w-3.5" alt="star" />
            <img src={assets.star_dull_icon} className="w-3.5" alt="star-outline" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-3/4'>{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? 'border-orange-500' : ''
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product.</p>
            <p>Cash On Delivery is Available on this Product.</p>
            <p>Easy Return and Exchange Policy Within 7 Days.</p>
          </div>
        </div>
      </div>
     <div className="mt-16 sm:w-[80%] p-1">
  <div className="flex border-b text-sm font-medium bg-gray-200 w-60 ">
    <button className="px-5 py-3 border-b-2 border-black">Description</button>
    <button className="px-5 py-3 text-gray-500">Reviews (122)</button>
  </div>
  <div className="p-5 border text-sm text-gray-600 leading-6">
    <p className="mb-4">
      An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
    </p>
    <p>
      E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
    </p>
  </div>
</div>
   <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;
