import React, { useState } from 'react';

const OrderInfo= () => {
  const [userData, setUserData] = useState({
    username: '',
    roomNumber: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Information Submitted:', userData);
    alert('Order finalized!');
    // You can add navigation or API call logic here
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Finalize Your Order</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="roomNumber" className="block text-gray-700 font-medium mb-2">
              Room Number
            </label>
            <input
              type="text"
              id="roomNumber"
              name="roomNumber"
              value={userData.roomNumber}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderInfo;
