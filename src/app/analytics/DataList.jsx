export default async function DataList({ item }){
    // const { item } = data;
    const { TaskName, UserId, EndTime, StartTime } = item.item.Item;

    return (
        <>
            <h1>Testing</h1>
            <div>Task Name: {TaskName}</div>
            <div>User ID: {UserId}</div>
            <div>Start Time: {StartTime} </div>
            <div>End Time: {EndTime} </div>
            <h1>Testing</h1>
        </>
    )
}