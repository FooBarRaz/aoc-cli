import axios from 'axios';

export async function fetchPuzzleInput(year: number, day: number, sessionToken: string): Promise<string> {
    const url = `https://adventofcode.com/${year}/day/${day}/input`;
    const headers = {
        Cookie: `session=${sessionToken}`,
    };
    const response = await axios.get(url, { headers });
    return response.data;
}

// Example usage:
// const year = 2021;
// const day = 1;
// const sessionToken = 'YOUR_SESSION_TOKEN';
// fetchPuzzleInput(year, day, sessionToken)
//     .then((input) => {
//         console.log(input);
//     })
//     .catch((error) => {
//         console.error('Failed to fetch puzzle input:', error);
//     });
