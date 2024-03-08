export async function GET(Request, { params }) {
    const user = params.user;
    return new Response(`Welcome to my Next application, user ${user}`);
}