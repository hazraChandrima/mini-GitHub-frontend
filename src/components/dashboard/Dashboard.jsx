import React, { useState, useEffect } from "react";
import LeftPanel from "./LeftPanel";
import MiddlePanel from "./MiddlePanel";
import RightPanel from "./RightPanel";


const Dashboard = () => {

    return (
        <>
            <div className="flex flex-col md:flex-row bg-[#010409] text-white min-h-screen">
                <LeftPanel />
                <div className="flex-1 flex flex-col lg:flex-row">
                    <MiddlePanel />
                    <RightPanel />
                </div>
            </div>
        </>
    );
};

export default Dashboard;