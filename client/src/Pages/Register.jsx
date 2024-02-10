import React, { useState } from "react";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    gender: "",
    email: "",
    password: "",
  });
  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(data);
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
          type="text"
          name="name"
          id="name"
          placeholder="Enter name"
          onChange={handleUserInput}
        />
        <br />
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
        <input
          type="text"
          name="gender"
          id="gender"
          placeholder="Enter gender"
          onChange={handleUserInput}
        />
        <br />
        <input type="submit" value="register" />
      </form>
    </div>
  );
};

export default Register;
