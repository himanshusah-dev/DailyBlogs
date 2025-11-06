import React, { useState } from "react";
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_BACKEND_URL;

function LogIn() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState([
    {
      label: "Name :",
      type: "text",
      value: "",
    },
    {
      label: "Email :",
      type: "email",
      value: "",
    },
    {
      label: "Password :",
      type: "password",
      value: "",
    },
  ]);

  const handleChange = (e, index) => {
    const values = [...formValues];
    values[index].value = e.target.value;
    setFormValues(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("Form Submitted:", formValues);
    const name = String(formValues[0].value).trim();
    const email = String(formValues[1].value).trim();
    const password = String(formValues[2].value).trim();

    console.log(name, password, email);

    const response = await axios.post(apiUrl + "/api/v1/user/signup", {
      name,
      email, //email
      password, // Send password as part of the request
    });
    console.log(response);
    if (response.data.message) {
      navigate("/signIn");
    }

    console.log(response.data);
  };

  return (
    <div className="overflow-hidden">
      <h1 className="text-center text-3xl bg-green-500">LOGIN</h1>
      <div className="flex justify-center content-center items-center w-screen h-screen bg-blue-200  ">
        <div
          className="bg-amber-200 min-w-80 min-h-80 
       content-center flex flex-col rounded-2xl items-center justify-center m-auto border"
        >
          <form onSubmit={handleSubmit}>
            {formValues.map((inputObj, idx) => (
              <Input
                key={idx}
                obj={inputObj}
                onChange={handleChange}
                index={idx}
              />
            ))}
            <button
              type="submit"
              className="mt-10 ml-42 bg-red-400 rounded-2xl text-white border-2 px-5 py-2  "
            >
              Submit
            </button>
          </form>
          <button
            className="mt-5 text-gray-500 hover:text-red-500"
            onClick={() => navigate("/signIn")}
          >
            I am an existing user
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
