import { createContext, useState } from "react";

// 1. Create context
const StudentEditContext = createContext();

// 2. Provider
export const StudentEditProvider = ({ children }) => {
    const [studentProfile, setStudentProfile] = useState(null);

    return (
        <StudentEditContext.Provider value={{ studentProfile, setStudentProfile }}>
            {children}
        </StudentEditContext.Provider>
    );
};

export default StudentEditContext;