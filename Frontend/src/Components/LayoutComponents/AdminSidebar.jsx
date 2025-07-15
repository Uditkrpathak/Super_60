import { NavLink, useNavigate } from "react-router-dom";
import {
    FaUserPlus,
    FaBlog,
    FaCalendarPlus,
    FaChalkboardTeacher,
    FaUsers,
    FaRegNewspaper,
    FaCalendarAlt,
    FaUserTie,
    FaSignOutAlt,
    FaHome,
    FaBars,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { motion } from "framer-motion";

const AdminSidebar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpenMobile, setIsOpenMobile] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const sections = [
        {
            heading: "Main",
            items: [
                { title: "Home Page", icon: <FaHome />, path: "/" },
                { title: "Admin Dashboard", icon: <MdDashboard />, path: "/admin/dashboard" },
            ],
        },
        {
            heading: "Add New",
            items: [
                { title: "Add New User", icon: <FaUserPlus />, path: "/admin/add-user" },
                { title: "Add New Blog", icon: <FaBlog />, path: "/admin/add-blog" },
                { title: "Add New Event", icon: <FaCalendarPlus />, path: "/admin/add-event" },
                { title: "Add New Faculty", icon: <FaChalkboardTeacher />, path: "/admin/add-faculty" },
            ],
        },
        {
            heading: "Manage",
            items: [
                { title: "All Users", icon: <FaUsers />, path: "/users" },
                { title: "All Blogs", icon: <FaRegNewspaper />, path: "/blogs" },
                { title: "All Events", icon: <FaCalendarAlt />, path: "/events" },
                { title: "All Faculties", icon: <FaUserTie />, path: "/academics" },
            ],
        },
    ];

    // Mobile drawer
    const MobileDrawer = () => (
        <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-64 bg-[#002277] text-white p-4 z-50 overflow-y-auto md:hidden"
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#C57726]">Super60 Admin</h2>
                <button onClick={() => setIsOpenMobile(false)} className="text-white text-2xl">
                    ✕
                </button>
            </div>

            {sections.map(({ heading, items }) => (
                <div key={heading} className="mb-6">
                    <h3 className="mb-3 text-sm font-semibold text-gray-300 uppercase tracking-wide">{heading}</h3>
                    <nav className="flex flex-col gap-1">
                        {items.map(({ title, icon, path }) => (
                            <NavLink
                                key={title}
                                to={path}
                                onClick={() => setIsOpenMobile(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-3 rounded-lg transition text-sm ${isActive ? "bg-white text-[#002277] font-semibold" : "hover:bg-white hover:text-[#002277]"
                                    }`
                                }
                            >
                                <span className="text-lg">{icon}</span>
                                <span>{title}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>
            ))}

            <div className="mt-auto">
                <h3 className="mb-3 text-sm font-semibold text-gray-300 uppercase tracking-wide">Session</h3>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white hover:text-[#002277] transition w-full"
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>
        </motion.div>
    );

    return (
        <>
            {/* Mobile toggle button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 text-white bg-[#002277] rounded-full shadow-lg"
                onClick={() => setIsOpenMobile(true)}
            >
                <FaBars />
            </button>

            {/* Mobile Drawer */}
            {isOpenMobile && <MobileDrawer />}

            {/* Desktop Hover Sidebar */}
            <motion.aside
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                initial={{ width: "4rem" }}
                animate={{ width: isHovered ? "16rem" : "4rem" }}
                transition={{ duration: 0.3 }}
                className={`hidden md:flex flex-col fixed top-0 left-0 h-screen bg-[#002277] text-white shadow-xl p-4 z-40 overflow-y-auto ${isHovered ? "overflow-x-visible" : "overflow-x-hidden"
                    }`}
            >
                {isHovered && (
                    <h2 className="text-2xl font-bold text-[#C57726] mb-10 whitespace-nowrap">Super60 Admin</h2>
                )}

                {sections.map(({ heading, items }) => (
                    <div key={heading} className="mb-6">
                        {isHovered && (
                            <h3 className="mb-3 text-sm font-semibold text-gray-300 uppercase tracking-wide">
                                {heading}
                            </h3>
                        )}
                        <nav className="flex flex-col gap-1">
                            {items.map(({ title, icon, path }) => (
                                <NavLink
                                    key={title}
                                    to={path}
                                    className={({ isActive }) =>
                                        `group relative flex items-center gap-3 px-3 py-3 rounded-lg transition text-sm ${isActive ? "bg-white text-[#002277] font-semibold" : "hover:bg-white hover:text-[#002277]"
                                        }`
                                    }
                                >
                                    <span className="text-lg">{icon}</span>
                                    {isHovered ? (
                                        <motion.span initial={false} animate={{ opacity: 1 }}>
                                            {title}
                                        </motion.span>
                                    ) : (
                                        <span className="absolute left-14 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
                                            {title}
                                        </span>
                                    )}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                ))}

                <div className="mt-auto">
                    {isHovered && (
                        <h3 className="mb-3 text-sm font-semibold text-gray-300 uppercase tracking-wide">Session</h3>
                    )}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white hover:text-[#002277] transition w-full"
                    >
                        <FaSignOutAlt />
                        {isHovered && <span>Logout</span>}
                    </button>
                </div>
            </motion.aside>
        </>
    );
};

export default AdminSidebar;
