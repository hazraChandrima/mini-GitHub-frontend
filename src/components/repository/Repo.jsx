import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Error404 from "../error/Error404";
import axios from "axios";

const Repo = () => {
    const [isNotFound, setIsNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [repoDetails, setRepoDetails] = useState(null);
    const { username, repoName } = useParams();

    useEffect(() => {
        const fetchRepositoryDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3000/${username}/${repoName}`);
                setRepoDetails(response.data.repository);
                setLoading(false);
            } catch (err) {
                setIsNotFound(true);
                setLoading(false);
                console.error("Failed to fetch repository details:", err);
            }
        };

        fetchRepositoryDetails();
    }, [username, repoName]);

    if (isNotFound) {
        return <Error404 />;
    }

    if (loading) {
        return (
            <div className="h-full flex justify-center items-center text-xl text-gray-500">
                Loading...
            </div>
        );
    }

    return (
        <>
            {repoDetails ? (
                <div className="h-screen  p-4 bg-[#0d1117]">
                    {/* Repository Details */}
                    <h1 className="text-2xl font-bold text-gray-100">
                        {repoDetails.name}
                    </h1>
                    <p className="text-gray-300 mt-2">
                        {repoDetails.description || "No description provided."}
                    </p>

                    {/* Repository Visibility */}
                    <div className="mt-4">
                        <span className="text-sm font-medium">
                            Visibility:
                        </span>{" "}
                        <span
                            className={`${repoDetails.visibility
                                    ? "text-green-500"
                                    : "text-red-500"
                                } font-semibold`}
                        >
                            {repoDetails.visibility ? "Public" : "Private"}
                        </span>
                    </div>

                    {/* Issues Section */}
                    {repoDetails.issues && repoDetails.issues.length > 0 ? (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-200">
                                Issues
                            </h2>
                            <ul className="list-disc list-inside mt-2 text-gray-400">
                                {repoDetails.issues.map((issue) => (
                                    <li key={issue._id}>
                                        <strong>{issue.title}</strong>:{" "}
                                        {issue.description || "No details."}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="mt-6 text-gray-400">
                            No issues found for this repository.
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-gray-400">
                    Failed to load repository details.
                </div>
            )}
        </>
    );
};

export default Repo;
