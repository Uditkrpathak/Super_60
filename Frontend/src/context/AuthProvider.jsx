import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // 3. Login function
    const login = (token, userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // 4. Logout function 
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    // 5. Values to share in context
    const reqValues = {
        isAuthenticated,
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={reqValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
