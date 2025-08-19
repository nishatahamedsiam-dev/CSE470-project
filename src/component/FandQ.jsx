import React from 'react';
import Sidebar from './Sidebar';

const FandQ = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <Sidebar></Sidebar>
      <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions (FAQ)</h1>

      <div className="space-y-6">
        {/* FAQ Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">General Questions</h2>

          <div className="mb-4">
            <h3 className="font-semibold text-lg">What is this website about?</h3>
            <p>This website allows users to order food and book study rooms, making it easier to plan meals and workspace availability.</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-lg">How do I place an order?</h3>
            <p>You can browse through the food menu, add items to your cart, select a room, and proceed to checkout for your order.</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-lg">Can I change my order after placing it?</h3>
            <p>Unfortunately, once the order is placed, you cannot change it. However, feel free to contact customer support for any urgent requests.</p>
          </div>
        </div>

        {/* Resources Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Resources</h2>

          <div className="mb-4">
            <h3 className="font-semibold text-lg">Documentation</h3>
            <p>You can find the full documentation for our platform <a href="/docs" className="text-blue-600 underline">here</a>.</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-lg">Support</h3>
            <p>If you need any assistance, visit our <a href="/support" className="text-blue-600 underline">support page</a> for more information.</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <p>For any inquiries, feel free to reach out to us at <a href="mailto:support@website.com" className="text-blue-600 underline">support@website.com</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FandQ;
