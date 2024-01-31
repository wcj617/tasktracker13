import { handler } from './one.js'; // Replace with the actual file name

handler()
    .then(response => console.log(response))
    .catch(error => console.error(error));
