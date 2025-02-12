import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const userID = localStorage.getItem("userID");
        if(userID) {
            setCurrentUser(userID);
        }
    },[]);

    const user = { currentUser, setCurrentUser };

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );
}