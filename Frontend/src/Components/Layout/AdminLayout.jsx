import { Outlet } from "react-router-dom";
import AdminSidebar from "../LayoutComponents/AdminSidebar";

const AdminLayout = () => {
    return (
        <main className="bg-gray-100">
            <AdminSidebar/>
            <Outlet/>
        </main>
    );
};

export default AdminLayout;