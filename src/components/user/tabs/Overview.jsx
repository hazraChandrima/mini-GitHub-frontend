import React from "react";
import HeatMapProfile from "../HeatMapProfile";

const Overview = ({ repositories }) => {
    return (
        <div>
            <div className="mt-8">
                <h2 className="text-xl font-semibold">Popular repositories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">

                    {repositories.map((repo, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700"
                        >
                            <h3 className="text-lg font-semibold">{repo.name}</h3>
                            <p className="mt-2 text-gray-400 text-sm">{repo.description}</p>
                            <span className="mt-4 inline-block text-yellow-400 text-xs font-medium">
                                Typescript
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contributions Heat Map */}
            <div className="mt-12">
                <div className="mt-4 p-4">
                    <HeatMapProfile />
                </div>
            </div>
        </div>
    );

}

export default Overview;