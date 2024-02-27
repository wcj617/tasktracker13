import Histogram from '../components/Histogram';
import DataList from './DataList';
import useSWR from "swr"
import { headers } from 'next/headers'
// const fetcher = url => fetch(url).then(r => r.json());
export default async function AnalyticsPage() {
    // const {data, error} = useSWR('api/loadData', fetcher);
    const data = await getData();

    return (
        <div>
            <h1>Anayltics DashBboard</h1>
            <DataList item={data}/>
        </div>
    );
}

 async function getData() {
    const host = headers().get("host");
    const res = await fetch(`http://${host}/api/loadData`);

    if (!res.ok) {
        throw new Error('Error to fetch data')
    }
    return res.json()
}