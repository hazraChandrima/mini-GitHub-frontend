import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Overview from "./tabs/Overview";
import Repositories from "./tabs/Repositories";
import StarredRepositories from "./tabs/StarredRepositories";
import Followers from "./Followers";
import Following from "./Following";
import Error404 from "../error/Error404";
import Loading from "../loading/Loading";
import axios from "axios";


const Profile = () => {
    const [activeTab, setActiveTab] = useState("Overview");
    const [repositories, setRepositories] = useState([]);
    const [userID, setUserID] = useState("");
    const [starredRepos, setStarredRepos] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const { username } = useParams();


    useEffect(() => {
        const currentUserID = localStorage.getItem("userID");

        const fetchUserDetails = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`http://localhost:3000/${username}`);
                setStarredRepos(data.user.starredRepos);
                setFollowers(data.user.followers);
                setFollowingUsers(data.user.followedUsers);
                setUserID(data.user._id);
                setIsFollowing(data.user.followers.some((follower) => follower.userID === currentUserID));
                setLoading(false);
            } catch (err) {
                setIsNotFound(true);
                setLoading(false);
                console.error("Failed to fetch user details:", err);
            }
        };

        const fetchRepositories = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/repo/user/${userID}`);
                setRepositories(data.repositories);
            } catch (err) {
                console.error("Failed to fetch repositories:", err);
            }
        };

        setIsLoggedIn(currentUserID === userID);

        fetchUserDetails();
        fetchRepositories();
    }, [userID]);



    const renderContent = () => {
        switch (activeTab) {
            case "Overview":
                return <Overview repositories={repositories} />;
            case "Repositories":
                return <Repositories repositories={repositories} />;
            case "Stars":
                return <StarredRepositories starredRepos={starredRepos} />;
            case "Followers":
                return <Followers followers={followers} />;
            case "Following":
                return <Following following={followingUsers} />;
            default:
                return null;
        }
    };


    const handleFollowToggle = async () => {
        const currentUserID = localStorage.getItem("userID");
        const endpoint = isFollowing ? "unfollow" : "follow";
        const successMessage = isFollowing
            ? "Successfully unfollowed user"
            : "Successfully followed user";

        try {
            const response = await axios.post(`http://localhost:3000/${endpoint}`, {
                userID: currentUserID,
                targetUserID: userID,
            });
            console.log(successMessage, response.data);

            if (isFollowing) {
                setFollowers((prev) => prev.filter((id) => id !== currentUserID));
            } else {
                setFollowers((prev) => [...prev, currentUserID]);
            }

            setIsFollowing(!isFollowing);
        } catch (err) {
            console.error(`Failed to ${isFollowing ? "unfollow" : "follow"} user:`, err);
        }
    };


    if (isNotFound) {
        return <Error404 />;
    }

    if (loading) {
        return <Loading/>;
    }

    return (

        <>
            {/* Tabs */}
            <div className="flex border-b border-gray-700 bg-[#010409]">
                {["Overview", "Repositories", "Stars"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 text-sm font-medium ${activeTab === tab
                            ? "border-b-2 border-yellow-400 text-yellow-400"
                            : "text-gray-400 hover:text-gray-100"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="md:flex min-h-screen bg-[#0d1117] text-gray-100">
                <div className="max-w-6xl mx-auto py-8 px-4">

                    <div className="flex flex-col items-center space-x-6 mb-8">
                        <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
                            {/* insert profile image later */}
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold">{username}</h1>
                            {!isLoggedIn && (
                                <button
                                    onClick={handleFollowToggle}
                                    className="mt-2 px-4 py-1 bg-gray-800 rounded text-sm border border-gray-700 hover:bg-gray-700"
                                >
                                    {isFollowing ? "Unfollow" : "Follow"}
                                </button>
                            )}
                            <p className="mt-2 text-gray-400">
                                <p
                                    className="hover:cursor-pointer"
                                    onClick={() => setActiveTab("Followers")}
                                >
                                    {followers.length} follower{followers.length !== 1 ? "s" : ""}
                                </p>
                                {". "}
                                <p
                                    className="hover:cursor-pointer"
                                    onClick={() => setActiveTab("Following")}
                                >
                                    {followingUsers.length} following
                                </p>

                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-8">{renderContent()}</div>
            </div>

        </>
    );
};

export default Profile;
