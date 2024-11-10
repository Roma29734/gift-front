import {BASE_URL, initDataRaw} from "./RemoteGlobal.tsx";
import axios from "axios";

export interface Price {
    value: number;
    imgCurrency: string;
    nameCurrency: string;
}

export interface Gift {
    id: string;
    img: string;
    name: string;
    description: string;
    price: Price;
    bgColor: string;
}

interface User {
    userId: string;
    userName: string;
    gifts: number;
    createAt?: string;
    dataUpdate?: string;
    imageAvatar?: string | null;
}


export const getGifts = async () => {
    try {
        const response = await axios.get<Gift[]>(`${BASE_URL}gift/getAllGifts`, {headers: {Authorization: `tma ${initDataRaw}`}})

        console.log("response - ", response.data)
        // if (response.data == true) {
            return response.data
        // }
    } catch (e) {
        console.log("checkTonTransfer - ", e)
        return `error ${e}`
    }
}


export const getUserById = async () => {
    try {

        const response = await axios.get<User>(`${BASE_URL}users/get/1`, {headers: {Authorization: `tma ${initDataRaw}`}})
        console.log("response", response)
        return response.data
    }  catch (e) {
        console.log("Error", e)
        return `error getUserById ${e}`
    }
}


export const createUsers = async () => {
    try {

        const response = await axios.post<User>(`${BASE_URL}users/users`, {
            userId: '1',
            userName: "roma"
        },{headers: {Authorization: `tma ${initDataRaw}`}})
        console.log("response", response)
        return response.data
    }  catch (e) {
        console.log("Error", e)
        return `error createUsers ${e}`
    }
}