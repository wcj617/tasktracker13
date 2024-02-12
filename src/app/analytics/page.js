"use client"
// Analytics/page.js
import React, { useEffect, useState } from 'react';
import Histogram from '../components/Histogram';

export default function AnalyticsPage() {
    const [chartData, setChartData ] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        // Simulate fetching data
        const fetchData = async () => {
            const response = await fetch('/api/analytics'); // Your API endpoint to fetch data
            const { data } = await response.json();
            setChartData(data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Analytics Dashboard</h1>
            <Histogram chartData={chartData}/>
        </div>
    );
}
