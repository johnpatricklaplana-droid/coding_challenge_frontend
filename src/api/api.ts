import { jwtTokenKey } from "@/constants/storageKeys";
import { GlobalResponse } from "@/interfaces/interface";
import * as SecureStore from 'expo-secure-store';

export async function get(url: string): Promise<GlobalResponse> {
    
    const result = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SecureStore.getItem(jwtTokenKey)}`
        }
    });

    if(!result.ok) {
        throw new Error("error happens");
    }

    const response: GlobalResponse = await result.json();

    return response;

}

export async function post(url: string, body: any): Promise<GlobalResponse> {

    const result = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SecureStore.getItem(jwtTokenKey)}`
        }
    });

    if (!result.ok) {
        throw new Error("error happens");
    }

    const response: GlobalResponse = await result.json();

    return response;

}