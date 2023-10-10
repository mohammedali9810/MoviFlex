import React, { useState } from "react";

export default function NewUser() {
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    userName: "",
    password: "",
  });
  const [userFormError, setUserFormError] = useState({
    name: null,
    email: null,
    userName: null,
    password: null,
  });
  const handleChange = (e) => {
    if (e.target.name === "name") {
      setUserForm({ ...userForm, name: e.target.value });
      if (e.target.value === "") {
        setUserFormError({ ...userFormError, name: "Name is required" });
      } else setUserFormError({ ...userFormError, name: null });
    }
    if (e.target.name === "email") {
      setUserForm({ ...userForm, email: e.target.value });
      if (e.target.value === "") {
        setUserFormError({ ...userFormError, email: "Email is required" });
      } else if (
        !e.target.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/)
      ) {
        setUserFormError({ ...userFormError, email: "Not a valid Email " });
      } else setUserFormError({ ...userFormError, email: null });
    }
    if (e.target.name === "userName") {
      setUserForm({ ...userForm, userName: e.target.value });
      if (e.target.value === "") {
        setUserFormError({
          ...userFormError,
          userName: "User Name is required",
        });
      } else if (!e.target.value.match(/^\S+$/)) {
        setUserFormError({
          ...userFormError,
          userName: "User Name cannot have whitespace characters.",
        });
      } else setUserFormError({ ...userFormError, userName: null });
    }
    if (e.target.name === "password") {
      setUserForm({ ...userForm, password: e.target.value });
      if (e.target.value === "") {
        setUserFormError({
          ...userFormError,
          password: "Password is required",
        });
      } else if (
        !e.target.value.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
        )
      ) {
        setUserFormError({
          ...userFormError,
          password:
            "Password must be at least 8 characters long containing one digit, one lowercase character, one uppercase character and a special character",
        });
      } else setUserFormError({ ...userFormError, password: null });
    }
  };
  const preventSubmit = (e) => {
    e.preventDefault();
    console.log(userForm);
  };

  return (

    <div className="container p-1 mt-20 d-flex justify-content-center align-items-center"> 
      <div className=" mt-20 w-50 border rounded border-success  ">
      <form onSubmit={preventSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label ">
            Name
          </label>
          <input
            className="form-control w-50 mx-auto"
            id="name"
            name="name"
            value={userForm.name}
            onChange={handleChange}
          />
          <div id="nameHelp" className="form-text">
            {userFormError.name}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            name="email"
            className="form-control w-50 mx-auto"
            id="email"
            value={userForm.email}
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text">
            {userFormError.email}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            User Name
          </label>
          <input
            className="form-control w-50 mx-auto"
            id="userName"
            name="userName"
            value={userForm.userName}
            onChange={handleChange}
          />
          <div id="userNameHelp" className="form-text">
            {userFormError.userName}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control w-50 mx-auto"
            id="password"
            value={userForm.password}
            onChange={handleChange}
          />
          <div id="passwordHelp" className="form-text">
            {userFormError.password}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    </div>

  );
}
