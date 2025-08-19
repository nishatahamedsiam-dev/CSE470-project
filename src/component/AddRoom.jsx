import React, { useState } from 'react';
import Sidebar from './Sidebar';

const AddRoom = () => {
  const [room, setRoom] = useState({
    title: '',
    description: '',
    pricePerNight: '',
    rating: '',
    details: '',
    image: '',
  });

  const [roomType, setRoomType] = useState('sleeping'); // Default room type
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  const handleRoomTypeChange = (e) => {
    setRoomType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!room.title || !room.description || !room.pricePerNight || !room.rating || !room.details || !room.image) {
      setError("Please fill all fields");
      return;
    }

    const postUrl = roomType === 'study' 
      ? 'http://localhost:5000/studyRooms' 
      : 'http://localhost:5000/rooms';

    try {
      const response = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(room),
      });

      const data = await response.json();

      if (data.insertedId) {
        setSuccess("Room added successfully!");
        setRoom({
          title: '',
          description: '',
          pricePerNight: '',
          rating: '',
          details: '',
          image: '',
        });
      } else {
        setError("Failed to add room.");
      }
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  return (
    <div className='gap-2'>
      <Sidebar />
      <div className="mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 ml-10">Add New Room</h1>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Room Type</label>
            <select
              name="roomType"
              value={roomType}
              onChange={handleRoomTypeChange}
              className="mt-1 block w-full border border-gray-300 p-2 rounded"
              required
            >
              <option value="sleeping">Sleeping Room</option>
              <option value="study">Study Room</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={room.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={room.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Price Per Night</label>
            <input
              type="number"
              name="pricePerNight"
              value={room.pricePerNight}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Rating</label>
            <input
              type="number"
              name="rating"
              value={room.rating}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 p-2 rounded"
              step="0.1"
              min="0"
              max="5"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Room Details</label>
            <textarea
              name="details"
              value={room.details}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Image URL</label>
            <input
              type="url"
              name="image"
              value={room.image}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Room</button>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;
