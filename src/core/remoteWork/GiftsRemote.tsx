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




export const getGiftsForUser = async (userId: string = "2"): Promise<GiftArea[] | string> => {
    try {
        const response = await axios.post<GiftArea[]>(`${BASE_URL}gift/getGiftsForUser`, {
            userId: userId
        }, { headers: { Authorization: `tma ${initDataRaw}` } });

        console.log("response", response);

        if (response.data && response.data.length > 0) {
            return response.data as GiftArea[];
        } else {
            return "Error: No gifts found for user or response data is empty" as string;
        }
    } catch (e) {
        console.error("Error fetching gifts for user:", e);
        return `Error fetching gifts: ${e instanceof Error ? e.message : String(e)}` as string;
    }
};