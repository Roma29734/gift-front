import axios from "axios";
import {BASE_URL, initDataRaw} from "./RemoteGlobal.tsx";

export interface getLeaderboardResponse {
    userId: string;
    userName: string;
    gifts: number;
    imageAvatar?: string | null;
}

export const getLeaderboard = async () => {
    try {
        const response = await axios.get<getLeaderboardResponse[]>(`${BASE_URL}users/getLeaderboard`,
            {headers: {Authorization: `tma ${initDataRaw}`}})
        console.log("response", response)
        return response.data
    }  catch (e) {
        console.log("Error", e)
        return `error createUsers ${e}`
    }
}