import React from "react";

const Followers = ({ followers }) => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Followers</h2>
            <ul>
                {followers.map((user, index) => (
                    <li key={index} className="py-2 border-b border-gray-700">
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Followers;
