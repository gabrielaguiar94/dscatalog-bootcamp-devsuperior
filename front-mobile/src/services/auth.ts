import { api, TOKEN } from "./index";
import queryString from 'query-string';
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthProps {
    username: string,
    password: string
}

export async function login(userinfo: AuthProps) {
    const data = queryString.stringify({ ...userinfo, grant_type: "password" });

    const result = await api.post('oauth/token', data, {
        headers: {
            Authorization: TOKEN,
            "Content-type": "application/x-www-form-urlencoded",
        },


    });

    const { access_token } = result.data;
    setAsynceKey("@token", access_token)


    return result;
}

async function setAsynceKey(key: string, value: string) {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (error) {
        console.warn(error);
    }
}

export async function isAuthenticated() {
    try {
        const token = await AsyncStorage.getItem("@token");

        return token ? true : false;
    } catch (error) {
        console.warn(error);
    }
}

export async function doLogout() {
    try {
        AsyncStorage.removeItem("@token");
    } catch (error) {
        console.warn(error);
    }
}