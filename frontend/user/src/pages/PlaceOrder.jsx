import React, { useContext, useState, useEffect } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const {
    navigate,
    delivery_fee,
    backendUrl,
    getCartAmount,
    cartItems,
    setCartItems,
    products,
    currency,
  } = useContext(ShopContext);

  const token = localStorage.getItem('token');

  const [cartData, setCartData] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

const initPay = (order, formData, navigate, toast) => {
  console.log("🧾 Razorpay Order From Backend:", order);

  if (!window.Razorpay) {
    alert("Razorpay SDK not loaded");
    return;
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency || "INR",
    name: "Order Payment",
    description: "Complete your purchase",
    order_id: order.id,
    handler: async (response) => {
      console.log("✅ Payment Success:", response);
      toast.success("Payment Successful!");
      navigate("/orders");
    },
    prefill: {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      contact: formData.phone,
    },
    theme: { color: "#3399cc" },
  };

  try {
    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.error("❌ Payment Failed:", response);
      toast.error("Payment failed");
    });

    console.log("📦 Razorpay Object:", rzp);
    rzp.open();
    console.log("🚀 rzp.open() called");
  } catch (err) {
    console.error("❌ Error in Razorpay:", err);
    toast.error("Payment Error");
  }

  console.log("🔥 initPay called", order);
};


  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!token) {
      toast.error("You're not logged in. Please log in again.");
      return;
    }

    try {
      let orderItems = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const product = structuredClone(
              products.find((product) => product._id === itemId)
            );
            if (product) {
              product.size = size;
              product.quantity = cartItems[itemId][size];
              orderItems.push(product);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case 'cod': {
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message || "Order failed");
          }
          break;
        }

        case 'stripe': {
          const responseStripe = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        }

        case 'razorpay': {  // ✅ FIXED lowercase
          const responseRazorpay = await axios.post(
            `${backendUrl}/api/order/razorpay`,
            orderData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
             console.log("💡 Razorpay case triggered");
       console.log("📦 Razorpay Response:", responseRazorpay.data);
          } else {
            toast.error(responseRazorpay.data.message);
          }

          break;
        }
       
       

        default:
          toast.error("Selected payment method is not implemented yet.");
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            tempData.push({
              _id: itemId,
              size,
              quantity: cartItems[itemId][size],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col lg:flex-row justify-between gap-4 pt-5 lg:pt-14 min-h-[80vh] border-t px-4 lg:px-0"
    >
      {/* Left Side - Delivery Information */}
      <div className="flex flex-col gap-4 w-full lg:max-w-[480px]">
        <div className="text-xl lg:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className="border border-gray-300 rounded py-2 px-3.5 w-full" type="text" placeholder="First name" />
          <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} className="border border-gray-300 rounded py-2 px-3.5 w-full" type="text" placeholder="Last name" />
        </div>
        <input onChange={onChangeHandler} name="email" value={formData.email} className="border border-gray-300 rounded py-2 px-3.5 w-full" type="email" placeholder="Email Address" />
        <input required onChange={onChangeHandler} name="street" value={formData.street} className="border border-gray-300 rounded py-2 px-3.5 w-full" type="text" placeholder="Street Address" />
        <div className="flex flex-col sm:flex-row gap-3">
          <input required onChange={onChangeHandler} name="city" value={formData.city} className="border border-gray-300 rounded py-2 px-3.5 w-full" type="text" placeholder="City" />
          <input required onChange={onChangeHandler} name="state" value={formData.state} className="border border-gray-300 rounded py-2 px-3.5 w-full" type="text" placeholder="State" />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} className="border border-gray-300 rounded py-2 px-3.5 w-full" type="number" placeholder="Zipcode" />
          <input required onChange={onChangeHandler} name="country" value={formData.country} className="border border-gray-300 rounded py-2 px-3.5 w-full" type="text" placeholder="Country" />
        </div>
        <input required onChange={onChangeHandler} name="phone" value={formData.phone} className="border border-gray-300 rounded py-2 px-3.5 w-full" type="number" placeholder="Phone Number" />
      </div>

      {/* Right Side */}
      <div className="mt-8 w-full lg:max-w-[400px]">
        <CartTotal />
        <div className="my-6">
          <Title text1={'YOUR'} text2={'ITEMS'} />
          <div className="space-y-4">
            {cartData.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Your cart is empty</p>
            ) : (
              cartData.map((item, idx) => {
                const product = products.find((p) => p._id === item._id);
                if (!product) return null;
                return (
                  <div key={idx} className="flex items-center gap-4 border-b pb-2">
                    <img src={(product.images && product.images[0]) || (product.image && product.image[0]) || ''} alt={product.name} className="w-12 h-12 object-cover" />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">
                        {currency}
                        {product.price} | Qty: {item.quantity} | Size: {item.size}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-3">
              <div onClick={() => setMethod('stripe')} className={`min-w-[150px] flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md hover:shadow-md ${method === 'stripe' ? 'border-green-500' : 'border-gray-300'}`}>
                <span className={`min-w-[14px] h-[14px] border rounded-full ${method === 'stripe' ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}></span>
                <img src={assets.stripe_logo} className="h-5 mx-4" alt="Stripe Logo" />
              </div>
              <div onClick={() => setMethod('razorpay')} className={`min-w-[150px] flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md hover:shadow-md ${method === 'razorpay' ? 'border-green-500' : 'border-gray-300'}`}>
                <span className={`min-w-[14px] h-[14px] border rounded-full ${method === 'razorpay' ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}></span>
                <img src={assets.razorpay_logo} className="h-5 mx-4" alt="Razorpay Logo" />
              </div>
              <div onClick={() => setMethod('cod')} className={`min-w-[150px] flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-md hover:shadow-md ${method === 'cod' ? 'border-green-500' : 'border-gray-300'}`}>
                <span className={`min-w-[14px] h-[14px] border rounded-full ${method === 'cod' ? 'bg-green-500 border-green-500' : 'border-gray-400'}`}></span>
                <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
              </div>
            </div>
            <div className="w-full text-end mt-8">
              <button type="submit" className="bg-black text-white px-8 py-2 text-sm rounded-md hover:bg-gray-800 transition-colors">
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
