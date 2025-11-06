import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SingIn from "./pages/SingIn";
import Home from "./pages/Home";
import Addcontent from "./components/Addcontent";
import Blog from "./pages/Blog";
import { BlogProvider } from "./utils/BlogContext";
import Layout from "./layout/Layout";
import { UserProvider } from "./utils/UserContext";
import AllBlogs from "./pages/AllBlogs";
import About from "./pages/About";
import Update from "./pages/Update";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <UserProvider>
            <BlogProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<LogIn />} />

                  <Route path="/signIn" element={<SingIn />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/About" element={<About />} />
                  <Route path="/Addcontent" element={<Addcontent />} />
                  <Route path="/AllBlogs" element={<AllBlogs />} />
                  <Route path="/Blog" element={<Blog />} />
                  <Route path="/Blog/:id/:slug" element={<Blog />} />
                  <Route path="/update/:id" element={<Update />} />
                </Route>
              </Routes>
            </BlogProvider>
          </UserProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
