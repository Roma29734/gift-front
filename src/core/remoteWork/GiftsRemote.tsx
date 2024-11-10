import axios from "axios";
import {BASE_URL, initDataRaw} from "./RemoteGlobal.tsx";
import {Price} from "./StoreRemote.tsx";

export interface GiftArea {
    id: string;
    img: string;
    name: string;
    description: string;
    price: Price;
    bgColor: string;
    from: string;
    to: string;
    date: Date;
}




export const getGiftsForUser = async (userId: string = "2") => {
    try {
        const response = await axios.post<GiftArea>(`${BASE_URL}gift/getGiftsForUser`, {
            userId: userId
        },{headers: {Authorization: `tma ${initDataRaw}`}})
        console.log("response", response)
        return response.data
    }  catch (e) {
        console.log("Error", e)
        return `error createUsers ${e}`
    }
}