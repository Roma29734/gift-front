import axios from "axios";
import {BASE_URL, initDataRaw} from "./RemoteGlobal.tsx";
import {CurrencyType} from "./StoreRemote.tsx";



interface sendToBuyGiftResponse {
    url: string;
    invoiceId: string;
}

export interface Payment {
    userId: number;
    giftId: string;
    amount: string;
    currencyType: CurrencyType;
    asset?: string;
    fiat?: string;
    invoiceId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export const sendToBuyGift = async (giftId: string) => {
    try {
        const response = await axios.post<sendToBuyGiftResponse>(`${BASE_URL}payment/create`, {
            giftId: giftId
        }, { headers: { Authorization: `tma ${initDataRaw}` } });

        console.log("response", response);

        if (response.data ) {
            return response.data;
        } else {
            return "Error: No gifts found for user or response data is empty" as string;
        }
    } catch (e) {
        console.error("Error fetching gifts for user:", e);
        return `Error fetching gifts: ${e instanceof Error ? e.message : String(e)}` as string;
    }
};

export const getPayment = async (invoiceId: string) => {
    try {
        const response = await axios.post<Payment>(`${BASE_URL}payment/getPayment`, {
            invoiceId: invoiceId
        }, { headers: { Authorization: `tma ${initDataRaw}` } });

        console.log("response", response);

        if (response.data ) {
            return response.data;
        } else {
            return "Error: No gifts found for user or response data is empty" as string;
        }
    } catch (e) {
        console.error("Error fetching gifts for user:", e);
        return `Error fetching gifts: ${e instanceof Error ? e.message : String(e)}` as string;
    }
};
