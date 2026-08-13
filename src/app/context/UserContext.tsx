import { User } from "@/interfaces/interface";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { jwtTokenKey } from "@/constants/storageKeys";
import { get } from "@/api/api";
import { API_URL } from "@/constants/backend_url";

const UserContext = createContext<{
    user: User | null; 
    loading: boolean;
    setUser: (user: User | null) => void; 
}>(
{
    user: null, 
    loading: true, 
    setUser: () => {}
});

export default function UserProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const jwtToken = SecureStore.getItem(jwtTokenKey);

    useEffect(() => {

        if(!jwtToken) return;

        const getIt = async () => {

            const result = await get(`${API_URL}/api/user`);

            setUser(result.response_body);
            setLoading(false);

        };

        getIt();

    }, [jwtToken]);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    )        

}

export function useUser() {
    const context = useContext(UserContext);

    return context;
}