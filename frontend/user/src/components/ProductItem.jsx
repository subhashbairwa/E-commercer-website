import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="group block text-gray-800 cursor-pointer">
      <div className="overflow-hidden rounded-xl shadow-sm bg-white">
        <img
          src={image?.[0]} // ✅ Just added optional chaining here
          alt={name}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <p className="pt-2 text-sm font-medium truncate">{name}</p>
      <p className="text-sm font-semibold text-gray-600">{currency}{price}</p>
    </Link>
  );
};

export default ProductItem;
