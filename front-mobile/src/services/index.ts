import axios from "axios";
import { Platform } from "react-native";
import mime from 'mime';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const api = axios.create({
    baseURL: 'https://gabrielaguiar-dscatalog.herokuapp.com',
})

export const TOKEN = ' Basic ZHNjYXRhbG9nOmRzY2F0YWxvZzEyMw==';

export async function userToken() {
    const token = await AsyncStorage.getItem('@token');
    return token;
}

//Backend Requests

export function getProducts() {

    const res = api.get(`/products?direction=DESC&orderBy=id`)

    return res;
}

export async function createProduct(data: object) {
    const authToken = await userToken();
    const res = api.post(`/products`, data, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
    return res;
}

export async function deleteProduct(id: number) {
    const authToken = await userToken();
    const res = api.delete(`/products/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
}

export async function getProduct(id: number) {
    const res = await api.get(`/products/${id}`)
    return res;
}

export async function createCategory(data: object) {
    const authToken = await userToken();
    const res = await api.post(`/categories`, data, {
        headers: {
            Authorization: `Bearer ${authToken}`
        },
    });

    return res;
}

export async function updateProduct(data: object) {
    const authToken = await userToken();
    const res = await api.put(`/products/${data.id}`, data, {
        headers: {
            Authorization: `Bearer ${authToken}`
        },
    });

    return res;
}

export async function deleteCategory(id: number) {
    const authToken = await userToken();
    const res = api.delete(`/categories/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
}

export async function getCategory(id: number) {
    const res = await api.get(`/categories/${id}`)
    return res;
}

export function getCategories() {
    const res = api.get(`/categories?direction=ASC&oderBy=name`);

    return res;
}

export async function updateCategory(data: object) {
    const authToken = await userToken();
    const res = await api.put(`/categories/${data.id}`, data, {
        headers: {
            Authorization: `Bearer ${authToken}`
        },
    });

    return res;
}

export async function updateUser(data: object) {
    const authToken = await userToken();
    const res = await api.put(`/users/${data.id}`, data, {
        headers: {
            Authorization: `Bearer ${authToken}`
        },
    });

    return res;
}

//Users

export async function getUsers() {
    const authToken = await userToken();
    const res = await api.get(`users?page=0&linesPerPage=12&direction=ASC&orderBy=firstName`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        },
    });
    return res;
}

export async function getUser(id: number) {
    const authToken = await userToken();
    const res = await api.get(`/users/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    return res;
}

export async function createUser(data: object) {
    const authToken = await userToken();
    const res = api.post(`/users`, data, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
    return res;
}

export async function deleteUser(id: number) {
    const authToken = await userToken();
    const res = api.delete(`/users/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });

}

// Image Upload
export async function uploadImage(image: string) {
    if (!image) {
        return;
    }
    const authToken = await userToken();
    let data = new FormData();

    if (Platform.OS === "android") {
        const newImageUri = "file:///" + image.split("file:/").join("");

        data.append("file", {
            uri: newImageUri,
            type: mime.getType(image),
            name: newImageUri,
        });

    } else if (Platform.OS === "ios") {
        data.append("file", {
            uri: image,
            name: image
        });
    }

    const res = await api.post(`/products/image`, data, {
        headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-type": "multipart/form-data",
        },
    });

    return res;
}