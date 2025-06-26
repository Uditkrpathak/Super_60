import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    // Load user from localStorage on first render
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (token && userData) {
            const parsedUser = JSON.parse(userData);
            setIsAuthenticated(true);
            setUser(parsedUser);
            setIsAdmin(parsedUser.role === "admin");
        }
    }, []);

    // Login function
    const login = (token, userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        setIsAdmin(userData.role === "admin");

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // Logout function
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setIsAdmin(false);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    // Context value
    const reqValues = {
        isAuthenticated,
        user,
        isAdmin,
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
