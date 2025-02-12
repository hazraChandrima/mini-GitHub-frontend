import React, { useState, useEffect } from "react";
import HeatMap from "@uiw/react-heat-map";
import Tooltip from '@uiw/react-tooltip';


const generateActivityData = (startDate, endDate) => {
    const data = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
        const count = Math.floor(Math.random() * 5);
        data.push({
            date: currentDate.toISOString().split("T")[0],
            count,
        });

        currentDate.setDate(currentDate.getDate() + 1);
    }
    return data;
};


const getPanelColors = (maxCount) => {
    const colors = {};
    for (let i = 0; i <= maxCount; i++) {
        if (i == 0) {
            colors[i] = 'rgb(22, 27, 34)';
        } else {
            const redShade = Math.floor((i / (maxCount * 2)) * 255);
            const blueShade = Math.floor((i / maxCount) * 255);
            colors[i] = `rgb(${redShade}, 27, ${blueShade})`;
        }
    }
    return colors;
};



const HeatMapProfile = () => {
    const [activityData, setActivityData] = useState([]);
    const [colors, setColors] = useState({});
    const [totalContributions, setTotalContributions] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const startDate = "2024-01-01";
            const endDate = "2024-12-31";
            const data = generateActivityData(startDate, endDate);
            setActivityData(data);
            const maxCount = Math.max(...data.map((d) => d.count));
            const colorPanel = getPanelColors(maxCount);
            setColors(colorPanel);
            const total = data.reduce((t, d) => t + d.count, 0);
            setTotalContributions(total);
        };

        fetchData();
    }, []);



    return (
        <div className="overflow-x-auto">
            <h2 className="text-xl font-semibold my-4">{totalContributions} contributions in the last year</h2>
            <div className="h-fit w-fit rounded-md border border-gray-700 p-5  bg-[#0d1117]">
                <HeatMap
                    style={{ color: "white" }}
                    width={900}
                    value={activityData}
                    startDate={new Date("2024-01-01")}
                    weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
                    monthLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                    rectSize={11}
                    space={2}
                    rectProps={{
                        rx: 2.5,
                    }}
                    rectRender={(props, data) => {
                        const count = data?.count || 0;
                        return (
                            <Tooltip placement="top" content={`${count} contributions`} delay={0}>
                                <rect {...props} />
                            </Tooltip>
                        );
                    }}
                    panelColors={colors}
                />
                <p className="text-gray-400 text-xs ml-4">
                    Learn how we count contributions
                </p>
            </div>
           
        </div>
    );
};

export default HeatMapProfile;