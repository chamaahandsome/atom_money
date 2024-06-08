"use client";

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);



const DoughnutChart = ( {accounts}: DoughnutChartProps) => {

    const data = {
        datasets: [
            {
                label: "Banks",
                data: [12500, 35000, 341000, 65000],
                backgroundColor: ["#10564F", "#21B6A8", "#30D9C8", "#75E6DA"],
            },
        ],
        labels: ["Bank of America", "Chase", "Wells Fargo", "Citi"],
    };

    return <Doughnut 
    data={data} 
    options={{
        cutout: "60%",
        plugins: {
            legend: {
                display: false,
            },
        },
    }}
    />;
};

export default DoughnutChart;
