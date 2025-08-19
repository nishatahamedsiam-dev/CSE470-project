import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const UDI = () => {
  const [feedback, setFeedback] = useState(''); // For feedback input
  const [votes, setVotes] = useState(
    JSON.parse(localStorage.getItem('votes')) || {} // Retrieve votes from local storage
  );
  const [feedbackList, setFeedbackList] = useState(
    JSON.parse(localStorage.getItem('feedbackList')) || [] // Retrieve feedback list from local storage
  );

  // Features for voting
  const features = [
    'Improved Booking Flow',
    'Enhanced Customer Support',
    'Mobile App Availability',
    'More Payment Options',
  ];

  // Handle voting
  const handleVote = (feature) => {
    const updatedVotes = { ...votes, [feature]: (votes[feature] || 0) + 1 };
    setVotes(updatedVotes);
    localStorage.setItem('votes', JSON.stringify(updatedVotes)); // Save votes to local storage
  };

  // Handle feedback submission
  const handleSubmitFeedback = (e) => {
    e.preventDefault();

    const updatedFeedbackList = [...feedbackList, feedback];
    setFeedbackList(updatedFeedbackList);
    localStorage.setItem('feedbackList', JSON.stringify(updatedFeedbackList)); // Save feedback to local storage

    setFeedback(''); // Clear the feedback input
    alert('Thank you for your feedback!');
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <Sidebar></Sidebar>
      <h1 className="text-4xl font-bold text-center mb-8">
        User-Driven Improvements
      </h1>

      {/* Voting Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Vote for Your Favorite Features</h2>
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center justify-between bg-white p-4 rounded shadow">
              <span>{feature}</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleVote(feature)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Vote
                </button>
                <span className="text-gray-600">Votes: {votes[feature] || 0}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Feedback Section */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Submit Your Feedback</h2>
        <form onSubmit={handleSubmitFeedback}>
          <textarea
            className="w-full p-4 border border-gray-300 rounded mb-4"
            rows="4"
            placeholder="Share your thoughts about our platform..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Submit Feedback
          </button>
        </form>
      </div>

      {/* Display Feedback */}
      <div className="bg-gray-200 p-6 rounded shadow mt-10">
        <h2 className="text-2xl font-semibold mb-4">User Feedback</h2>
        {feedbackList.length > 0 ? (
          <ul className="space-y-4">
            {feedbackList.map((feedback, index) => (
              <li key={index} className="bg-white p-4 rounded shadow">
                {feedback}
              </li>
            ))}
          </ul>
        ) : (
          <p>No feedback submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default UDI;
