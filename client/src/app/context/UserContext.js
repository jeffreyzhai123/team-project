"use client"
import { createContext, useState } from 'react';
//help sharing the user among modules
export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    
            
    

    return (
        <UserContext.Provider value = {{user, setUser}}>
            {children}
            
        </UserContext.Provider>
    );
};