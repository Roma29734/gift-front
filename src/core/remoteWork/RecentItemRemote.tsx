import axios from "axios";
import {BASE_URL, initDataRaw} from "./RemoteGlobal.tsx";
import {Price} from "./StoreRemote.tsx";


export interface RecentAction {
    name: string;
    type: RecentActionType;
    img: string;
    date: string;
}


export type RecentActionType = BuyGiftType | SentGiftType | ReceiveGiftType

export interface BuyGiftType{
    type: 'BuyGift';
    name: 'Buy'
    price: Price;
}

export interface SentGiftType {
    type: 'SentGift'
    name: 'Sent'
    toId: string;
    toName: string;
}

export interface ReceiveGiftType {
    type: 'ReceiveGift'
    name: 'Receive'
    fromId: string;
    fromName: string;
}

export const isReceiveGiftType = (recentActionType: RecentActionType): recentActionType is ReceiveGiftType => {
    return recentActionType.type === "ReceiveGift"
}

export const isSentGiftType = (recentActionType: RecentActionType): recentActionType is SentGiftType => {
    return recentActionType.type === "SentGift"
}

export const isBuyGiftType = (recentActionType: RecentActionType): recentActionType is BuyGiftType => {
    return recentActionType.type === "BuyGift"
}

export const getRecentActions = async () => {
    try {

        const response = await axios.post<RecentAction[]>(`${BASE_URL}recent/actions`,{
          userId: '2',
        }, {headers: {Authorization: `tma ${initDataRaw}`}})
        console.log("response", response)
        return response.data
    }  catch (e) {
        console.log("Error", e)
        return `error getUserById ${e}`
    }
}

