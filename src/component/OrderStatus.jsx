import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../../firebase.config';
import Sidebar from './Sidebar';

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user email from Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userEmail) {
      // Fetch order details from the server
      fetch('http://localhost:5000/orderDetails')
        .then((response) => response.json())
        .then((data) => {
          // Filter orders matching the user email
          const userOrders = data.filter((order) => order.email === userEmail);
          setOrders(userOrders);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching order details:', error);
          setLoading(false);
        });
    }
  }, [userEmail]);

  if (loading) {
    return <p className="text-center">Loading order details...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <Sidebar></Sidebar>
      <h1 className="text-4xl font-bold text-center mb-8">Order Status</h1>
      {orders.length > 0 ? (
        <div className="bg-white shadow-md p-6 rounded-lg">
          {orders.map((order, index) => (
            <div key={index} className="mb-6 border-b pb-4">
              <h2 className="text-2xl font-semibold mb-2">Order #{index + 1}</h2>
              <p className="text-gray-700 mb-2"><strong>Room Type:</strong> {order.roomType}</p>
              <p className="text-gray-700 mb-2"><strong>Room ID:</strong> {order.roomId}</p>
              <p className="text-gray-700 mb-2"><strong>Total Price:</strong> ${order.totalPrice}</p>
              <p className="text-gray-700"><strong>Order Status:</strong> {order.orderInfo}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700">No orders found for your account.</p>
      )}
    </div>
  );
};

export default OrderStatus;
