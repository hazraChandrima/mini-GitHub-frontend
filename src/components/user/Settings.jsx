import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Settings = () => {
    const [password, setPassword] = useState("");
    const [deleteError, setDeleteError] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isEditable, setIsEditable] = useState(false);
    const navigate = useNavigate();


    const validateEmail = (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setEmailError(emailRegex.test(value) ? "" : "Invalid email address!");
    };


    const validatePassword = (value) => {
        const length = value.length >= 8;
        const hasDigit = /\d/.test(value);
        const hasLowerCase = /[a-z]/.test(value);

        if (!length) {
            setPasswordError("Password must be at least 8 characters!");
        } else if (!hasDigit) {
            setPasswordError("Password must include at least one number!");
        } else if (!hasLowerCase) {
            setPasswordError("Password must include at least one lowercase letter!");
        } else {
            setPasswordError("");
        }
    };



    useEffect(() => {
        const userID = localStorage.getItem("userID");
        const fetchUserDetails = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/user/${userID}`);
                setUsername(data.user.username);
                setEmail(data.user.email);
                
            } catch (err) {
                console.error("Failed to fetch user details:", err);
            }
        };

        fetchUserDetails();
    }, []);



    const handleUpdate = async () => {
        if (emailError || passwordError) {
            return;
        }
        const userID = localStorage.getItem("userID");
        try {
            const payload = {
                email,
                oldPassword: oldPassword || undefined,
                newPassword: newPassword || undefined,
            };
            const { data } = await axios.put(`http://localhost:3000/updateUser/${userID}`, payload);
            alert(data.message);

        } catch (err) {
            console.error("Failed to update user details:", err);
            alert("Failed to update user details. Please try again.");
        }
    };



    const handleDeleteAccount = async () => {
        const userID = localStorage.getItem("userID");

        try {
            const payload = { password };
            const { data } = await axios.delete(`http://localhost:3000/deleteUser/${userID}`, {
                data: payload,
            });
            alert(data.message);
            localStorage.clear();
            navigate("/login");

        } catch (err) {
            console.error("Failed to delete user account:", err.response?.data || err.message);
            setDeleteError(err.response?.data?.error || "Failed to delete account. Please try again.");
        }
    };




    return (
        <>
            <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center py-12 px-4">
                <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-8">
                    <h1 className="text-2xl font-semibold mb-6 text-gray-700">Account Settings</h1>


                    <div className="mb-6">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            readOnly
                            className="mt-2 w-full px-3 py-2 bg-gray-100 text-gray-600 border border-gray-300 rounded-md focus:outline-none"
                        />
                        <small className="text-gray-500">Username cannot be changed.</small>
                    </div>


                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            disabled={!isEditable}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                validateEmail(e.target.value);
                            }}
                            className={`mt-2 w-full px-3 py-2 bg-${isEditable ? "white" : "gray-100"} text-gray-600 border ${emailError ? "border-red-500" : "border-gray-300"
                                } rounded-md focus:outline-none`}
                        />
                        {emailError && <small className="text-red-500">{emailError}</small>}
                    </div>

                    {isEditable && (
                        <>
                            <div className="mb-6">
                                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-600">
                                    Old Password
                                </label>
                                <input
                                    id="oldPassword"
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="mt-2 w-full px-3 py-2 bg-white text-gray-600 border border-gray-300 rounded-md focus:outline-none"
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">
                                    New Password
                                </label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        validatePassword(e.target.value);
                                    }}
                                    className={`mt-2 w-full px-3 py-2 bg-white text-gray-600 border ${passwordError ? "border-red-500" : "border-gray-300"
                                        } rounded-md focus:outline-none`}
                                />
                                {passwordError && <small className="text-red-500">{passwordError}</small>}
                            </div>
                        </>
                    )}



                    <div className="flex justify-between items-center mt-8">
                        {!isEditable ? (
                            <button
                                onClick={() => setIsEditable(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Edit Details
                            </button>
                        ) : (
                            <button
                                onClick={handleUpdate}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            >
                                Save Changes
                            </button>
                        )}
                    </div>
                </div>


                <button
                    onClick={() => setShowDeleteModal(true)}
                    className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                    Delete Account
                </button>


                {showDeleteModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h2 className="text-xl font-semibold mb-4 text-gray-700">
                                Confirm Account Deletion
                            </h2>
                            <p className="text-gray-600 mb-4">Enter your password to confirm:</p>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 mb-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none"
                            />
                            {deleteError && <small className="text-red-500">{deleteError}</small>}
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="bg-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Settings;