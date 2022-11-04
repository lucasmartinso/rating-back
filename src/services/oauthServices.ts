import axios from "axios";
import qs from "query-string";

export async function github(code: string) { 
    const GITHUB_ACCESS_TOKEN_URL: string = 'https://github.com/login/oauth/access_token';
    const { REDIRECT_URL, CLIENT_ID, CLIENT_SECRET } = process.env;
    const params: object = {
        code, 
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URL,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
    };

    const { data } = await axios.post(GITHUB_ACCESS_TOKEN_URL, params, {
        headers: {
          'Content-Type': 'application/json'
        }
    });

    const parsedData = qs.parse(data);
    const user = await fetchUser(parsedData.access_token);
    return user;
}

async function fetchUser(token: string | (string | null)[] | null): Promise<any> { 
    const response = await axios.get('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}