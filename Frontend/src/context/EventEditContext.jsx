import { createContext, useState } from "react";

// 1. Create context
const EventEditContext = createContext();

// 2. Provider
export const EventEditProvider = ({ children }) => {
    const [EventData, setEventData] = useState(null);

    return (
        <EventEditContext.Provider value={{ EventData, setEventData }}>
            {children}
        </EventEditContext.Provider>
    );
};

export default EventEditContext;