import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";
import axios from "axios";
import DashboardFooter from "./DashboardFooter";

const MiddlePanel = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [usersWithRepositories, setUsersWithRepositories] = useState([]);
    const [starredRepos, setStarredRepos] = useState({});


    useEffect(() => {

        const fetchLoggedInUserDetails = async() => {
            const userID = localStorage.getItem("userID");
            if (userID) {
                try {
                    const response = await axios.get(`http://127.0.0.1:3000/user/${userID}`);
                    setCurrentUser(response.data.user);
                } catch (err) {
                    console.error("Failed to fetch user details:", err);
                }
            }
        };


        const fetchUsersWithRepositories = async () => {
            try {
                const allUsersResponse = await axios.get("http://127.0.0.1:3000/allUsers");
                const users = allUsersResponse.data.users;

                const userRepositoriesPromises = users.map(async (user) => {
                    try {
                        const userReposResponse = await axios.get(`http://127.0.0.1:3000/repo/user/${user._id}`);
                        return {
                            ...user,
                            repositories: userReposResponse.data.repositories,
                        };
                    } catch (err) {
                        console.warn(`No repositories found for user ${user.username}:`, err.message);
                        return {
                            ...user,
                            repositories: [],
                        };
                    }
                });
                const usersWithRepos = await Promise.all(userRepositoriesPromises);
                const filteredUsers = usersWithRepos.filter((user) => user.repositories.length > 0);
                setUsersWithRepositories(filteredUsers);

            } catch (err) {
                console.error("Failed to fetch users with repositories: ", err);
            }
        };

        fetchLoggedInUserDetails();
        fetchUsersWithRepositories();
    }, []);



    useEffect(() => {
        if (currentUser && currentUser._id) {
            const fetchStarredRepos = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:3000/user/${currentUser._id}`
                    );
                    const fetchedUser = response.data.user;
                    const updatedStarredRepos = fetchedUser.starredRepos.reduce(
                        (acc, repo) => {
                            acc[repo._id] = true;
                            return acc;
                        },
                        {}
                    );
                    setStarredRepos(updatedStarredRepos);
                } catch (err) {
                    console.error("Failed to fetch starred repositories:", err);
                }
            };

            fetchStarredRepos();
        }
    }, [currentUser]);



    const handleStarRepo = async (repo) => {
        if (!starredRepos[repo._id]) {
            try {
                const response = await axios.patch(`http://localhost:3000/user/${currentUser._id}/starRepo`, {
                    repoID: repo._id
                });
                console.log("Successfully updated starred repositories:", response.data);

                setStarredRepos({
                    ...starredRepos,
                    [repo._id]: true,
                });
            } catch (err) {
                console.error("Failed to update starred repositories:", err);
            }
        }
    };


    const handleUnstarRepo = async (repo) => {
        if (starredRepos[repo._id]) {
            try {
                const response = await axios.patch(`http://localhost:3000/user/${currentUser._id}/unstarRepo`, {
                    repoID: repo._id
                });
                console.log("Successfully updated starred repositories:", response.data);

                const updatedStarredRepos = { ...starredRepos };
                delete updatedStarredRepos[repo._id];
                setStarredRepos(updatedStarredRepos);

            } catch (err) {
                console.error("Failed to update starred repositories:", err);
            }
        }
    };




    return (
        <main className="relative flex-1 p-4 sm:p-6">
            <h3 className="text-2xl font-semibold mb-4">Home</h3>
            <div className="mb-40">
                <div>
                    {usersWithRepositories.map((user) => (
                        <div
                            className="my-5 bg-[#0d1117] border border-gray-700 text-white rounded-lg shadow-lg w-full p-4"
                            key={user._id}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gray-600 rounded-full overflow-hidden">
                                        <img
                                            src="/octotron.png"
                                            alt="User Avatar"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div>
                                        <Link to={`/profile/${user._id}`}>
                                            <span className="text-gray-200 font-semibold hover:underline hover:cursor-pointer hover:text-blue-500">
                                                {user.username}
                                            </span>
                                        </Link>
                                        <span className="text-sm text-gray-400">
                                            {" "}
                                            created {user.repositories.length}
                                            {user.repositories.length === 1
                                                ? " repository"
                                                : " repositories"}
                                        </span>
                                        <p className="text-xs mt-1 text-gray-500">3 days ago</p>
                                    </div>
                                </div>
                            </div>

                            {user.repositories.map((repo) => (
                                <div
                                    className="relative h-fit bg-[#151b23] p-4 mt-4 rounded-md flex items-start justify-between"
                                    key={repo._id}
                                >
                                    <div className="flex items-start space-x-3">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-5 h-5 bg-gray-600 rounded-full overflow-hidden">
                                                    <img
                                                        src="/octotron.png"
                                                        alt="User Avatar"
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <p className="text-gray-100 text-sm font-semibold hover:underline hover:cursor-pointer hover:text-blue-500">
                                                    {user.username}/{repo.name}
                                                </p>
                                            </div>
                                            <p className="text-sm text-gray-300 my-4 mb-8">
                                                {repo.description}
                                            </p>
                                            <div className="absolute bottom-4 left-4 flex items-center mt-1">
                                                <div className="w-[12px] h-[12px] bg-blue-500 rounded-full"></div>
                                                <p className="text-xs text-gray-500 ml-[5px]">
                                                    TypeScript
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (starredRepos[repo._id]) {
                                                handleUnstarRepo(repo);
                                            } else {
                                                handleStarRepo(repo);
                                            }
                                        }}
                                        className="flex items-center justify-around space-x-2 bg-[#21262d] px-3 py-[4px] rounded-md border border-gray-600 hover:bg-[#292f38]"
                                    >
                                        {starredRepos[repo._id] ? (
                                            <>
                                                <GoStarFill size={15} fill={"#e3b341"} />
                                                <p className="text-xs font-semibold text-gray-200">
                                                    Starred
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <FaRegStar size={15} fill={"#9198a1"} />
                                                <p className="text-xs font-semibold text-gray-200">
                                                    Star
                                                </p>
                                            </>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <DashboardFooter />
        </main>
    );
};

export default MiddlePanel;