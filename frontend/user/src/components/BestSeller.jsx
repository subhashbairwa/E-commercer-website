import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
import Title from './Title';

const BestSeller = () => {
  const { products } = useContext(ShopContext);

  const bestSellers = Array.isArray(products)
    ? products.filter((item) => item.bestseller === true)
    : [];

  return (
    <div className="my-10">
      <div className="text-center py-8">
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className="w-11/12 sm:w-3/4 text-gray-600 mx-auto text-xs sm:text-sm md:text-base">
          Check out our best-selling products loved by thousands of customers.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-4">
        {bestSellers.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.images}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
