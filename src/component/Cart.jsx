import React from 'react';
//import { useBooking } from '../context/BookingContext'; // Assuming context is used

const Cart = () => {
  const { bookings, removeBooking } = useBooking(); // Fetch bookings from context

  const handleConfirmPayment = () => {
    // Placeholder for payment integration logic
    alert('Payment integration is pending. Please implement it later.');
  };

  return (
    <div className="container mx-auto my-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-6">Your Cart</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-lg text-gray-600">
          No bookings added yet. Go back to book a room or study room.
        </p>
      ) : (
        <>
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 mb-4 shadow-md"
            >
              <h2 className="text-2xl font-semibold">{booking.title}</h2>
              <p className="text-gray-700">Date: {booking.date}</p>
              <p className="text-gray-700">Time: {booking.time}</p>
              <p className="text-green-600 font-bold">Price: ${booking.price}</p>
              <button
                onClick={() => removeBooking(booking.id)}
                className="mt-4 text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={handleConfirmPayment}
            className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600"
          >
            Confirm and Pay
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
