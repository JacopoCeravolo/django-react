import {Navigate, navigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api"
import { REFRESH_TOKEN,ACCESS_TOKEN } from "../constants";
import { useState,useEffect } from "react";
/* 
quello che facciamo qua e':
stabilire una PROTECTED ROUTE


checkare se siamo autorizzati prima di mostrare
qualsiasi contenuto

Teoricamente bypassabile
QUESTA NON E' ASSOLUTAMENTE TUTTA LA PROTEZIONE
e' soltanto una layer in piu' via frontend

*/

function ProtectedRoute({children}) {
    //default value is null \/
    const [isAuthorized, setIsAuthorized] = useState(null);
    //async function
    //refreshes the token automatically
    const refreshToken = async () => {
        //we call the refresh token
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            //we TRY to send a response
            //to this -> api route
            //with the refresh token
            const res = await api.post("/api/token/refresh/",{
                refresh: refreshToken,
            });
            // 200 means successfull
            if (res.status === 200) {
                //we set the new access token to res.data.access 
                //which contains the new access token
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    }

    const auth = async () => {
        //looks at access token to see
        //if we have one or not
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token){
            setIsAuthorized(false);
            return
        }
        // we decode the token usind JWTdecode
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000

        //if token expired (less than now)
        if(tokenExpiration < now){
            await refreshToken();
            //we try to refresh it
        } else {
            //if the token is not authorized we good to go
            setIsAuthorized(true);
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }
    
    return isAuthorized ? children : <Navigate to ="/login" />
}