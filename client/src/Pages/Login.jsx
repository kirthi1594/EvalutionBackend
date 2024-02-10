import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/users/login",
        data,
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert("login successful");
        navigate("/Posts");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleFormSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          onChange={handleUserInput}
        />
        <br />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          onChange={handleUserInput}
        />
        <br />
        <input type="submit" value="login" />
      </form>
    </div>
  );
};

export default Login;
