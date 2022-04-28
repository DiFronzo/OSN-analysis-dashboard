import { createContext, useContext, useState } from "react";

const QueryContext = createContext({});

export function QueryProvider({ children }) {
    const [query, setQuery] = useState("");

    return (
        <QueryContext.Provider
            value={{
                query,
                setQuery,
            }}
        
        >
            {children}
        </QueryContext.Provider>
    );
}

const useQuery = () => useContext(QueryContext);

export default useQuery;
