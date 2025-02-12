import React from "react";

const Repositories = ({repositories}) => {
    return (
        <div>
            <h2 className="text-xl font-semibold">Popular Repositories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {repositories.map((repo, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700"
                    >
                        <h3 className="text-lg font-semibold">{repo.name}</h3>
                        <p className="mt-2 text-gray-400 text-sm">{repo.description}</p>
                        <span className="mt-4 inline-block text-yellow-400 text-xs font-medium">
                            JavaScript
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Repositories;