import { useContext } from "react";
import { createContext } from ("react");

export const authContext = createContext();

export function authProvider({children}){
    const [user, setUser] = setUser("");

    return <authContext.Provider>
        {children}
    </authContext.Provider>
}

export function useAuthContext() {
    return useContext(authContext);
}