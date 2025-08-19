import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Sidebar from './Sidebar';

const data = [
  {
    id: 1,
    title: "PC 01",
    description: "For Daily Use",
    imageUrl: "/Images/Image1.jpg",
  },
  {
    id: 2,
    title: "PC 02",
    description: "For Programming Purpose",
    imageUrl: "/Images/Image1.jpg",
  },
  {
    id: 3,
    title: "PC 03",
    description: "For Programming Purpose",
    imageUrl: "/Images/Image1.jpg",
  },
  {
    id: 4,
    title: "PC 04",
    description: "For Gaming Purpose",
    imageUrl: "/Images/Image1.jpg",
  },
  {
    id: 5,
    title: "PC 05",
    description: "For Gaming Purpose",
    imageUrl: "/Images/Image1.jpg",
  },
];

const Pcaccess = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <Sidebar></Sidebar>
      <h1 className="text-4xl font-bold text-center mb-8">PC ACCESS</h1>
      <h2 className="text-4xl font-bold text-center mb-8">Find Your Suitable PC Here!!!</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-700 text-sm">{item.description}</p>
              <Link to={`/pc-details/${item.id}`}>
                <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pcaccess;
