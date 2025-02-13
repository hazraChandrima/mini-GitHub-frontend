import React from "react";
import DashboardFooter from "../dashboard/DashboardFooter";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const Loading = () => {
    return (
        <>
            <div className= "h-dvh bg-[#010409]">
                <div className="bg-[#0d1117] h-3/4 mx-auto flex justify-center">
                    <DotLottieReact
                        src="/loading.lottie"
                        loop
                        autoplay
                        style={{
                            width: `${window.innerWidth * 0.9}px`,
                            height: "auto",
                        }}
                    />
                </div>  
            </div>
            <div className="w-full bg-[#010409] flex justify-center">
                <DashboardFooter />
            </div>
        </>
    );
}

export default Loading;