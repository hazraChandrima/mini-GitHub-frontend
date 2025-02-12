import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

// pages
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp"
import Profile from "./components/user/Profile";
import Settings from "./components/user/Settings";
import Repo from "./components/repository/Repo";
import CreateRepo from "./components/repository/CreateRepo";
import Error404 from "./components/error/Error404";

import { useAuth } from "./authContext";

const Routes = () => {
    
    const { currentUser, setCurrentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem("userID");

        if(userIdFromStorage && !currentUser) {
            setCurrentUser(userIdFromStorage);
        }
        if(!userIdFromStorage && !["/login", "/signup"].includes(window.location.pathname)) {
            navigate("/login");
        }
        if(userIdFromStorage && window.location.pathname == "/login") {
            navigate("/");
        }
    }, [currentUser, navigate, setCurrentUser]);   


    const elements = useRoutes([
        {
            path: "/",
            element: <Dashboard/>
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/signup",
            element: <SignUp/>
        },
        {
            path: "/:username",
            element: <Profile/>
        },
        {
            path: "/settings",
            element: <Settings />
        },
        {
            path: "/repo/create",
            element: <CreateRepo />
        },
        {
            path: "/:username/:repoName",
            element: <Repo />
        },
        {
            path:"*",
            element: <Error404/>
        },
    ]);

    return elements;
}

export default Routes;