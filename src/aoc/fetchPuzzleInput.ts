import axios from 'axios';

export async function fetchPuzzleInput(year: number, day: number, sessionToken: string): Promise<string> {
    const url = `https://adventofcode.com/${year}/day/${day}/input`;
    const headers = {
        Cookie: `session=${sessionToken}`,
    };
    const response = await axios.get(url, { headers });
    return response.data;
}