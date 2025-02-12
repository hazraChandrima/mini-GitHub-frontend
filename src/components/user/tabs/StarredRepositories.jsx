import React, { useState, useEffect } from "react";
import axios from "axios";

const StarredRepositories = ({ starredRepos }) => {
    const [username, setUsername] = useState({});

    const fetchOwnerUsername = async (ownerId) => {
        try {
            const response = await axios.get(`http://localhost:3000/user/${ownerId}`);
            return response.data.user.username;
        } catch (error) {
            console.error("Error fetching owner username:", error);
            return null;
        }
    };


    useEffect(() => {
        const fetchAllOwners = async () => {
            const updatedUsername = { ...username }; 

            for (const star of starredRepos) {
                if (star.owner && !updatedUsername[star.owner]) {
                    const ownerUsername = await fetchOwnerUsername(star.owner);
                    if (ownerUsername) {
                        updatedUsername[star.owner] = ownerUsername;
                    }
                }
            }

            setUsername(updatedUsername);
        };

        fetchAllOwners();
    }, [starredRepos]);




    return (
        <div>
            <h2 className="text-xl font-semibold">Starred Repositories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {starredRepos.map((star, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700"
                    >
                        <h3 className="text-lg font-semibold">
                            {username[star.owner] || 'Loading...'}/{star.name}
                        </h3>
                        <p className="mt-2 text-gray-400 text-sm">{star.description}</p>
                        <span className="mt-4 inline-block text-yellow-400 text-xs font-medium">
                            JavaScript
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StarredRepositories;
