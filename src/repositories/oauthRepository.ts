import axios from  'axios';

export async function postGitHubInfo(gitUrl: string, params: object): Promise<any> { 
    const { data } = await axios.post(gitUrl, params, {
        headers: {
          'Content-Type': 'application/json'
        }
    })

    return data;
}

export async function getGitHubInfo(token: string | (string | null)[] | null): Promise<any> { 
    const { data } = await axios.get('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return data;
}