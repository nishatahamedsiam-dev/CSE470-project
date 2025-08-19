import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../../firebase.config';
import Sidebar from './Sidebar';

const foodItems = [
  { id: 1, name: "Pizza", description: "Delicious cheese pizza", imageUrl: "/Images/pizza.jpg", price: 12.99 },
  { id: 2, name: "Burger", description: "Juicy beef burger", imageUrl: "/Images/burger.jpg", price: 8.99 },
  { id: 3, name: "Pasta", description: "Creamy Alfredo pasta", imageUrl: "/Images/pasta.jpg", price: 10.99 },
  { id: 4, name: "Salad", description: "Fresh garden salad", imageUrl: "/Images/salad.jpg", price: 6.99 },
  { id: 5, name: "Biriyani", description: "Assorted biriyani platter", imageUrl: "/Images/biriyani.jpg", price: 15.99 },
  { id: 6, name: "Tacos", description: "Spicy chicken tacos", imageUrl: "/Images/tacos.jpg", price: 9.99 },
  { id: 7, name: "Steak", description: "Grilled steak cooked to perfection", imageUrl: "/Images/steak.jpg", price: 19.99 },
  { id: 8, name: "Ice Cream", description: "Creamy vanilla ice cream", imageUrl: "/Images/ice cream.jpg", price: 4.99 },
  { id: 9, name: "Soup", description: "Warm tomato soup", imageUrl: "/Images/soup.jpg", price: 5.99 },
];

const Foodorder = () => {
  const [cart, setCart] = useState([]);
  const [roomType, setRoomType] = useState("");
  const [roomId, setRoomId] = useState("");
  const [userEmail, setUserEmail] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email); // Set the logged-in user's email
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const addToCart = (item) => setCart((prevCart) => [...prevCart, item]);

  const removeFromCart = (indexToRemove) =>
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price, 0).toFixed(2);

  const handleProceed = () => {
    if (!roomType || !roomId) {
      alert("Please select a room type and enter a Room ID.");
      return;
    }

    const totalPrice = calculateTotal();

    // Prepare an array of food names and prices from the cart
    const foodDetails = cart.map(item => ({
      foodName: item.name,
      price: item.price,
    }));

    const orderDetails = {
      totalPrice,
      email: userEmail,
      roomType,
      roomId,
      orderInfo: "Just Ordered",
      foodItems: foodDetails, // Include food names and prices
    };

    // Send the order details to the backend
    fetch('http://localhost:5000/orderDetails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails),
    })
      .then((response) => {
        if (response.ok) {
          setSuccessMessage("Order placed successfully!");
          setCart([]); // Clear the cart
          setRoomType(""); // Reset room type
          setRoomId(""); // Reset room ID
        } else {
          throw new Error("Failed to place order");
        }
      })
      .catch((error) => {
        console.error('Error placing order:', error);
        setSuccessMessage("Failed to place order. Please try again.");
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <Sidebar />
      <h1 className="text-4xl font-bold text-center mb-8">Food Order</h1>
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
          {successMessage}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foodItems.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-700 text-sm mb-2">{item.description}</p>
              <p className="text-gray-900 font-bold">${item.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(item)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Cart</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center text-gray-700 mb-2">
                <span>{item.name} - ${item.price.toFixed(2)}</span>
                <button
                  onClick={() => removeFromCart(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">Your cart is empty.</p>
        )}
        {cart.length > 0 && (
          <div>
            <div className="my-4">
              <label className="block mb-2 text-gray-700">Select Room Type:</label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="input input-bordered w-full"
              >
                <option value="">Select Room Type</option>
                <option value="Study Room">Study Room</option>
                <option value="Group Study Room">Group Study Room</option>
              </select>
            </div>
            <div className="my-4">
              <label className="block mb-2 text-gray-700">Enter Room ID:</label>
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter Room ID"
              />
            </div>
            <div className="my-4">
              <p className="text-xl font-semibold">Total Price: ${calculateTotal()}</p>
            </div>
            <button
              onClick={handleProceed}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Proceed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Foodorder;
