// Analytics/page.js
import React, { useEffect, useState } from 'react';
import Histogram from '../components/Histogram';
import AnalyticsLayout from './layout';

function AnalyticsPage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/data'); // Adjust this to your API endpoint
            const result = await response.json();
            setData(result);
        }
        fetchData();
    }, []);

    return (
        <AnalyticsLayout>
            <div>
                <h1>Analytics</h1>
                {data && <Histogram data={data} />}
            </div>
        </AnalyticsLayout>
    );
}

export default AnalyticsPage;
