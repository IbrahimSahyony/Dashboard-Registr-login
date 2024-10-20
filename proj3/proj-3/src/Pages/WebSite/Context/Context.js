import { createContext, useState } from "react";

export const User = createContext({})

export default function UserProvider({children}){
    const [auth,setAuth] = useState();
    
    const value={auth,setAuth}
    
    return(
        <div>
        
    <User.Provider value={value}>{children}</User.Provider>
    </div>    
)
}