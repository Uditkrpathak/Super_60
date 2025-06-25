import { createContext, useState } from "react";

// 1. Create context
const StudentEditContext = createContext();

// 2. Provider
export const StudentEditProvider = ({ children }) => {
    const [studentToEdit, setStudentToEdit] = useState(null);

    return (
        <StudentEditContext.Provider value={{ studentToEdit, setStudentToEdit }}>
            {children}
        </StudentEditContext.Provider>
    );
};

export default StudentEditContext;