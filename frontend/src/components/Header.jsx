// import React from "react";
// import { useNavigate } from "react-router-dom";

// import { UseUser } from "../utils/UserContext";
// import axios from "axios";
// import { useEffect } from "react";

// function Header() {
//   const apiUrl = import.meta.env.VITE_API_BACKEND_URL;
//   const navigate = useNavigate();
//   const { userState } = UseUser();
//   const token = userState?.token;
//   console.log(typeof token);

//   const userData = async function (token) {
//     const response = await axios.get(`${apiUrl}/api/v1/user/getuser`, {
//       headers: {
//         Authorization: `${token}`,
//       },
//     });

//     console.log("the data in the header : ", response.data.response);
//   };

//   useEffect(() => {
//     userData();
//   }, []);

//   return (
//     <div>
//       <div className="flex flex-row justify-between bg-amber-100 min-h-12 pl-10 pr-10 pt-10">
//         <div>Logo</div>
//         <div className=" mb-2">
//           <ul className="flex flex-row justify-between gap-10">
//             <li>Home</li>
//             <li>About</li>
//             <li>Contact</li>
//             <li>Blogs</li>
//             <li>👨 himanshu</li>
//             <button
//               onClick={() => navigate("/Addcontent")}
//               className="bg-blue-400 hover:bg-red-600 text-white px-5 py-2 rounded-md"
//             >
//               ➕ Add New Blog
//             </button>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Header;

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseUser } from "../utils/UserContext";
import axios from "axios";
import { useState } from "react";

function Header() {
  const [userName, setUserName] = useState("Unkown");
  const apiUrl = import.meta.env.VITE_API_BACKEND_URL;
  const navigate = useNavigate();
  const { userState } = UseUser();
  // console.log(userState);
  // const token = userState?.token;
  const token = localStorage.getItem("token");
  // console.log("token in the header : ", token);

  const userData = async (token) => {
    try {
      if (!token) {
        console.warn("⚠️ No token found — skipping user fetch");
        return;
      }

      // const response = await axios.get(
      //   "http://localhost:8000/api/v1/user/getUser",
      //   {
      const response = await axios.get(`${apiUrl}/api/v1/user/getuser`, {
        headers: {
          Authorization: `${token}`, // ✅ most APIs need the Bearer prefix
        },
      });

      // console.log("✅ User data in header:", response?.data?.user?.name);
      setUserName(response?.data?.user?.name);
    } catch (error) {
      console.error(
        "❌ Error fetching user data:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    userData(token); // ✅ pass the token here
  }, [token]); // ✅ re-run when token changes

  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <div>
      <div className="flex flex-row justify-between bg-amber-100 min-h-12 pl-10 pr-10 pt-10">
        <div onClick={() => navigate("/home")}>Logo</div>
        <div className="mb-2">
          <ul className="flex flex-row justify-between gap-10">
            <Link to="/home">
              <li>Home</li>
            </Link>
            <Link to="/About">
              <li>About</li>
            </Link>

            <Link to="/AllBlogs">
              <li>My-Blog</li>
            </Link>
            <li className="uppercase">😎 {userName}</li>
            <button
              onClick={() => navigate("/Addcontent")}
              className="bg-blue-400 hover:bg-red-600 text-white px-5 py-2 rounded-md"
            >
              ➕ Add New Blog
            </button>
            <button
              className="bg-red-500 rounded-md px-3 py-2"
              onClick={() => logout()}
            >
              Logout
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
