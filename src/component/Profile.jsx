import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import auth from '../../firebase.config';
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth"; 
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Tracks if the user is in edit mode
  const [formData, setFormData] = useState({}); // Holds editable form data
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        const { displayName, email, photoURL } = user;
        setUserInfo({
          name: displayName || "John Doe",
          email: email,
          photoURL: photoURL || "https://via.placeholder.com/150",
        });
        setFormData({
          name: displayName || "",
          email: email,
          photoURL: photoURL || "",
        });
      } else {
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    });

    return () => unsubscribe();
  }, []);

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

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const { name, photoURL } = formData;

    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    })
      .then(() => {
        console.log("Profile updated successfully");

        setUserInfo({ ...userInfo, name, photoURL });
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Sidebar />
          <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <img
                src={userInfo?.photoURL}
                alt="Profile"
                className="max-w-sm rounded-lg shadow-2xl"
              />
              <div>
                {isEditing ? (
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter Name"
                      className="input input-bordered mb-4"
                    />
                    <input
                      type="text"
                      name="photoURL"
                      value={formData.photoURL}
                      onChange={handleInputChange}
                      placeholder="Enter Photo URL"
                      className="input input-bordered mb-4"
                    />
                    <button onClick={handleSave} className="btn btn-success mr-2">
                      Save
                    </button>
                    <button onClick={handleEditToggle} className="btn btn-error">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-5xl font-bold">{userInfo?.name}</h1>
                    <p className="py-2">
                      <span className="underline">Email Address</span>: {userInfo?.email}
                    </p>
                    <button onClick={handleEditToggle} className="btn btn-primary mt-4">
                      Edit Profile
                    </button>
                    <button onClick={handleLogout} className="btn btn-warning mt-4 ml-2">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center my-[250px]">
          <Link className="mx-auto" to={"/login"}>
            <button className="btn btn-accent w-auto text-3xl">Please Login</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
