import { createContext, useState } from "react";

export const MessageDataContext = createContext([]);

export const MessageDataProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);

    return (
        <MessageDataContext.Provider
            value={{
                messages,
                setMessages,
            }}
        >
            {children}
        </MessageDataContext.Provider>
    );
};
