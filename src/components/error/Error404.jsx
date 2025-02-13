import React from "react";
import DashboardFooter from "../dashboard/DashboardFooter";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Error404 = () => {
    return (
        <>
            <div className="h-dvh bg-[#010409]">
                <div className=" bg-[#0d1117]  h-3/4 text-center flex flex-col justify-center items-center space-y-6">
                    <DotLottieReact
                        src="/404.lottie"
                        loop
                        autoplay
                        style={{
                            width: window.innerWidth >= 500 ? "500px" : "370px",
                            height: "auto",
                        }}
                    />

                    <p className="text-xl md:text-2xl font-semibold text-gray-600">
                        We tried fetching this page, but the server responded with {"¯\\_(ツ)_/¯"}.
                    </p>
                    <p className="text-lg text-gray-500">
                        It&apos;s not a bug, it&apos;s a feature  {";)"}
                    </p>

                </div>
            </div>

            <div className="w-full bg-[#010409] flex justify-center">
                <DashboardFooter />
            </div>
        </>
    );
}

export default Error404