import React, { useState } from "react";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_BACKEND_URL;

function Addcontent() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState([
    {
      label: "title ",
      type: "text",
      value: "",
    },
    {
      label: "slug ",
      type: "text",
      value: "",
    },
    {
      label: "content ",
      type: "text",
      value: "",
    },
    {
      label: "tags ",
      type: "text",
      value: "",
    },
  ]);

  const handleChange = (e, index) => {
    const values = [...formValues];
    values[index].value = e.target.value;
    setFormValues(values);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("reach to submit the content ");
    const title = String(formValues[0].value).trim(); // title, slug, content ,tags
    const slug = String(formValues[1].value).trim();
    const content = String(formValues[2].value).trim();
    const tagsInput = String(formValues[3].value).trim();

    // Convert comma-separated string to array
    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    const token = localStorage.getItem("token");
    const blogData = {
      title,
      slug,
      content,
      tags,
    };

    const response = await axios.post(
      apiUrl + "/api/v1/blog/content",
      blogData,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log(response);

    if (response) {
      navigate("/home");
      window.location.reload();
    } else {
      console.log("Error in the addition");
    }
  }

  return (
    <div className="flex flex-col max-w-1/2 items-center  border-2 border-blue-700 m-auto rounded-2xl mt-16">
      <h1 className="text-center text-4xl">Add Content</h1>
      <form onSubmit={handleSubmit}>
        {formValues.map((inputObj, idx) => (
          <Input key={idx} obj={inputObj} onChange={handleChange} index={idx} />
        ))}
        <button
          type="submit"
          className="mt-14 ml-48 mb-10 items-center bg-green-600 rounded-2xl text-white border-2 px-5 py-2 content-center "
        >
          Add Content
        </button>
      </form>
    </div>
  );
}

export default Addcontent;
