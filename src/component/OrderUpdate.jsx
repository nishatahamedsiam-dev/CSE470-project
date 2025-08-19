import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const OrderUpdate = () => {
  const [orders, setOrders] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/orderDetails');
        const data = await response.json();
        setOrders(data); // Set orders once data is fetched
      } catch (error) {
        console.error('Error fetching orders:', error);
        setSuccessMessage('Failed to fetch orders.');
      } finally {
        setLoading(false); // Stop loading once the fetch is complete
      }
    };

    fetchOrders();
  }, []);

  const handleUpdate = (id, newOrderInfo) => {
    const updatedData = { orderInfo: newOrderInfo };

    fetch(`http://localhost:5000/orderDetails/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          setSuccessMessage(`Order ${id} updated successfully!`);
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === id ? { ...order, orderInfo: newOrderInfo } : order
            )
          );
        } else {
          throw new Error('Failed to update order information.');
        }
      })
      .catch((error) => {
        console.error('Error updating order:', error);
        setSuccessMessage('Failed to update order information.');
      });
  };

  if (loading) {
    return <p className="text-center">Loading orders...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <Sidebar />
      <h1 className="text-4xl font-bold text-center mb-8">Admin - Update Order Info</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">
              Order ID: {order._id}
            </h2>
            <p className="mb-2">
              <strong>Email:</strong> {order.email}
            </p>
            <p className="mb-2">
              <strong>Room Type:</strong> {order.roomType}
            </p>
            <p className="mb-4">
              <strong>Status:</strong> {order.orderInfo}
            </p>
            <p className="mb-4">
              <strong>Food Items:</strong>
              {console.log(order.foodItems)
              }
              {order.foodItems && order.foodItems.length > 0 ? (
                <ul className="list-disc pl-6">
                  {order.foodItems.map((item, index) => (
                    <li key={index}>{item.foodName}</li>
                  ))}
                </ul>
              ) : (
                <p>No food items found</p>
              )}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleUpdate(order._id, 'Few More Minutes')}
                className={`px-4 py-2 rounded ${
                  order.orderInfo === 'Few More Minutes'
                    ? 'bg-gray-500 text-white cursor-default'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
                disabled={order.orderInfo === 'Few More Minutes'}
              >
                Few More Minutes
              </button>
              <button
                onClick={() => handleUpdate(order._id, 'Ready to Serve')}
                className={`px-4 py-2 rounded ${
                  order.orderInfo === 'Ready to Serve'
                    ? 'bg-gray-500 text-white cursor-default'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
                disabled={order.orderInfo === 'Ready to Serve'}
              >
                Ready to Serve
              </button>
              <button
                onClick={() => handleUpdate(order._id, 'Completed')}
                className={`px-4 py-2 rounded ${
                  order.orderInfo === 'Completed'
                    ? 'bg-gray-500 text-white cursor-default'
                    : 'bg-yellow-500 text-white hover:bg-yellow-600'
                }`}
                disabled={order.orderInfo === 'Completed'}
              >
                Completed
              </button>
            </div>
          </div>
        ))}
      </div>
      {successMessage && (
        <p className="mt-6 text-center text-green-500">{successMessage}</p>
      )}
    </div>
  );
};

export default OrderUpdate;
