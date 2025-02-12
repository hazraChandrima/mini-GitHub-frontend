import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateRepo = () => {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [visibility, setVisibility] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const currentUserID = localStorage.getItem("userID");

    const validateRepoName = (value) => {
        const nameRegex = /^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/;
        const isValidRepoName = nameRegex.test(value);

        if (!isValidRepoName) {
            setNameError("Invalid username!");
        } else {
            setNameError("");
        }
    };


    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/user/${currentUserID}`);
                    setUsername(response.data.user.username || "Unknown User");
            } catch (err) {
                console.error("Failed to fetch user details");
            }
        };

        fetchUserDetails();
    }, [currentUserID]);


    const handleCreateRepo = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setError("Repository name is required.");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post(`http://localhost:3000/repo/create`, {
                name: name.trim(),
                description: description.trim(),
                content: [],
                visibility,
                owner: currentUserID,
                issues: [],
            });
            setLoading(false);
            navigate(`/${username}/${name}`);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to create the repository.");
            setLoading(false);
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center py-10">
            <form
                onSubmit={handleCreateRepo}
                className="w-full max-w-3xl p-6 bg-gray-800 rounded-lg shadow-lg"
                aria-label="Create Repository Form"
            >
                <h1 className="text-2xl font-bold mb-6">Create a New Repository</h1>
                {error && (
                    <p className="text-red-500 mb-4" role="alert">
                        {error}
                    </p>
                )}

                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">Owner</label>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-gray-700 rounded px-3 py-2">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="Owner Avatar"
                                className="w-6 h-6 rounded-full object-cover"
                            />
                            <span>{username}</span>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="name"
                        className="block text-sm font-semibold mb-2"
                    >
                        Repository Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            validateRepoName(e.target.value);
                        }}
                        placeholder="Enter repository name"
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {nameError && (<p className="text-xs text-red-500 mt-1">{nameError}</p>)}
                    <p className="text-xs text-gray-400 mt-1">
                        Repository name may only contain alphanumeric characters or single
                        hyphens, and cannot begin or end with a hyphen.
                    </p>
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="description"
                        className="block text-sm font-semibold mb-2"
                    >
                        Description <span className="text-gray-400">(optional)</span>
                    </label>
                    <textarea
                        id="description"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter a description for your repository"
                    />
                </div>

                <div className="mb-6">
                    <p className="text-sm font-semibold mb-2">Visibility</p>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="visibility"
                                value="true"
                                checked={visibility === true}
                                onChange={() => setVisibility(true)}
                                className="text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500"
                            />
                            <span>Public</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="visibility"
                                value="false"
                                checked={visibility === false}
                                onChange={() => setVisibility(false)}
                                className="text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500"
                            />
                            <span>Private</span>
                        </label>
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        type="submit"
                        disabled={loading || nameError || !name}
                        aria-busy={loading}
                        className={`w-full ${loading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
                            } text-white font-semibold py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                        {loading ? "Creating..." : "Create Repository"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateRepo;