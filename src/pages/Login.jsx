import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router";
import { Errors } from "../components/Errors"

export const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      const result = await response.json();
      console.log(result)

      if (!response.ok) {
        setErrors([result.message]);
      } else {
        localStorage.setItem("token", result.token);
        setErrors([]);
        setUser(result.user);
      }
    } catch (err) {
      console.error(err);
    }

  };

  const handleInputChange = (e) => {
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value
      }
    });
  }
  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" id="username" value={formData.username} onChange={handleInputChange} required />
        
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" value={formData.password} onChange={handleInputChange} required />

        <button type="submit">Log in</button>

        {errors.length > 0 && <Errors errors={errors} />}
      </form>
    </>
  )
}
