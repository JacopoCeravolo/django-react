/*
Here we write the interceptor
This is going to intercepts requests sent
And automatically add the header
so that we don't have to write it manually in our code

we using axios interceptor
it checks if we have the access token
it adds automatically the token to the request

*/

import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
    //this is how we import an environment variable
    //in this case is our api url
})

api.interceptors.request.use(
    (config) => {
        //we trying to get the item with the key access token
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            //this is how we pass a jwt access token
            //it's all from axios
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api
