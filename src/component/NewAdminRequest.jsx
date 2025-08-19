import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

const NewAdminRequest = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch all users
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);

        if (data) {
          // Filter users who have the role 'pending'
          const pending = data.filter((user) => user.role === 'pending');
          setPendingUsers(pending); // Set the filtered pending users
        } else {
          setError("Failed to load users");
        }
      })
      .catch((err) => {
        setError("Error fetching data: " + err.message);
      });
  }, []);

  const handleApproval = async (userId) => {
    try {
      const updatedUser = { role: 'admin' }; // Approve by changing role to admin
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      const result = await response.json();
      if (result.success) {
        // Update the list after approval
        setPendingUsers(pendingUsers.filter(user => user.uid !== userId));
      } else {
        setError("Failed to approve the user");
      }
    } catch (error) {
      setError("Error approving user: " + error.message);
    }
  };

  const handleRejection = async (userId) => {
    try {
      const updatedUser = { role: 'user' }; // Reject by changing role to user
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      const result = await response.json();
      if (result.success) {
        // Remove the rejected user from the list
        setPendingUsers(pendingUsers.filter(user => user.uid !== userId));
      } else {
        setError("Failed to reject the user");
      }
    } catch (error) {
      setError("Error rejecting user: " + error.message);
    }
  };

  return (
    <div>
      <Sidebar></Sidebar>
        
        <div>
        
        <div className="container mx-auto p-4 ">
        
    
    <h1 className="text-3xl font-bold mb-4 ml-10">New Admin Requests</h1>
    

    {error && <p className="text-red-500">{error}</p>}

    <table className="table-auto w-full border-collapse">
      <thead>
        <tr>
          <th className="px-4 py-2 border">Name</th>
          <th className="px-4 py-2 border">Email</th>
          <th className="px-4 py-2 border">Phone Number</th>
          <th className="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {pendingUsers.length > 0 ? (
          pendingUsers.map((user) => (
            <tr key={user.uid}>
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.phoneNumber}</td>
              <td className="px-4 py-2 border">
                <button
                  className="btn btn-primary"
                  onClick={() => handleApproval(user.uid)}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => handleRejection(user.uid)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center px-4 py-2 border">
              No pending requests
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
    </div>
    </div>
    

  );
};

export default NewAdminRequest;
