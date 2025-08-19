import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../../firebase.config';

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [userEmail, setUserEmail] = useState(null);
    const [bookedRooms, setBookedRooms] = useState([]); // List of booked Room IDs
    const [formData, setFormData] = useState({
        Room_id: '',
        email: '',
        rating: '',
        message: ''
    });

    // Fetch logged-in user's email
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
                setFormData((prev) => ({ ...prev, email: user.email }));
                
                 // Auto-fill email
            } else {
                setUserEmail(null);
            }
        });
        return () => unsubscribe();
    }, []);

    // Fetch all feedbacks
    useEffect(() => {
        fetch('http://localhost:5000/feedback')
            .then((res) => res.json())
            .then((data) => setFeedbacks(data));
    }, []);

    // Fetch user's bookings and filter by email
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:5000/bookings');
                const data = await response.json();
                console.log(data);
                
                
                // Filter bookings for the logged-in user
                const userBookings = data.filter((booking) => booking.userEmail === userEmail);
                const roomIds = userBookings.map((booking) => booking.roomId); // Extract Room IDs
                setBookedRooms(roomIds);
                console.log(userBookings);
                
            } catch (error) {
                console.error('Error fetching booking history:', error);
            }
        };

        if (userEmail) {
            fetchBookings();
        }
    }, [userEmail]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if Room_id exists in user's bookedRooms
        if (!bookedRooms.includes(parseInt(formData.Room_id))) {
            Swal.fire({
                title: 'Error',
                text: 'You can only leave feedback for rooms you have booked.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return;
        }

        fetch('http://localhost:5000/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Feedback added successfully.',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                    setFeedbacks([...feedbacks, formData]); // Add new feedback to state
                    e.target.reset();
                }
            });
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <Sidebar />
            <h2 className="text-3xl font-bold text-center mb-6">Customer Feedback</h2>

            <form className="bg-white shadow-md rounded-lg p-6 mb-6" onSubmit={handleSubmit}>
                <h3 className="text-xl font-semibold mb-4">Add Your Feedback</h3>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="Room_id">
                        Room ID
                    </label>
                    <input
                        type="number"
                        id="Room_id"
                        name="Room_id"
                        value={formData.Room_id}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        readOnly
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="rating">
                        Rating (1-5)
                    </label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit Feedback
                </button>
            </form>

            <div className="space-y-6">
                {feedbacks.length > 0 ? (
                    feedbacks.map((feedback, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">{feedback.name}</h3>
                                <span className="text-yellow-500 font-medium">Rating: {feedback.rating} / 5</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{feedback.email}</p>
                            <p className="text-gray-800 mt-4">{feedback.message}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No feedback available yet.</p>
                )}
            </div>
        </div>
    );
};

export default Feedback;
