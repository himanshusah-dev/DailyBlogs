import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { UseUser } from "../utils/UserContext";

function SingIn() {
  const apiUrl = import.meta.env.VITE_API_BACKEND_URL;
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const errors = "";

  const [formValues, setFormValues] = useState([
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

  async function handleSubmit(e) {
    e.preventDefault();

    const email = String(formValues[0].value).trim();
    const password = String(formValues[1].value).trim();

    try {
      const response = await axios.post(apiUrl + "/api/v1/user/signin", {
        email, //email
        password, // Send password as part of the request
      });
      console.log(response);

      if (response.data.token) {
        const token = response.data.token;
        window.localStorage.setItem("token", token);

        navigate("/home");
      } else {
        // navigate("/signIn");
        alert("the username password is wrong ..");
      }
    } catch (error) {
      // setErrorMessage(error);

      navigate("/signIn");
    }
  }

  return (
    <div>
      <h1 className="text-center text-3xl bg-red-500">SIGNIN</h1>
      <div className="flex justify-center content-center items-center w-screen h-screen bg-blue-200 ">
        <div
          className="bg-amber-200 min-w-80 min-h-80 
       content-center flex flex-col rounded-2xl justify-center  "
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
              className="mt-14 ml-42 items-center bg-red-400 rounded-2xl text-white border-2 px-5 py-2 content-center "
            >
              Submit
            </button>
          </form>
          <p>{errorMessage}</p>
          <button
            className="text-red-600 hover:text-green-500 mt-5"
            onClick={() => navigate("/")}
          >
            I'm a new User{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingIn;
