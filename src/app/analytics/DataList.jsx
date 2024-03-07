'use client'
// import {useMemo} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


import { faker } from '@faker-js/faker';
export default function DataList({ item }){

    const taskData = item.item.Item;
    const duration = (new Date(taskData.EndTime) - new Date(taskData.StartTime)) / 60000;
    // console.log("faker value" + faker.helpers.rangeToNumber({min: 0, max: 1000}));
    // const labels = ['Jan'];
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const chartData = {
        labels,
        datasets : [
            {
                label: 'Dataset 1',
                data: labels.map(()=> duration),
                // data: 120,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => faker.helpers.rangeToNumber({min: 0, max: 1000})),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Task tracker',
            },
        },
        scales: {
            y: {
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, ticks) {
                        const totalMinutes = value;
                        const hours = Math.floor(totalMinutes / 60);
                        const minutes = totalMinutes % 60;
                        return `${hours}h ${minutes}m`
                    }
                }
            }
        }
    };

    return (
        <>
            <Line options={options} data={chartData}  />;
        </>
    )
}