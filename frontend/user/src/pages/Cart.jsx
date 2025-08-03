import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import HubSpot from "next-auth/providers/hubspot";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
  for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            tempData.push({
              _id: itemId,
              size: size,
              quantity: cartItems[itemId][size],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14 px-4 sm:px-6 lg:px-8">
      <div className="text-2xl mb-6">
        <Title text1={"YOURS"} text2={"CART"} />
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartData.length === 0 ? (
          <p className="text-gray-500 text-center py-10">Your cart is empty</p>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );
            if (!productData) return null;

            return (
              <div
                key={index}
                className="py-4 border-t border-b border-gray-200 grid grid-cols-[4fr_1fr_1fr] items-center gap-4"
              >
                {/* Product Info */}
                <div className="flex items-start gap-4 sm:gap-6">
                  <img
                    className="w-16 sm:w-20 h-16 sm:h-20 object-cover"
                    src={
                      (productData.images && productData.images[0]) ||
                      (productData.image && productData.image[0]) ||
                      ""
                    }
                    alt={productData.name}
                  />
                  <div>
                    <p className="text-sm sm:text-base font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <p className="text-sm sm:text-base">
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-2 sm:px-3 py-0.5 border border-gray-200 bg-gray-50 text-xs sm:text-sm">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quantity Input */}
                <input
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val > 0) {
                      updateQuantity(item._id, item.size, val);
                    }
                  }}
                  className="border border-gray-300 w-12 sm:w-16 px-2 py-1 text-center focus:outline-none focus:ring-1 focus:ring-black"
                  type="number"
                  min={1}
                  value={item.quantity}
                />

                {/* Delete Button */}
                <button
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="justify-self-end mr-2 sm:mr-4 hover:opacity-70 transition-opacity"
                >
                  <img
                    className="w-4 sm:w-5"
                    src={assets.bin_icon}
                    alt="Delete item"
                  />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Cart Total and Checkout */}
      {cartData.length > 0 && (
        <div className="flex justify-end my-10">
          <div className="w-full sm:w-96">
            <CartTotal />

            <div className="w-full text-right mt-6">
              <button
                onClick={() => navigate("place-order")}
                className="bg-black text-white text-sm sm:text-base px-8 py-3 hover:bg-gray-800 transition-colors"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
