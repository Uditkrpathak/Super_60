import { createContext, useState } from "react";

// 1. Create context
const BlogEditContext = createContext();

// 2. Provider
export const BlogEditProvider = ({ children }) => {
    const [BlogData, setBlogData] = useState(null);

    return (
        <BlogEditContext.Provider value={{ BlogData, setBlogData }}>
            {children}
        </BlogEditContext.Provider>
    );
};

export default BlogEditContext;