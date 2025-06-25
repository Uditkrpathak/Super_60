import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
    const { isAuthenticated, user } = useContext(AuthContext);

    if (!isAuthenticated || user?.role !== "admin") {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedAdminRoute;
