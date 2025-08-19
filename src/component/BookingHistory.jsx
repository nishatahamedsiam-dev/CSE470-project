import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../firebase.config";
import Sidebar from "./Sidebar";

const BookingHistory = () => {
  const [roomBookings, setRoomBookings] = useState([]); // Room booking history
  const [pcBookings, setPcBookings] = useState([]); // PC booking history
  const [foodOrders, setFoodOrders] = useState([]); // Food order history
  const [userEmail, setUserEmail] = useState(null); // Track logged-in user's email
  const navigate = useNavigate();

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        navigate("/login"); // Redirect to login page if not logged in
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch data for room bookings, PC access, and food orders
  useEffect(() => {
    if (userEmail) {
      // Fetch room booking history
      fetch("http://localhost:5000/bookings")
        .then((res) => res.json())
        .then((data) => {
          const userRoomBookings = data.filter(
            (booking) => booking.userEmail === userEmail
          );
          setRoomBookings(userRoomBookings);
        })
        .catch((error) => console.error("Error fetching room bookings:", error));

      // Fetch PC access history
      fetch("http://localhost:5000/pcbookinghistory")
        .then((res) => res.json())
        .then((data) => {
          const userPcBookings = data.filter(
            (pcBooking) => pcBooking.userEmail === userEmail
          );
          setPcBookings(userPcBookings);
          console.log(userPcBookings);
          
        })
        .catch((error) => console.error("Error fetching PC bookings:", error));

      // Fetch food order history
      fetch("http://localhost:5000/orderDetails")
        .then((res) => res.json())
        .then((data) => {
          const userFoodOrders = data.filter(
            (order) => order.email === userEmail
          );
          setFoodOrders(userFoodOrders);
          console.log(data);
          
        })
        .catch((error) => console.error("Error fetching food orders:", error));
    }
  }, [userEmail]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <Sidebar />
      <h2 className="text-3xl font-bold text-center mb-6">Booking History</h2>

      {/* Room Booking History */}
      <h3 className="text-2xl font-semibold mb-4">Room Booking History</h3>
      {roomBookings.length > 0 ? (
        <div className="space-y-4 mb-8">
          {roomBookings.map((booking) => (
            <div
              key={booking.roomId}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <h3 className="text-xl font-semibold">Room {booking.roomId}</h3>
              <p className="text-gray-700">Booking Date: {booking.date}</p>
              <p className="text-gray-700">Booking Time: {booking.time}</p>
              <p
                className={`text-sm mt-2 ${
                  booking.status === "Confirmed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                Status: {booking.status}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mb-8">
          No room booking history available.
        </p>
      )}

      {/* PC Booking History */}
      <h3 className="text-2xl font-semibold mb-4">PC Access History</h3>
      {pcBookings.length > 0 ? (
        <div className="space-y-4 mb-8">
          {pcBookings.map((pcBooking) => (
            <div
              key={pcBooking._id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <h3 className="text-xl font-semibold">{pcBooking.title}</h3>
              <p className="text-gray-700">Access Date: {pcBooking.date}</p>
              <p className="text-gray-700">Access Time: {pcBooking.time}</p>
              <p className="text-gray-700">
                Duration: {pcBooking.duration} hours
              </p>
              <p className="text-gray-700">
                Total Cost: ${pcBooking.totalCost}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mb-8">
          No PC access history available.
        </p>
      )}

      {/* Food Order History */}
      <h3 className="text-2xl font-semibold mb-4">Food Order History</h3>
      {foodOrders.length > 0 ? (
        <div className="space-y-4">
          {foodOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <h3 className="text-xl font-semibold">Order #{order._id}</h3>
              <p className="text-gray-700">Order Date: {order.date}</p>
              <p className="text-gray-700">
                 {}
              </p>
              <p className="text-gray-700">Total Cost: ${order.totalPrice}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No food order history available.
        </p>
      )}
    </div>
  );
};

export default BookingHistory;
