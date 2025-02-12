import React from "react";
import GitHubLogo from "../../../public/GitHubLogo";


const DashboardFooter = () => {
    
    return (
        <footer className="absolute bottom-4 w-[93%] text-gray-400 text-xs p-4 mt-auto">
            <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                    <GitHubLogo dimension={22} fill={"#9198a1"} />
                    <p>&copy; 2025 mini GitHub, Inc.</p>
                </div>
                <div className="flex w-1/2 flex-wrap justify-end items-center space-x-3 text-xs">
                    <a href="#" className="hover:underline">Terms</a>
                    <a href="#" className="hover:underline">Privacy</a>
                    <a href="#" className="hover:underline">Security</a>
                    <a href="#" className="hover:underline">Docs</a>
                    <a href="#" className="hover:underline">Support</a>
                    
                </div>
            </div>
        </footer>
    );
}

export default DashboardFooter;