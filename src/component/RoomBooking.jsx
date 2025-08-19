import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Link, useLoaderData } from 'react-router-dom';
const RoomBooking = () => {
  // Dynamic card data
      const room = useLoaderData();
      console.log(room);
      
      const [rooms, setrooms] = useState(room);

  return (

    <div className="container mx-auto my-10">
    <Sidebar></Sidebar>
      <h1 className="text-3xl font-bold text-center mb-6">Available Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map((card) => (
          <div key={card.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={card.image} alt={card.title} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{card.title}</h2>
              <p>{card.description}</p>
              <div className="card-actions justify-end">
              <Link to={`/room/${card.id}`}><button className="btn btn-primary">Book Now</button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomBooking;
