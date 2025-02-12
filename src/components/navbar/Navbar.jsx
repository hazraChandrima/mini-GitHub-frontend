import React, { useEffect, useState } from "react";
import GitHubLogo from "../../../public/GitHubLogo";
import { LuMenu, LuUserRound, LuSettings } from "react-icons/lu";
import { CgSearch } from "react-icons/cg";
import { TbBrandGithubCopilot, TbGitPullRequest } from "react-icons/tb";
import { FaCaretDown, FaRegStar } from "react-icons/fa";
import { GoInbox, GoHome, GoSignOut } from "react-icons/go";
import { IoAdd, IoClose } from "react-icons/io5";
import { VscIssues, VscRepo } from "react-icons/vsc";
import axios from "axios";


const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);
    const [isRightMenuOpen, setIsRightMenuOpen] = useState(false);
    const [searching, setSearching] = useState(false);
    const [noResultsMessage, setNoResultsMessage] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const [username, setUsername] = useState("");
    const [repositories, setUserRepositories] = useState([]);
    const [allRepositories, setAllRepositories] = useState([]);


    const toggleLeftMenu = () => setIsLeftMenuOpen(!isLeftMenuOpen);
    const toggleRightMenu = () => setIsRightMenuOpen(!isRightMenuOpen);

    const iconStyle = {
        color: "#949ca6",
        fontSize: "1.5em",
        cursor: "pointer",
    };


    useEffect(() => {
        const userID = localStorage.getItem("userID");

        const fetchLoggedInUserDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/user/${userID}`);
                setCurrentUser(response.data.user);
                setUsername(response.data.user.username);
            } catch (err) {
                console.error("Failed to fetch user details :", err);
            }
        };

        const fetchLoggedInUserRepositories = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/repo/user/${userID}`);
                setUserRepositories(response.data.repositories);
            } catch (err) {
                console.error("Failed to fetch repositories : ", err);
            }
        };

        const fetchAllRepositories = async () => {
            try {
                const response = await axios.get("http://localhost:3000/repo/all");
                setAllRepositories(response.data.repositories)
            } catch (err) {
                console.err("Failed to fetch repositories : ", err);
            }
        };

        fetchLoggedInUserDetails();
        fetchLoggedInUserRepositories();
        fetchAllRepositories();
    }, [username]);



    useEffect(() => {
        const handleKeyDown = (e) => {
            const activeElement = document.activeElement;
            if (activeElement.tagName === "INPUT" ||
                activeElement.tagName === "TEXTAREA" ||
                activeElement.isContentEditable) {
                return;
            }
            if (e.key === "/" && !searching) {
                e.preventDefault();
                setSearching(true);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);



    useEffect(() => {
        if (searchQuery === "") {
            setSearchResults(allRepositories);
            setNoResultsMessage("");
        } else {
            const filteredRepositories = allRepositories.filter((repo) =>
                repo.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            if(filteredRepositories.length == 0) {
                setSearchResults([]);
                setNoResultsMessage(`No repositories found for "${searchQuery}".`);
            } else {
                setSearchResults(filteredRepositories);
                setNoResultsMessage("");
            }
        }
    }, [searchQuery, allRepositories]);


    const menuItems = {
        left: [
            { icon: <GoHome size={18} fill="#9198a1" />, label: "Home" },
            { icon: <VscIssues size={18} fill="#9198a1" />, label: "Issues" },
            { icon: <TbGitPullRequest size={18} style={iconStyle} />, label: "Pull requests" },
            { icon: <TbBrandGithubCopilot size={18} style={iconStyle} />, label: "Copilot" },
            { icon: <VscRepo size={18} style={iconStyle} />, label: "Your Repositories" },
        ],
        right: [
            { icon: <LuUserRound size={18} style={iconStyle} />, label: "Your profile" },
            { icon: <VscRepo size={18} fill="#9198a1" />, label: "Your repositories" },
            { icon: <FaRegStar size={18} style={iconStyle} />, label: "Your stars" },
            { icon: <LuSettings size={18} style={iconStyle} />, label: "Settings" },
            { icon: <GoSignOut size={18} style={iconStyle} />, label: "Sign out" },
        ],
    };




    return (
        <>
            <nav
                className={`bg-[#010409] h-16 ${!window.location.pathname.includes("/settings") &&
                        (window.location.pathname.match(/^\/[^/]+$/) || window.location.pathname.match(/^\/[^/]+\/[^/]+$/))
                        ? ""
                        : "border-b-[1px] border-gray-700"
                    } text-white flex items-center justify-between px-4 shadow-md`}
            >
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleLeftMenu}
                        className="p-[5px] rounded-md border border-gray-700 hover:bg-[#0d1117]"
                    >
                        <LuMenu size={19} style={iconStyle} />
                    </button>
                    <GitHubLogo dimension={30} fill={"#f0f6fc"} />
                    <span className="hidden min-[420px]:block text-sm text-gray-200 font-semibold">Dashboard</span>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="hidden lg:block">
                        <div className="relative">
                            <CgSearch className="absolute top-2.5 left-2 text-gray-500" size={18} />
                            <input
                                type="text"
                                value={searchQuery}
                                onFocus={() => setSearching(true)}
                                placeholder="Type '/' to search"
                                className="w-full bg-transparent text-sm text-gray-400 placeholder-gray-400 px-10 py-2 h-8 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-700"
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => setSearching(true)}
                        className="lg:hidden pb-[6px] pt-[8px] pr-[8px] pl-[6px] rounded-md border border-gray-700 hover:bg-[#0d1117]"
                    >
                        <CgSearch style={iconStyle} size={16} />
                    </button>

                    <button className="flex items-center justify-evenly rounded-md border border-gray-700 hover:bg-[#0d1117] h-8">
                        <TbBrandGithubCopilot size={18} style={iconStyle} className="m-[7px]" />
                        <div className="h-full border-l border-gray-700"></div>
                        <FaCaretDown size={12} style={iconStyle} className="m-[6px]" />
                    </button>

                    <div className="hidden sm:block h-5 border-l border-gray-700"></div>

                    <button className="hidden sm:flex items-center space-x-2 rounded-md border border-gray-700 hover:bg-[#0d1117] h-8 ml-2 px-2">
                        <IoAdd size={18} style={iconStyle} />
                        <FaCaretDown size={12} style={iconStyle} />
                    </button>

                    <button className="hidden sm:block p-[6px] rounded-md border border-gray-700 hover:bg-[#0d1117]">
                        <VscIssues size={18} style={iconStyle} />
                    </button>

                    <button className="hidden sm:block p-[6px] rounded-md border border-gray-700 hover:bg-[#0d1117]">
                        <TbGitPullRequest size={18} style={iconStyle} />
                    </button>

                    <button className="p-[6px] rounded-md border border-gray-700 hover:bg-[#0d1117]">
                        <GoInbox size={18} style={iconStyle} />
                    </button>

                    <div
                        onClick={toggleRightMenu}
                        className="w-8 h-8 bg-gray-600 rounded-full overflow-hidden"
                    >
                        <img
                            src="/codercat.png"
                            alt="User Avatar"
                            className="h-full object-cover"
                        />
                    </div>
                </div>
            </nav>


            {/* search box  */}
            {searching && (
                <div className="bg-[#0d1117] fixed top-0 z-50 w-full md:w-[600px] left-1/2 transform -translate-x-1/2 rounded-xl shadow-2xl shadow-black border-[1.5px] border-gray-600">
                    <div className="relative m-4">
                        <CgSearch className="absolute top-2.5 left-3 text-gray-500" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            autoFocus={true}
                            onFocus={() => setSearching(true)}
                            onBlur={() => setSearching(false)}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#0d1117] text-sm text-gray-200 placeholder-gray-500 px-10 py-2 h-9 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <h3 className="font-semibold text-xs text-gray-500 mt-5 mx-4">Repositories</h3>
                    <ul className="mt-1 p-2">
                        {searchResults.map((repo) => (
                            <li key={repo._id} className="flex py-2 px-2 hover:bg-[#161b22] rounded-md">
                                <a
                                    href={`/repo/name/${repo.name}`}
                                    target="blank"
                                    className="text-sm text-gray-200 flex items-center w-full"
                                >
                                    <VscRepo size={16} style={iconStyle} className="mr-2" />
                                    {repo.owner.username}
                                    <span className="text-sm text-gray-500 mx-1">/</span>
                                    {repo.name}
                                </a>
                            </li>
                        ))}
                        <p className="text-sm text-gray-400 py-2 px-2">{noResultsMessage}</p>
                    </ul>

                    <div className="p-3 text-xs text-gray-500 border-t border-gray-700">
                        Search syntax tips
                    </div>
                </div>
            )}


            {/* translucent background  */}
            {(isLeftMenuOpen || isRightMenuOpen || searching) && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-[#151b23] bg-opacity-60 brightness-30 z-40"
                    onClick={isLeftMenuOpen ? toggleLeftMenu : isRightMenuOpen ? toggleRightMenu : undefined}
                ></div>
            )}



            {/* left sliding menu  */}
            <div
                className={`fixed top-0 left-0 h-full w-80 rounded-r-2xl bg-[#151b23] transform ${isLeftMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50 shadow-xl border-r shadow-2xl shadow-black border-gray-700 p-4`}
            >
                <div className="flex justify-between items-center mb-4">
                    <GitHubLogo dimension={31} fill={"#f0f6fc"} />
                    <div
                        onClick={toggleLeftMenu}
                        className="flex justify-end p-2 rounded-md hover:bg-gray-800"
                    >
                        <IoClose size={17} style={iconStyle} />
                    </div>
                </div>

                <ul className="text-sm">
                    {menuItems.left.map((item, index) => (
                        <li
                            key={index}
                            className="text-gray-200 hover:bg-gray-800 p-2 rounded-md flex items-center space-x-2 hover:text-white cursor-pointer"
                        >
                            {item.icon}
                            <h3>{item.label}</h3>
                        </li>
                    ))}
                </ul>

                <hr className="mt-5 mb-3 border-gray-700" />

                <div>
                    <h3 className="font-semibold text-xs text-gray-400 mx-2 mt-4">Repositories</h3>
                    <ul className="mt-2">
                        {repositories.map((repo) => (
                            <li
                                key={repo._id}
                                className="flex items-center space-x-2 hover:bg-gray-800 px-2 py-[6px] rounded-md"
                            >
                                <div className="w-4 h-4 bg-gray-600 rounded-full overflow-hidden">
                                    <img
                                        src="/codercat.png"
                                        alt="Repository Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <a
                                    href={`/${username}/${repo.name}`}
                                    target="blank"
                                    className="text-sm text-gray-200"
                                >
                                    {username}<span className="text-sm text-gray-500">/</span>{repo.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>



            {/* right sliding menu  */}
            <div
                className={`fixed top-0 right-0 h-full w-72 rounded-l-2xl bg-[#151b23] transform ${isRightMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 shadow-xl border-l shadow-2xl shadow-black border-gray-700 p-4`}
            >
                <div className="flex items-center justify-between mb-2">
                    <div className="flex space-x-1 items-center">
                        <div className="w-8 h-8 mr-2 rounded-full overflow-hidden border border-gray-600">
                            <img
                                src="/codercat.png"
                                alt="User Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="text-md font-semibold text-gray-200">{username}</h2>
                    </div>
                    <div
                        onClick={toggleRightMenu}
                        className="flex justify-end p-2 rounded-md hover:bg-gray-800"
                    >
                        <IoClose
                            size={17}
                            style={iconStyle}
                        />
                    </div>
                </div>

                <hr className="mt-5 mb-3 border-gray-700" />

                <ul className="text-sm">
                    {menuItems.right.map((item, index) => (
                        <li
                            key={index}
                            className="text-gray-200 hover:bg-gray-800 p-2 rounded-md flex items-center space-x-2 hover:text-white cursor-pointer"
                        >
                            {item.icon}
                            <h3>{item.label}</h3>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Navbar;