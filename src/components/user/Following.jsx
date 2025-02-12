import React from "react";

const Following = ({ following }) => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Following</h2>
            <ul>
                {following.map((user) => (
                    <li key={user._id} className="py-2 border-b border-gray-700">
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Following;
