import {navigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api"
import { REFRESH_TOKEN,ACCESS_TOKEN } from "../constants";
import { useState } from "react";
/* 
quello che facciamo qua e':
stabilire una PROTECTED ROUTE


ceccare se siamo autorizzati prima di mostrare
qualsiasi contenuto

Teoricamente bypassabile
QUESTA NON E' ASSOLUTAMENTE TUTTA LA PROTEZIONE
e' soltanto una layer in piu' via frontend

*/

function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    
    
}