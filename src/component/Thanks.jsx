import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/'); // Redirects to the home page
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md p-6 rounded-lg text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-6">Thank You!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Your order has been placed successfully. Check your activity page for further update
        </p>
        <button
          onClick={handleGoBack}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
