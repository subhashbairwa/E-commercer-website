import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    if (Array.isArray(products)) {
      setLatestProduct(products.slice(0, 10));
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8">
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className="w-11/12 sm:w-3/4 text-gray-600 mx-auto text-xs sm:text-sm md:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus vitae inventore maiores molestiae eligendi repellendus pariatur iure, eveniet cum deserunt.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-4">
        {Array.isArray(latestProduct) && latestProduct.map((item, index) => (
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

export default LatestCollection;
