import { createContext, useEffect, useState } from "react";
import axios from "axios";
const AuthContext = createContext(
    {
        isLoggedIn:false,
        loginHandler:()=>{},
        logoutHandler:()=>{}
    }
)

export const AuthContextProvider = (props) =>
{
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    useEffect(()=>
    {
        async function auth()
        {
            try
            {
                const res = await axios.get("http://localhost:8080/users/auth", {withCredentials:true})
                if (res.status === 200)
                {
                    setIsLoggedIn(true)
                }
            }
            catch(error)
            {
                console.log(error.response.status)
                    
            }       
        }
        auth()
    })

    const loginHandler = async(email, password) =>
    {

        const res = await axios.post("http://localhost:8080/users/login",{email, password}, {withCredentials: true})
        if(res.status === 200)
        {
            setIsLoggedIn(true);
            localStorage.setItem("user_id", res.data.id)
        }
        return res
    }
    const logoutHandler = async() =>
    {
        await axios.get("http://localhost:8080/users/logout",{withCredentials: true})
        localStorage.removeItem("user_id")
        setIsLoggedIn(false);
    }

    return (
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn, loginHandler:loginHandler, logoutHandler:logoutHandler}}>
        {props.children}
    </AuthContext.Provider>
    )
}

export default AuthContext