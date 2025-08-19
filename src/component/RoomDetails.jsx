import React, { useState, useEffect } from 'react';
import { useParams, Link, useLoaderData } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../../firebase.config';
import Sidebar from './Sidebar';

const RoomDetails = () => {
  const roomData = useLoaderData();
  const [rooms, setRooms] = useState(roomData);
  const { id } = useParams();
  const room = rooms.find((card) => card.id === parseInt(id));

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState(null);

  // Get the logged-in user's email
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleBooking = async () => {
    setError('');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(date);

    if (selectedDate < today) {
      setError('You cannot book a room on a past date. Please select a future date.');
      return;
    }

    if (selectedDate.getTime() === today.getTime()) {
      const selectedTime = new Date(`${date}T${time}`);
      const currentTime = new Date();

      if (selectedTime < currentTime) {
        setError('You cannot book a room for a past time today. Please select a future time.');
        return;
      }
    }

    if (date && time && userEmail) {
      try {
        // Fetch all bookings from the database
        const response = await fetch('http://localhost:5000/bookings');
        const allBookings = await response.json();

        // Filter bookings for the current room
        const roomBookings = allBookings.filter((booking) => booking.roomId === room.id);

        // Check if any booking matches the selected date and time
        const isAlreadyBooked = roomBookings.some(
          (booking) => booking.date === date && booking.time === time
        );

        if (isAlreadyBooked) {
          setError('This room is already booked for the selected date and time.');
          return;
        }

        // If no conflicts, proceed with booking
        const bookingDetails = {
          roomId: room.id,
          title: room.title,
          date,
          time,
          amount: room.pricePerNight,
          userEmail,
        };

        // Send booking details to the server
        const bookingResponse = await fetch('http://localhost:5000/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingDetails),
        });

        const bookingResult = await bookingResponse.json();

        if (bookingResult.acknowledged) {
          alert(`Booking successful for ${room.title} on ${date} at ${time}.`);
        } else {
          setError('Failed to book the room. Please try again.');
        }

        // Optionally: Post the same data to payment history endpoint
        fetch('http://localhost:5000/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingDetails),
        }).catch(() => {
          console.error('Failed to update payment history.');
        });
      } catch (err) {
        setError('An error occurred while checking or booking the room. Please try again later.');
      }
    } else {
      setError('Please select both date and time to proceed with the booking.');
    }
  };

  if (!room) {
    return (
      <div className="container mx-auto my-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-red-500">Room not found</h1>
        <p className="text-center">The room with the specified ID could not be found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 px-4">
      <Sidebar />
      <h1 className="text-4xl font-bold text-center mb-6">{room.title}</h1>
      <div className="flex justify-center mb-8">
        <img src={room.image} alt={room.title} className="w-full max-w-2xl rounded-lg shadow-lg" />
      </div>
      <div className="text-lg mb-8">
        <p className="text-xl font-semibold mb-4">
          Room ID: <span className="text-blue-500">{room.id}</span>
        </p>
        <p className="mb-4">{room.description}</p>
        <p className="text-xl font-semibold mb-4">
          Price: <span className="text-green-500">${room.pricePerNight} per night</span>
        </p>
      </div>
      {error && (
        <div className="text-red-500 font-semibold mb-4 text-center">
          {error}
        </div>
      )}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Book This Room</h2>
        <label className="block mb-2">Select Date</label>
        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label className="block mb-2">Select Time</label>
        <input
          type="time"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button
          onClick={handleBooking}
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
        >
          Confirm Booking
        </button>
      </div>
      <div className="text-center mt-6">
        <Link to="/rooms" className="text-blue-500">Back to Available Rooms</Link>
      </div>
    </div>
  );
};

export default RoomDetails;
