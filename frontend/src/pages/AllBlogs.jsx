import React, { useEffect, useState } from "react";
import axios from "axios";
import Addcontent from "../components/Addcontent";

import { useNavigate } from "react-router-dom";
import { useBlog } from "../utils/BlogContext";
import { UseUser } from "../utils/UserContext";

function AllBlogs() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BACKEND_URL;
  const [blogData, setBlogData] = useState([]);
  const { userState, setUserState } = UseUser();
  const [loading, setLoading] = useState(true);
  const { blogState, setBlogState } = useBlog();
  const [filterBlog, setFilterBlog] = useState([""]);
  const token = localStorage.getItem("token");
  let [inputText, setInputText] = useState("");

  async function fetchData() {
    try {
      //   console.log(token);
      setUserState({ ...userState, token });
      if (!token) {
        console.warn("No token found");
        return;
      }

      const response = await axios.get(`${apiUrl}/api/v1/blog/content`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      // console.log("Data:", response.data.content[0]);

      setBlogState(response.data.content);
      setFilterBlog(response.data.content);
    } catch (error) {
      console.error("Error fetching blog content:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="">
        <div>
          <h1 className="text-3xl text-center font-bold m-1 ">My blogs</h1>
          <div className=" flex ">
            <input
              type="text"
              className=" p-2 w-1/4 h-10  rounded-l-lg outline outline-none bg-gray-300 ml-20 hover:bg-gray-400"
              placeholder="Type To Search...."
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);

                // console.log(e.target.value);
              }}
            />

            <button
              className="bg-green-500 w-20 h-10  rounded-r-xl border-l-2 hover:bg-green-600"
              onClick={() => {
                const filter = blogState.filter((res) =>
                  res.title.toLowerCase().includes(inputText.toLowerCase())
                );

                // console.log(filter);
                setFilterBlog(filter);
                // setInputText("");
              }}
            >
              Search
            </button>
          </div>
          <div>
            {filterBlog.length === 0 ? (
              <div className="text-center mt-20 text-xl text-gray-600">
                <h3>No blog data available.</h3>
                <p>Can you please add some data in the blog.</p>
                {/* <Addcontent /> */}
              </div>
            ) : (
              filterBlog.map((blog, index) => (
                <div key={index} className="  ">
                  <div className=" bg-amber-100 content-center pl-20 pr-20 mb-5 "></div>

                  <div className="ml-20  mr-20 flex flex-col justify-around bg-gray-200 p-3 min-h-32 rounded-md ">
                    <h2 className="font-bold ml-2  w-full  text-2xl uppercase">
                      {blog.title}
                    </h2>

                    <h4>
                      {blog?.tags?.map((a, i) => {
                        return (
                          <span key={i} className="opacity-50">
                            {" "}
                            #{a}
                          </span>
                        );
                      })}
                    </h4>
                    {/* <p>Updated on {blog.updatedAt.toUTCString()}</p> */}

                    {/* <p>{blog.content.slice(0, 80)}....</p>
                     */}
                    <p>
                      {blog.content?.length > 80
                        ? blog.content.substring(
                            0,
                            blog.content.lastIndexOf(" ", 80)
                          ) + "..."
                        : blog.content}
                    </p>
                    <p>Updated on {new Date(blog.updatedAt).toUTCString()}</p>
                    <div className="flex justify-around mt-10">
                      <button
                        className="bg-green-500 px-4 py-2 text-white rounded content-center justify-center items-center w-32 hover:bg-green-600"
                        onClick={() =>
                          navigate(`/blog/${index + blog._id}/${blog.slug}`)
                        }
                      >
                        Read
                      </button>
                      <button
                        className="bg-green-500 px-4 py-2 text-white rounded content-center justify-center items-center w-32 hover:bg-green-600"
                        onClick={() => {
                          navigate(`/update/${blog._id}`);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllBlogs;
