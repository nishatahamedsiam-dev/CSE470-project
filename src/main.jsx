import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './component/Home';

import Login from './component/Login';
import Register from './component/Register';
import RoomBooking from './component/RoomBooking';
import GroupStudy from './component/GroupStudy';
import Profile from './component/Profile';
import RoomDetails from './component/RoomDetails';
import StudyRoomDetails from './component/StudyRoomDetails';
import Cart from './component/Cart';
//import New from './component/New';
import Feedback from './component/Feedback';
import Payments from './component/Payments';
import BookingHistory from './component/BookingHistory';
import Pcaccess from './component/Pcaccess';
import Foodorder from './component/Foodorder';
import BillingPage from './component/OrderStatus';
import OrderInfo from './component/OrderInfo';
import ThankYouPage from './component/Thanks';
import NewAdminRequest from './component/NewAdminRequest';
import AddRoom from './component/AddRoom';
import PcDetails from './component/PcDetails';
import OrderStatus from './component/OrderStatus';
import OrderUpdate from './component/OrderUpdate';
import FandQ from './component/FandQ';
import LoyaltyProgram from './component/LoyaltyProgram';
import UDI from './component/UDI';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    loader: () => fetch("http://localhost:5000/rooms")
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/rooms",
    element: <RoomBooking></RoomBooking>,
    loader: () => fetch("http://localhost:5000/rooms")
  },
  {
    path: "/studyRoom",
    element: <GroupStudy></GroupStudy>,
    loader: () => fetch("http://localhost:5000/studyRooms")
  },
  {
    path: "/Profile",
    element: <Profile></Profile>,
  },
  {
    path: "/room/:id", // Add route for RoomDetails
    element: <RoomDetails></RoomDetails>,
    loader: () => fetch("http://localhost:5000/rooms")
  },
  {
    path: "/studyRoom/:id",
    element: <StudyRoomDetails></StudyRoomDetails>,
    loader: () => fetch("http://localhost:5000/studyRooms")
    
  },
  {
    path: "/Cart",
    element: <Cart></Cart>
  },
  {
    path: "/feedback",
    element:<Feedback></Feedback>
  },
  {
    path: "/bookings",
    element:<BookingHistory></BookingHistory>
  },
  {
    path: "/payments",
    element: <Payments></Payments>
  },{
    path: "/food",
    element: <Foodorder></Foodorder>,
  },
  {
    path: "/foodbill",
    element: <BillingPage></BillingPage>,
  },
  {
    path: "/orderinfo",
    element: <OrderInfo></OrderInfo>,
  },
  {
    path: "/thanks",
    element: <ThankYouPage></ThankYouPage>,
  },
  {
    path: "/pcAccess",
    element: <Pcaccess></Pcaccess>,
  },
  {
    path: "/addRoom",
    element: <AddRoom></AddRoom>,
  },
  {path: "/admin-requests",
    element: <NewAdminRequest></NewAdminRequest>
  },
  {path: "/pc-details/:id",
    element: <PcDetails></PcDetails>
  },
  {path: "/OrderStatus",
    element: <OrderStatus></OrderStatus>
  },
  {path: "/OrderUpdate",
    element: <OrderUpdate></OrderUpdate>
  },
  {path: "/F&Q",
    element: <FandQ></FandQ>
  },
  {path: "/LoyaltyProgram",
    element: <LoyaltyProgram></LoyaltyProgram>
  },
  {path: "/UDI",
    element: <UDI></UDI>
  },

  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
