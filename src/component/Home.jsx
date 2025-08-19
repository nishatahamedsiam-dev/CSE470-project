import React, { useState,useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';

import { onAuthStateChanged,signOut } from "firebase/auth";
import auth from '../../firebase.config';

const Home = () => {
    const room = useLoaderData();
     //console.log(room);
    
    const [rooms, setrooms] = useState(room);
    const [studyRooms, setstudyRooms] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }

          fetch("http://localhost:5000/studyRooms")
          .then(res => res.json())
          .then(data => setstudyRooms(data)
          )

         
        });

        
      
        return () => unsubscribe(); // Clean up listener
      }, []);
      
      const handleLogout = () => {
        signOut(auth)
          .then(() => {
            console.log("User signed out successfully");
          })
          .catch((error) => {
            console.error("Error signing out:", error);
          });
      };
    
    return (
        <div>
            
<Sidebar></Sidebar>
<div className='flex w-full justify-end'>
    
    
{!isLoggedIn ? (
    <Link to="/login">
      <button className="p-2 mr-9 mt-5 btn btn-accent w-28">Login</button>
    </Link>
  ) : (
    <button onClick={handleLogout} className="p-2 mr-9 mt-5 btn btn-warning w-28">
      Logout
    </button>
  )}
</div>

<div className=''><h1 className='text-center text-5xl '>Book a bunk</h1></div>
<Carousel></Carousel>
<div className="container mx-auto my-10">
    
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
              <p className="text-xl font-semibold mb-4">Price: <span className="text-green-500">${card.pricePerNight} per night</span></p>
              <div className="card-actions justify-end">
              <Link to={`/room/${card.id}`}><button className="btn btn-primary">Book Now</button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

<div className="w-full flex mx-[700px]">
<Link to="/rooms"><button className='btn btn-accent'>More rooms</button></Link>
</div>

    <div className="container mx-auto my-10">

    <h1 className="text-3xl font-bold text-center mb-6">Available Study rooms</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {studyRooms.map((card) => (
        <div key={card.id} className="card bg-base-100 shadow-xl">
        <figure>
            <img className='w-[490px] h-[368px]' src={card.image} alt={card.title} />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{card.title}</h2>
            <p>{card.description}</p>
            <div className="card-actions justify-end">
            <Link to={`/studyRoom/${card.id}`}><button className="btn btn-primary">Book Now</button></Link>
            </div>
        </div>
        </div>
    ))}
    </div>
</div>

<div className="w-full flex mx-[700px] mb-10">
<Link to={"/studyRoom"}><button className='btn btn-accent'>More study rooms</button></Link>
</div>

        </div>
    );
};

export default Home;