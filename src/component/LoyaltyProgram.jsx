import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const LoyaltyProgram = () => {
  const [userPoints, setUserPoints] = useState(0); // Placeholder for user's loyalty points
  const [isMember, setIsMember] = useState(false);  // Placeholder to check if the user is a member

  useEffect(() => {
    // Simulate fetching user data (points, membership status) from a backend
    // Replace with actual API call
    setUserPoints(200); // Example points
    setIsMember(true);  // Example: user is a loyalty member
  }, []);

  const rewards = [
    { name: "Free Pizza", pointsRequired: 100 },
    { name: "10% Discount", pointsRequired: 200 },
    { name: "Exclusive Access to New Menu", pointsRequired: 300 },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <Sidebar></Sidebar>
      <h1 className="text-4xl font-bold text-center mb-8">Loyalty Program</h1>

      {/* Introduction */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Join Our Loyalty Program</h2>
        <p className="mb-4">
          Welcome to our Loyalty Program! By becoming a member, you’ll earn points with every purchase and unlock exciting rewards like discounts, free meals, and more!
        </p>
        <p className="mb-4">
          Already a member? You have {userPoints} points! Keep earning to level up and enjoy more perks!
        </p>
        {!isMember && (
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
            Join Now
          </button>
        )}
      </div>

      {/* How It Works */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <ol className="list-decimal pl-6">
          <li className="mb-2">Sign up for free and start earning points with each purchase.</li>
          <li className="mb-2">Earn points for activities like purchases, reviews, and referrals.</li>
          <li className="mb-2">Redeem your points for rewards like discounts, free items, and more!</li>
        </ol>
      </div>

      {/* Rewards */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Rewards</h2>
        <ul className="list-disc pl-6">
          {rewards.map((reward, index) => (
            <li key={index} className="mb-4">
              <span className="font-semibold">{reward.name}</span> - Requires {reward.pointsRequired} points
            </li>
          ))}
        </ul>
      </div>

      {/* Points Tracking */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Points</h2>
        <p>You have <strong>{userPoints}</strong> points!</p>
        {userPoints >= 100 && (
          <button className="bg-green-500 text-white px-6 py-2 rounded mt-4 hover:bg-green-600 transition">
            Redeem Now
          </button>
        )}
      </div>

      {/* Terms & Conditions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Terms & Conditions</h2>
        <p className="mb-4">
          * Loyalty points are non-transferable and have no cash value. Points expire after 12 months.
        </p>
        <p className="mb-4">
          * Rewards are subject to availability and may change without notice.
        </p>
      </div>
    </div>
  );
};

export default LoyaltyProgram;
