import { History } from "@/interfaces/interface";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { get } from "@/api/api";
import { API_URL } from "@/constants/backend_url";

const HistoryContext = createContext<{
    history: History[]; 
    setHistory: (history: History[]) => void; 
}>(
{
    history: [], 
    setHistory: () => {}
});

export default function HistoryProvider({ children }: Readonly<{ children: ReactNode }>) {

    const [history, setHistory] = useState<History[]>([]);

    useEffect(() => {

        const getIt = async () => {

            const result = await get(`${API_URL}/api/challenge`);
            setHistory(result.response_body);

        };

        getIt();

    }, []);

    return (
        <HistoryContext.Provider value={{ history, setHistory }}>
            {children}
        </HistoryContext.Provider>
    )        

}

export function useHistory() {
    const context = useContext(HistoryContext);

    return context;
}