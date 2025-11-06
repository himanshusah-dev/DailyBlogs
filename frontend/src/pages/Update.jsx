import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../components/Input";

function Update() {
  const apiUrl = import.meta.env.VITE_API_BACKEND_URL;
  const { id } = useParams();

  const token = localStorage.getItem("token");
  //   console.log(token);
  if (!token) {
    console.warn("No token found");
    return;
  }

  const [formValues, setFormValues] = useState([
    {
      title: "",
      slug: "",
      tags: "",
      content: "",
      contentId: "",
    },
  ]);

  async function fetchData() {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/blog/oneContent`, {
        params: { contentId: id },
        headers: {
          Authorization: `${token}`,
        },
      });

      //   console.log("Data:", response.data.content);

      //   setFormValues(response.data.content);
      setFormValues({
        title: response.data.content.title,
        slug: response.data.content.slug,
        tags: response.data.content.tags,
        content: response.data.content.content,
        contentId: id,
      });
    } catch (error) {
      console.error("Error fetching blog content:", error);
    }
  }
  //   console.log("form value ,", formValues);

  //   console.log("form values ..", Object.entries(formValues)[0][1]);
  //   Object.entries(formValues)[0][1]

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/api/v1/blog/update`, formValues, {
        headers: {
          Authorization: `${token}`,
        },
      });
      alert("Blog updated successfully!");
      //   navigate("/"); // redirect to home or blog list
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className=" w-[70%] bg-gray-200 m-auto">
        <h2 className="text-center text-2xl font-semibold font-sans mb-10">
          Update Blog
        </h2>
        <form
          className="flex flex-col bg-gray-50 gap-5 border-4 p-20"
          onSubmit={handleSubmit}
        >
          <div className=" flex flex-row justify-between">
            <label className="text-xl">Title:</label>
            <input
              className="bg-gray-300 h-10 text-xl rounded w-[70%] p-1"
              type="text"
              name="title"
              value={formValues.title || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className=" flex flex-row justify-between">
            <label className="text-xl">slug:</label>
            <textarea
              className="bg-gray-300 h-10 text-xl rounded w-[70%] p-1"
              name="slug"
              value={formValues.slug || ""}
              onChange={handleChange}
              rows="2"
              required
            />
          </div>
          <div className=" flex flex-row justify-between">
            <label className="text-xl">tags:</label>
            <textarea
              className="bg-gray-300 h-10 text-xl rounded w-[70%] p-1"
              name="tags"
              value={formValues.tags || ""}
              onChange={handleChange}
              rows="2"
              required
            />
          </div>
          <div className=" flex flex-row justify-between">
            <label className="text-xl">Content:</label>
            <textarea
              className="bg-gray-300 h-10 text-xl rounded w-[70%] p-1"
              name="content"
              value={formValues.content || ""}
              onChange={handleChange}
              onInput={(e) => {
                e.target.style.height = "auto"; // reset
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              rows="6"
              required
            />
          </div>
          <button className=" w-30 m-auto h-14 rounded-2xl text-amber-50 bg-green-500" type="submit">
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update;
