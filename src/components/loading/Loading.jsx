import React from "react";
import DashboardFooter from "../dashboard/DashboardFooter";

const Loading = () => {
    return (
        <>
            <div className="relative h-dvh bg-[#010409]">
                <div className=" bg-[#0d1117] h-full text-center">
                    <div className="px-6 pt-24 flex flex-col justify-center items-center space-y-6">
                        <p className="text-xl md:text-2xl font-semibold text-gray-600">
                            Loading...
                        </p>
                    </div>
                    <div className="bg-[#010409] mt-32 h-48">

                    </div>
                </div>
                <div className="absolute bottom-16 w-full bg-[#010409] flex justify-center h-24">
                    <DashboardFooter />
                </div>
            </div>
        </>
    );
}

export default Loading;