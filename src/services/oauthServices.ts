import qs from "query-string";
import * as oauthRepository from '../repositories/oauthRepository';
import dotenv from "dotenv";

dotenv.config();

export async function github(code: string): Promise<any> { 
    const GITHUB_ACCESS_TOKEN_URL: string = 'https://github.com/login/oauth/access_token';
    const { REDIRECT_URL, CLIENT_ID, CLIENT_SECRET } = process.env;
    const params: object = {
        code: code, 
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URL,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
    };

    const data = await oauthRepository.postGitHubInfo(GITHUB_ACCESS_TOKEN_URL,params);

    const parsedData = qs.parse(data);
    const user = await fetchUser(parsedData.access_token);

    return user;
}

async function fetchUser(token: string | (string | null)[] | null): Promise<any> { 
    const data = await oauthRepository.getGitHubInfo(token);

    return data;
}