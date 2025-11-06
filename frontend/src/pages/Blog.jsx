import React, { useContext, useEffect, useState } from "react";
import { useBlog } from "../utils/BlogContext";
import { useParams } from "react-router-dom";
import axios from "axios";

function Blog() {
  const apiUrl = import.meta.env.VITE_API_BACKEND_URL;
  const { id } = useParams();
  const { blogState } = useBlog();

  // console.log(id);
  const token = localStorage.getItem("token");
  //   console.log(token);
  if (!token) {
    console.warn("No token found");
    return;
  }

  const blogId = id.slice(1);

  const [blogContent, setBlogContent] = useState("");
  const [creatorID, setCreatorID] = useState("");
  const [creator, setCreator] = useState("");

  async function fetchData() {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/blog/onecontent`, {
        params: { contentId: blogId },
        headers: {
          Authorization: `${token}`,
        },
      });

      // console.log("Data:", response?.content);
      setCreatorID(response?.data?.content?.creatorId);
      const creatorID2 = response?.data?.content?.creatorId;

      setBlogContent(response.data.content);

      const response2 = await axios.post(
        `${apiUrl}/api/v1/user/getBlogCreator`,
        {
          creatorId: creatorID2,
        }
      );

      // console.log("✅ User data in header:", response2?.data?.user);
      setCreator(response2?.data?.user);
    } catch (error) {
      console.error("Error fetching blog content:", error);
    }
  }
  // console.log("creator fetch ", creator);

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(creatorID);

  return (
    <div>
      <div>
        <div className=" bg-amber-100 content-center pl-20 pr-20 mb-5 ">
          <h1 className="text-3xl text-center font-bold m-1 ">My blogs</h1>
        </div>

        <div className="ml-20  mr-20">
          {/* <h3 className="bg-blue-100  font-serif ">{blogContent.slug}</h3> */}
        </div>

        <div className="ml-20 mr-20 min-h-50 mb-10 bg-blue-100  rounded-4xl p-2">
          <div>
            <h2 className=" p-3 font-semibold text-center  text-xl uppercase">
              {blogContent.title}
            </h2>
            <h4 className="text-end mr-10">
              {blogContent?.tags?.map((a, i) => {
                return (
                  <span key={i} className="opacity-50 ">
                    {" "}
                    #{a}
                  </span>
                );
              })}
            </h4>
          </div>

          <div className="flex flex-row mt-20 content-center justify-end gap-1">
            <h5>Creator-</h5>

            <img className="w-12 border h-12 rounded-full" src="" alt="user" />
            <h3>{creator.name},</h3>
            <p>Date- {new Date(creator.updatedAt).toUTCString()}</p>
          </div>
        </div>

        <div className="ml-20 mr-20 bg-pink-100 rounded-2xl">
          {/* <p className="text-end mr-10">[{blogContent.tags}]</p> */}

          <p className="text-end mr-5 mb-10 opacity-50">{blogContent._id}</p>
          <img
            className=" h-72 content-center m-auto mb-5"
            src="/blog_img.jpg"
            alt="image"
          />
          <h1 className="text-2xl">{blogContent.content}</h1>
        </div>
      </div>
    </div>
  );
}

export default Blog;
