import React from "react";
import { GoCopilot } from "react-icons/go";


const RightPanel = () => {

    return (
        <aside className="w-full hidden lg:block md:w-[35%] bg-transparent py-6 pr-6 mt-4 md:mt-0">

            {/* copilot card  */}
            <div className=" bg-gradient-to-r from-blue-700 to-violet-700 border border-gray-700 text-white p-4 rounded-md shadow-md mb-6">
                <div className="flex items-center space-x-3 text-xl font-bold mb-3">
                    <GoCopilot size={27}/>
                    <h3>GitHub Copilot</h3> 
                </div>
                <p className="text-sm font-semibold my-2">
                    Extensions are here!
                </p>
                <p className="text-xs my-2">
                    Extend GitHub Copilot with ready-to-use extensions or build your own using our developer platform.
                </p>
                <button className="bg-white w-full h-8 text-indigo-600 text-sm font-semibold text-black mt-4 rounded-md">
                    Learn more
                </button>
            </div>


            {/* GitHub Education card  */}
            <div className="bg-[#0d1117] border border-gray-700 p-4 rounded-md shadow-md mb-6">
                <h4 className="text-md font-semibold mb-2 text-gray-200">Learn. Collaborate. Grow.</h4>
                <p className="text-xs mt-4 mb-3 text-gray-300">
                    GitHub Education gives you the tools and community support to take on tech challenges and turn them into
                    opportunities. Your future in tech starts here!
                </p>
                <button className="text-sm text-gray-200 px-4 border border-gray-700 text-xs font-semibold rounded-md h-8 bg-[#21262d] hover:underline mt-4">Go to GitHub Education</button>
            </div>


            {/* Latest changes card  */}
            <div className="bg-[#0d1117] p-4 rounded-md shadow-md w-full border border-gray-700">
                <h3 className="text-md font-semibold text-gray-200 mb-4">Latest changes</h3>
                <ul className="space-y-4 border-l border-gray-700 pl-4">
                    <li className="relative">
                        <p className="text-xs text-gray-400">2 days ago</p>
                        <h4 className="text-sm text-white">Actions: Xcode 16.2 will replace Xcode 16.0 in macOS-14 Images</h4>
                    </li>
                    <li className="relative">
                        <p className="text-xs text-gray-400">5 days ago</p>
                        <h4 className="text-sm text-white">Expanding Access to the GitHub Copilot Workspace Technical Preview</h4>
                    </li>
                    <li className="relative">
                        <p className="text-xs text-gray-400">2 weeks ago</p>
                        <h4 className="text-sm text-white">Copilot Workspace Changelog (December 20th, 2024)</h4>
                    </li>
                    <li className="relative">
                        <p className="text-xs text-gray-400">2 weeks ago</p>
                        <h4 className="text-sm text-white">REST API insights for organizations is now generally available</h4>
                    </li>
                </ul>
                <a
                    href="#"
                    className="text-gray-500 hover:underline text-xs mt-4 block"
                >
                    View changelog →
                </a>
            </div>

        </aside>
    );
}

export default RightPanel;