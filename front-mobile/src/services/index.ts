import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8080',
})

export const TOKEN = ' Basic ZHNjYXRhbG9nOmRzY2F0YWxvZzEyMw==';