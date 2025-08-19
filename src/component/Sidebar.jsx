import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../../firebase.config";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin
  const navigate = useNavigate();

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        // Fetch user's role from the database
        fetch(`http://localhost:5000/users/${user.uid}`)
          .then((res) => res.json())
          .then((data) => {
            setIsAdmin(data.role === "admin");
          })
          .catch((error) => console.error("Error fetching user role:", error));
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="relative">
      {/* Burger Button */}
      <button
        onClick={toggleSidebar}
        className={`absolute top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded transition-opacity duration-300 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <span className="block w-6 h-1 bg-white mb-1"></span>
        <span className="block w-6 h-1 bg-white mb-1"></span>
        <span className="block w-6 h-1 bg-white"></span>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-gray-800 text-white transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-40`}
      >
        {/* Close Button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-white text-2xl font-bold focus:outline-none"
        >
          &times;
        </button>

        <nav className="flex flex-col h-full p-4 mt-8 overflow-y-auto">
          <Link
            to="/"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            <i className="fa fa-fw fa-star-o mr-2"></i>
            <span>Home</span>
          </Link>
          <Link
            to="/rooms"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            <i className="fa fa-fw fa-bell-o mr-2"></i>
            <span>Available Rooms</span>
          </Link>
          <Link
            to="/studyRoom"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            <i className="fa fa-fw fa-envelope-o mr-2"></i>
            <span>Group Study Room</span>
          </Link>
          <Link
            to="/feedback"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            <i className="fa fa-fw fa-comment-o mr-2"></i>
            <span>Feedback</span>
          </Link>
          <Link
            to="/payments"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            <i className="fa fa-fw fa-credit-card mr-2"></i>
            <span>Payment History</span>
          </Link>
          <Link
            to="/bookings"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            <i className="fa fa-fw fa-calendar-check-o mr-2"></i>
            <span>Booking History</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            <i className="fa fa-fw fa-bar-chart-o mr-2"></i>
            <span>Profile</span>
          </Link>
          <Link
            to="/food"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            <i className="fa fa-fw fa-cutlery mr-2"></i>
            <span>Food</span>
          </Link>
          <Link
            to="/OrderStatus"
            className={`flex items-center px-4 py-2 hover:bg-gray-700 ${
              isAdmin ? "hidden" : ""
            }`}
            onClick={toggleSidebar}
          >
            <i className="fa fa-fw fa-cutlery mr-2"></i>
            <span>Order Status</span>
          </Link>
          <Link
            to="/pcAccess"
            className="flex items-center px-4 py-2 hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            <i className="fa fa-fw fa-desktop mr-2"></i>
            <span>PC Access</span>
          </Link>

          {/* Links visible to all users */}
          {!isAdmin && (
            <>
              <Link
                to="/LoyaltyProgram"
                className="flex items-center px-4 py-2 hover:bg-gray-700"
                onClick={toggleSidebar}
              >
                <i className="fa fa-fw fa-desktop mr-2"></i>
                <span>Loyalty Program</span>
              </Link>
              <Link
                to="/UDI"
                className="flex items-center px-4 py-2 hover:bg-gray-700"
                onClick={toggleSidebar}
              >
                <i className="fa fa-fw fa-desktop mr-2"></i>
                <span>User-Driven Improvements</span>
              </Link>
              <Link
                to="/F&Q"
                className="flex items-center px-4 py-2 hover:bg-gray-700"
                onClick={toggleSidebar}
              >
                <i className="fa fa-fw fa-desktop mr-2"></i>
                <span>F&Q</span>
              </Link>
            </>
          )}

          {/* Admin-Only Links */}
          {isAdmin && (
            <>
              <Link
                to="/admin-requests"
                className="flex items-center px-4 py-2 hover:bg-gray-700"
                onClick={toggleSidebar}
              >
                <i className="fa fa-fw fa-user-plus mr-2"></i>
                <span>New Admin Requests</span>
              </Link>
              <Link
                to="/addRoom"
                className="flex items-center px-4 py-2 hover:bg-gray-700"
                onClick={toggleSidebar}
              >
                <i className="fa fa-fw fa-plus-circle mr-2"></i>
                <span>Add Room</span>
              </Link>

              {/* New Order Update Link */}
              <Link
                to="/OrderUpdate"
                className="flex items-center px-4 py-2 hover:bg-gray-700"
                onClick={toggleSidebar}
              >
                <i className="fa fa-fw fa-refresh mr-2"></i>
                <span>Order Update</span>
              </Link>
            </>
          )}

          {/* Conditional Logout/Login */}
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                toggleSidebar();
              }}
              className="flex items-center px-4 py-2 hover:bg-gray-700"
            >
              <i className="fa fa-fw fa-sign-out mr-2"></i>
              <span>Log Out</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center px-4 py-2 hover:bg-gray-700"
              onClick={toggleSidebar}
            >
              <i className="fa fa-fw fa-sign-in mr-2"></i>
              <span>Log In</span>
            </Link>
          )}
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
