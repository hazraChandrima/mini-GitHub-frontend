import React, { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import { RiGitRepositoryLine } from "react-icons/ri";
import axios from "axios";

const LeftPanel = () => {
    const [username, setUsername] = useState("");
    const [repositories, setRepositories] = useState([]);
    const [userSearchQuery, setUserSearchQuery] = useState("");
    const [userSearchResults, setUserSearchResults] = useState([]);
    const [searching, setSearching] = useState(true);


    useEffect(() => {
        const userID = localStorage.getItem("userID");

        const fetchUserDetails = async () => {
            try {
                const { data } = await axios.get(`http://127.0.0.1:3000/user/${userID}`);
                setUsername(data.user.username);
            } catch (err) {
                console.error("Failed to fetch user details:", err);
            }
        };

        const fetchUserRepositories = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/repo/user/${userID}`);
                setRepositories(data.repositories);
            } catch (err) {
                console.error("Failed to fetch repositories:", err);
            }
        };

        fetchUserDetails();
        fetchUserRepositories();
    }, []);



    useEffect(() => {
        if (!userSearchQuery) {
            setUserSearchResults(repositories);
        } else {
            const filteredRepositories = repositories.filter((repo) =>
                repo.name.toLowerCase().includes(userSearchQuery.toLowerCase())
            );
            setUserSearchResults(filteredRepositories);
        }
    }, [userSearchQuery, repositories]);



    const RepositoryList = () => (
        <ul className="mt-4 space-y-3">
            {searching && userSearchResults.length > 0 ? (
                userSearchResults.map((repo) => (
                    <li key={repo._id} className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-600 rounded-full overflow-hidden">
                            <img
                                src="/codercat.png"
                                alt="Repository Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <a
                            href={`/${username}/${repo.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-200 hover:underline"
                        >
                            {username}
                            <span className="text-sm text-gray-500">/</span>
                            {repo.name}
                        </a>
                    </li>
                ))
            ) : (
                searching && <li className="text-sm text-gray-400">No repositories found.</li>
            )}
        </ul>
    );



    const Header = () => (
        <div className="flex items-center space-x-3 my-2">
            <div className="w-5 h-5 mr-2 rounded-full overflow-hidden border border-gray-600">
                <img
                    src="/codercat.png"
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                />
            </div>
            <h2 className="text-md font-semibold text-white">{username}</h2>
            <FaCaretDown size={12} color="#949ca6" />
        </div>
    );


    
    return (
        <>
            {/* For smaller viewports */}
            <div className="md:hidden">
                <div className="bg-[#0d1117] py-5 px-4 border-b border-gray-700">
                    <Header />
                </div>
                <div className="w-full border-r border-gray-700 p-4">
                    <h3 className="font-semibold text-gray-200 py-4">Top repositories</h3>
                    <div className="bg-[#0d1117] py-3 px-2 border border-gray-700 rounded-md">
                        <input
                            type="text"
                            value={userSearchQuery}
                            onFocus={() => setSearching(true)}
                            onChange={(e) => setUserSearchQuery(e.target.value)}
                            placeholder="Find a repository..."
                            className="w-full bg-[#161b22] h-8 text-sm text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <RepositoryList />
                        <hr className="mt-4 border-gray-700" />
                        <button className="text-gray-400 text-xs hover:text-blue-500 mt-4">Show more</button>
                    </div>
                    <div className="mt-6">
                        <h3 className="font-semibold text-gray-200 mb-2">Your teams</h3>
                        <div className="bg-[#0d1117] flex items-center justify-center px-4 py-5 border border-gray-700 rounded-md">
                            <p className="text-sm text-gray-200">You don&apos;t belong to any teams yet!</p>
                        </div>
                    </div>
                </div>
            </div>



            {/* For medium and larger viewports */}
            <aside className="hidden md:block sticky top-0 overflow-y-auto h-screen md:w-1/3 lg:w-1/4 bg-[#0d1117] border-r border-gray-700 p-6">
                <Header />
                <div className="mt-7">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-gray-200">Top repositories</h3>
                        <button className="flex items-center w-16 px-2 bg-[#6542c4] text-xs font-semibold text-white py-1 rounded-md hover:bg-[#7653d6]">
                            <RiGitRepositoryLine size={18} />
                            <p>New</p>
                        </button>
                    </div>
                    <input
                        type="text"
                        value={userSearchQuery}
                        onFocus={() => setSearching(true)}
                        onChange={(e) => setUserSearchQuery(e.target.value)}
                        placeholder="Find a repository..."
                        className="mt-2 w-full bg-[#161b22] h-8 text-sm text-white rounded-md px-3 py-2 border border-gray-600 focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-500"
                    />
                    <RepositoryList />
                    <button className="text-gray-400 text-xs hover:text-blue-500 mt-4">Show more</button>
                </div>
                <div className="mt-10">
                    <h3 className="text-sm font-semibold text-gray-200">Your teams</h3>
                    <p className="mt-2 text-xs text-gray-500">You don&apos;t belong to any teams yet!</p>
                </div>
            </aside>
        </>
    );
};

export default LeftPanel;
