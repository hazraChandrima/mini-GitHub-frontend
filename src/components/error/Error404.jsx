import React from "react";
import DashboardFooter from "../dashboard/DashboardFooter";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Error404 = () => {
    return (
        <>
            <div className="relative h-dvh bg-[#010409]">
                <div className=" bg-[#0d1117] h-full text-center">
                    <div className="px-6 pt-24 flex flex-col justify-center items-center space-y-6">
                        <DotLottieReact
                            src="https://lottie.host/19c8d885-e13f-4065-9c96-cfc295c24438/vcM4A5p3EI.lottie"
                            loop
                            autoplay
                            style={{ width: "400px", height: "200px" }}
                        />

                        <p className="text-xl md:text-2xl font-semibold text-gray-600">
                            We tried fetching this page, but the server responded with {"¯\\_(ツ)_/¯"}.
                        </p>
                        <p className="text-lg text-gray-500">
                            It&apos;s not a bug, it&apos;s a feature  {";)"}
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

export default Error404