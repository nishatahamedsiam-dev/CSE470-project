import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import auth from '../../firebase.config';

const Register = () => {
    const navigate = useNavigate();
    const [regError, setRegError] = useState("");
    const [role, setRole] = useState("user");

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const number = e.target.number.value;
        const imageUrl = e.target.image.value;
        setRegError("");

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: name,
                photoURL: imageUrl,
            });

            const userData = {
                uid: user.uid,
                name,
                email,
                phoneNumber: number,
                photoURL: imageUrl,
                role: role === "admin" ? "pending" : "user",
            };

            fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            })
                .then((res) => res.json())
                .then(() => navigate("/"))
                .catch((error) => {
                    console.error("Error posting user data:", error);
                    setRegError("Failed to save user data to the server.");
                });
        } catch (error) {
            setRegError("Failed to register. Please try again!");
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const userData = {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                phoneNumber: user.phoneNumber || "",
                photoURL: user.photoURL,
                role: "user",
            };

            fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            })
                .then((res) => res.json())
                .then(() => navigate("/"))
                .catch((error) => setRegError("Google sign-in failed. Please try again!"));
        } catch {
            setRegError("Google sign-in failed. Please try again!");
        }
    };

    const handleGithubSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            const user = result.user;

            const userData = {
                uid: user.uid,
                name: user.displayName || "GitHub User",
                email: user.email,
                phoneNumber: "",
                photoURL: user.photoURL,
                role: "user",
            };

            fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            })
                .then((res) => res.json())
                .then(() => navigate("/"))
                .catch((error) => setRegError("GitHub sign-in failed. Please try again!"));
        } catch {
            setRegError("GitHub sign-in failed. Please try again!");
        }
    };

    return (
        <div>
            <Sidebar></Sidebar>
            <div className="hero bg-base-200 min-h-screen">
            
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold w-[500px]">Register now!</h1>
                    <p className="py-6">Join us to unlock exclusive features.</p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name="name" type="text" placeholder="Full Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" placeholder="Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" placeholder="Password" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input name="number" type="number" placeholder="Phone Number" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Profile Image URL</span>
                            </label>
                            <input name="image" type="url" placeholder="Image URL" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Role</span>
                            </label>
                            <select className="select select-bordered" onChange={(e) => setRole(e.target.value)}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        {regError && <p className="text-red-500 text-sm mb-2">{regError}</p>}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                            <button
                                type="button"
                                className="btn btn-primary mt-2 flex items-center justify-center"
                                onClick={handleGoogleSignIn}
                            >
                                <img className="mr-2" src="https://i.ibb.co/W5ZPQrC/google.png" alt="Google" /> Google
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary mt-2 flex items-center justify-center"
                                onClick={handleGithubSignIn}
                            >
                                <img className="mr-2 bg-white rounded-2xl" src="https://i.ibb.co/Dbnh7YZ/icons8-github-32.png" alt="Github" /> Github
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
        
    );
};

export default Register;
