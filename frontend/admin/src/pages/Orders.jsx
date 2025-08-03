import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl} from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
        console.log('Orders:', response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    }
  };

 
  const statusHandler = async (event,orderId)=>{

  try {
    const response =await axios.post(
      backendUrl+ "/api/order/status",
      {orderId,status:event.target.value},
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    )
    if(response.data.success){
      await fetchAllOrders()

    }
    else{
      toast.error(response.data.message)
    }

    
  } catch (e) {
    console.log('Status update error:', e);
    toast.error('Failed to update status');
  }


  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>All Orders</h2>
      <div className='space-y-4'>
        {orders.map((order, index) => (
          <div
            key={index}
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 text-xs sm:text-sm text-gray-700'
          >
            <img className='w-12' src={assets.parcel_icon} alt='parcel icon' />
            
            <div>
              <div>
                {order.items.map((item, idx) => (
                  <p className='py-0.5' key={idx}>
                    {item.name} x {item.quantity} <span>{item.size}</span>
                    {idx < order.items.length - 1 ? ',' : ''}
                  </p>
                ))}
              </div>
              <p className='mt-3 mb-2 font-medium'>
                {order.address.firstName + ' ' + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{' '}
                  {order.address.country}, {order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>

            <div>
              <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
              <p className='mt-3'>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

               <p className="text-sm sm:text-[15px]">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.amount)}
            </p>



            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className='p-2 font-semibold border rounded'
            >
              <option value='Order Placed'>Order Placed</option>
              <option value='Packing'>Packing</option>
              <option value='Shipped'>Shipped</option>
              <option value='Out for delivery'>Out for delivery</option>
              <option value='Delivered'>Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
