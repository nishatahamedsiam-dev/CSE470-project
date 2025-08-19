import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
const StudyRoomDetails = () => {


    const room = useLoaderData();
    const [rooms, setrooms] = useState(room);
  // Sample study room data (this would come from a database in a real-world app)
  

  // Retrieve the study room id from the URL params
  const { id } = useParams();

  // Find the study room that matches the ID from the URL
  const studyRoom = rooms.find(room => room.id === parseInt(id));

  // If the study room is not found, show a "Room not found" message
  if (!studyRoom) {
    return (
      <div className="container mx-auto my-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-red-500">Study Room not found</h1>
        <p className="text-center">The study room with the specified ID could not be found.</p>
      </div>
    );
  }

  // Booking state for study room (if needed)
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  // Handle booking logic for study room
  const handleBooking = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(date);

    if (selectedDate < today) {
      setError('You cannot book a study room for a past date. Please select a future date.');
      return;
    }

    if (selectedDate.getTime() === today.getTime()) {
      const selectedTime = new Date(`${date}T${time}`);
      const currentTime = new Date();

      if (selectedTime < currentTime) {
        setError('You cannot book a study room for a past time today. Please select a future time.');
        return;
      }
    }

    if (date && time) {
      alert(`Booking successful for ${studyRoom.title} on ${date} at ${time}.`);
    } else {
      setError('Please select both date and time to proceed with the booking.');
    }
  };

  return (
    <div className="container mx-auto my-10 px-4">
      <Sidebar></Sidebar>
      {/* Study Room Header */}
      <h1 className="text-4xl font-bold text-center mb-6">{studyRoom.title}</h1>
      
      {/* Study Room Image */}
      <div className="flex justify-center mb-8">
        <img src={studyRoom.image} alt={studyRoom.title} className="w-full max-w-2xl rounded-lg shadow-lg" />
      </div>

      {/* Study Room Description */}
      <div className="text-lg mb-8">
        <p className="text-xl font-semibold mb-4">Study Room ID: <span className="text-blue-500">{studyRoom.id}</span></p>
        <p className="mb-4">{studyRoom.description}</p>
        <p className="text-xl font-semibold mb-4">Price: <span className="text-green-500">${studyRoom.price} per hour</span></p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 font-semibold mb-4 text-center">
          {error}
        </div>
      )}

      {/* Booking Form */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Book This Study Room</h2>
        
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

      {/* Back Button */}
      <div className="text-center mt-6">
        <Link to="/studyRoom" className="text-blue-500">Back to Available Study Rooms</Link>
      </div>
    </div>
  );
};

export default StudyRoomDetails;
