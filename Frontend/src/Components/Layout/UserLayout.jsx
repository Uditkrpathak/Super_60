import { Outlet } from "react-router-dom";
import Navbar from "../LayoutComponents/Navbar";
import Footer from "../LayoutComponents/Footer";


const UserLayout = () => {
    return (
        <>
            <Navbar/>
            <Outlet />
            <Footer/>
        </>
    );
};

export default UserLayout;