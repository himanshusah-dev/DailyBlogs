// BlogContext.js
import { createContext, useContext, useState } from "react";

// Create the context
const BlogContext = createContext();

// Provider component
export const BlogProvider = ({ children }) => {
    const [blogState, setBlogState] = useState([
        {
            title: "First Post",
            slug: "first-post",
            tags: "react",
            content: "This is the first blog post.",
        },
    ]);

    return (
        <BlogContext.Provider value={{ blogState, setBlogState }}>
            {children}
        </BlogContext.Provider>
    );
};

// Custom hook for easier access
export const useBlog = () => useContext(BlogContext);
