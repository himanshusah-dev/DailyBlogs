import axios from "axios";
import React, { useEffect, useState } from "react";

function About() {
  const apiUrl = import.meta.env.VITE_API_BACKEND_URL;
  const token = localStorage.getItem("token");
  const [user, setUser] = useState("");
  const userData = async (token) => {
    try {
      if (!token) {
        console.warn("⚠️ No token found — skipping user fetch");
        return;
      }

      const response = await axios.get(`${apiUrl}/api/v1/user/getuser`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      // console.log("✅ User data in header:", response?.data?.user?.name);
      setUser(response?.data?.user);
    } catch (error) {
      console.error(
        "❌ Error fetching user data:",
        error.response?.data || error.message
      );
    }
  };
  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }

  useEffect(() => {
    userData(token); // ✅ pass the token here
  }, [token]); // ✅ re-run when token changes
  return (
    <div>
      <div className="border-4 flex flex-col gap-20 content-center  items-center min-h-72">
        <h1 className="text-2xl font-semibold">ABOUT ME </h1>
        <div className="flex justify-around  w-full ">
          <div className=" w-[30%] content-center m-auto">
            <img
              className="w-40 h-40 rounded-full border"
              src="#"
              alt="UserImage"
            />
          </div>
          <div className=" w-[60%] p-3">
            <h1 className="text-3xl ">{user.name}</h1>
            <h2 className="text-xl">{user.email}</h2>

            <p>Member since- {new Date(user.createdAt).toUTCString()}</p>

            <p className="text-gray-600 mt-2">
              <span className="text-black font-semibold">About</span>- Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Velit harum
              libero laborum amet dolores eaque voluptas at, quam laboriosam et!
            </p>

            <button
              onClick={() => {
                logout();
              }}
              className="bg-red-500 text-white w-20 h-10 mt-5 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
