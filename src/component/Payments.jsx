import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../../firebase.config';
import Sidebar from './Sidebar';

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [userEmail, setUserEmail] = useState(null);

    // Fetch user email using Firebase Auth
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail(null);
            }
        });
        return () => unsubscribe();
    }, []);

    // Fetch payment history
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch(`http://localhost:5000/payments`);
                const data = await response.json();
                
                // Filter payments by user email
                const filteredPayments = data.filter(payment => payment.userEmail === userEmail);
                setPayments(filteredPayments);

                
            } catch (error) {
                console.error('Error fetching payment history:', error);
            }
        };

        if (userEmail) {
            fetchPayments();
        }
    }, [userEmail]);

    return (
        <div className="max-w-5xl mx-auto p-8">
            <Sidebar />
            <h2 className="text-3xl font-bold text-center mb-6">Payment History</h2>
            {userEmail ? (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse table-auto bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="p-3 border">Payment ID</th>
                                <th className="p-3 border">Room ID</th>
                                <th className="p-3 border">Amount</th>
                                <th className="p-3 border">Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length > 0 ? (
                                payments.map((payment) => (
                                    <tr key={payment._id} className="text-center hover:bg-gray-50">
                                        <td className="p-3 border">{payment._id}</td>
                                        <td className="p-3 border">{payment.roomId}</td>
                                        <td className="p-3 border">${payment.amount}</td>
                                        <td className="p-3 border">{payment.date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center p-4 text-gray-500">
                                        No payment history available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500">Please log in to see your payment history.</p>
            )}
        </div>
    );
};

export default Payments;
