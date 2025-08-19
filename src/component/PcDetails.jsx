import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import Sidebar from "./Sidebar";

const data = [
  // PC Data
  { id: 1, title: "PC 01", description: "For Daily Use", pricePerHour: 10, imageUrl: "/Images/Image1.jpg" },
  { id: 2, title: "PC 02", description: "For Programming Purpose", pricePerHour: 15, imageUrl: "/Images/Image1.jpg" },
  { id: 3, title: "PC 03", description: "For Programming Purpose", pricePerHour: 15, imageUrl: "/Images/Image1.jpg" },
  { id: 4, title: "PC 04", description: "For Gaming Purpose", pricePerHour: 20, imageUrl: "/Images/Image1.jpg" },
  { id: 5, title: "PC 05", description: "For Gaming Purpose", pricePerHour: 20, imageUrl: "/Images/Image1.jpg" },
];

const PcDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pc = data.find((item) => item.id === parseInt(id));

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [history, setHistory] = useState([]);
  const [userEmail, setUserEmail] = useState(""); // Track the logged-in user's email

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserEmail(user.email); // Get the logged-in user's email
    } else {
      navigate("/login"); // Redirect to login if no user is found
    }

    // Fetch booking history
    const fetchBookingHistory = async () => {
      try {
        const response = await fetch("http://localhost:5000/pcbookinghistory", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        setHistory(result); // Set fetched booking history
      } catch (err) {
        console.error("Error fetching booking history:", err);
      }
    };

    fetchBookingHistory();
  }, [navigate]);

  const sendEmail = async (bookingDetails) => {
    try {
      const response = await fetch("http://localhost:5000/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: userEmail,
          subject: `Booking Confirmation for ${bookingDetails.title}`,
          message: `Your booking for ${bookingDetails.title} on ${bookingDetails.date} at ${bookingDetails.time} for ${bookingDetails.duration} hours has been confirmed. Total Cost: $${bookingDetails.totalCost}.`,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        console.error("Failed to send email:", result.message);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleBooking = async () => {
    setError("");
    setSuccess("");

    if (!date || !time || duration <= 0) {
      setError("Please select a valid date, time, and duration.");
      return;
    }

    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();

    if (selectedDateTime < now) {
      setError("You cannot book a PC for a past date or time.");
      return;
    }

    const bookingDetails = {
      pcId: pc.id,
      title: pc.title,
      date,
      time,
      duration,
      totalCost: pc.pricePerHour * duration,
      userEmail, // Include user email in booking details
    };

    try {
      const response = await fetch("http://localhost:5000/pcbookinghistory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingDetails),
      });

      const result = await response.json();

      if (result.acknowledged) {
        setSuccess(
          `Booking confirmed for ${pc.title} on ${date} at ${time}.`
        );
        sendEmail(bookingDetails); // Send confirmation email
        setTimeout(() => navigate("/pcaccess"), 2000); // Redirect after 2 seconds
      } else {
        setError("Failed to book the PC. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while booking. Please try again later.");
    }
  };

  if (!pc) {
    return (
      <div className="container mx-auto my-10">
        <h1 className="text-3xl font-bold text-center text-red-500">
          PC not found
        </h1>
        <p className="text-center">
          The PC with the specified ID could not be found.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Sidebar />
      <div className="container mx-auto my-10 px-4">
        <h1 className="text-4xl font-bold text-center mb-6">{pc.title}</h1>
        <div className="flex justify-center mb-8">
          <img
            src={pc.imageUrl}
            alt={pc.title}
            className="w-full max-w-2xl rounded-lg shadow-lg"
          />
        </div>
        <p className="text-lg mb-4">{pc.description}</p>
        <p className="text-lg font-semibold mb-4">
          Price:{" "}
          <span className="text-green-500">${pc.pricePerHour} per hour</span>
        </p>
        <div className="mb-4">
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {success && <p className="text-green-500 mb-2">{success}</p>}
          <div className="mb-4">
            <label className="block text-sm font-medium">Select Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Select Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Duration (hours)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded"
              min="1"
            />
          </div>
          <button
            onClick={handleBooking}
            className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600"
          >
            Confirm Booking
          </button>
        </div>
        <h2 className="text-2xl font-bold mt-10">Booking History</h2>
        <ul className="list-disc pl-6 mt-4">
          {history.map((booking) => (
            <li key={booking.pcId}>
              PC {booking.pcId}: {booking.date} at {booking.time}, for{" "}
              {booking.duration} hours
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PcDetails;
