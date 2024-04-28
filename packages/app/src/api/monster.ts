import axios from "axios";
import { IMonster } from "../entities/IMonster";

type ResponseResult =
    | { success: any }
    | { error: any }

type GetResponseResult =
    | { success: { data: IMonster[], totalPages: number } }
    | { error: any }

export const createMonster = async (monster: IMonster): Promise<ResponseResult> => {
    let response;
    try {
        response = await axios.post(`${process.env.REACT_APP_BASE_URL}/monster`, monster);
    } catch (error) {
        response = { error: error }
    }
    return { success: response }
}

export const createMonsterBulk = async (monsters: IMonster[]): Promise<ResponseResult> => {
    let response;
    try {
        response = await axios.post(`${process.env.REACT_APP_BASE_URL}/monster/bulk`, { monsters });
    } catch (error) {
        response = { error: error }
    }
    return { success: response }
}


export const getMonsters = async (page: number, pageSize: number): Promise<GetResponseResult> => {
    let response;
    try {
        response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/monsters?page=${page}&pageSize=${pageSize}`
        );
    } catch (error) {
        response = { error: error }
    }
    return { success: { data: response.data.data, totalPages: response.data.totalPages } }

}

export const deleteMonster = async (id: number): Promise<ResponseResult> => {
    let response;
    try {
        response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/monster/${id}`);
    } catch (error) {
        response = { error: error }
    }
    return { success: response }
}

export const randomMonster = async (): Promise<ResponseResult> => {
    let response;
    try {
        response = await axios.get(`${process.env.REACT_APP_BASE_URL}/monster/random`)
    } catch (error) {
        return { error: error }
    }
    return { success: response.data }
}