import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        let allOrdersItem = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.createdAt = order.createdAt;
            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem);
        // console.log("Processed Items:", allOrdersItem);
      }
    } catch (error) {
      console.error('Failed to load orders:', error);
    }
  };

  useEffect(() => {
    loadOrderData();
    console.log("Token:", token);
  }, [token]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // 🔵 Dot color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Order Placed':
        return 'bg-yellow-500';
      case 'Shipped':
        return 'bg-blue-500';
      case 'Delivered':
        return 'bg-green-500';
      case 'Cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className='border-t pt-16 px-4'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
          >
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-20 h-20 object-cover rounded-md' src={item.images?.[0]} alt='' />
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                  <p className='text-lg'>{currency}{item.price}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='mt-2 text-sm text-gray-500'>
                  Date: <span className='text-gray-600'>{formatDate(item.createdAt)}</span>
                </p>
                <p className='mt-1 text-sm text-gray-500'>
                  Payment: <span className='text-gray-600'>{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            <div className='md:w-1/2 flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <span className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></span>
                <p className='capitalize text-sm'>{item.status || 'Processing'}</p>
              </div>
              <button onClick={loadOrderData} className='border border-gray-400 px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100 transition'>
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
