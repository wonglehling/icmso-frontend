import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { CookiesProvider, useCookies } from 'react-cookie';

export const UserContext = createContext({});

export function UserContextProvider({children}){
    const [user, setUser] = useState(null)
    const [cookies, setCookies, removeCookie] = useCookies();

    useEffect(() => {
        console.log("here");
        if(!user){
            axios.get('/auth/profile').then(({data})=> {
                setUser(data)
                if(!data){
                ['icms_access_token'].forEach(obj => removeCookie(obj));
                }
            }).catch(err => {
                ['icms_access_token'].forEach(obj => removeCookie(obj));
            })
        }
    }, []);

    const logout = () => {
        ['icms_access_token'].forEach(obj => removeCookie(obj));
        setUser(null)
    }
    return (
        <UserContext.Provider value={{user,setUser, cookies, setCookies, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(UserContext)
};