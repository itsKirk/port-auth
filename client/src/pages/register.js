import { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        apiUrl + "/api/users/register",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xs mx-auto bg-white shadow-md rounded-lg p-6"
      style={{ marginTop: "50vh", transform: "translateY(-50%)" }}>
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block mb-2 text-lg">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block mb-2 text-lg">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block mb-2 text-lg">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
        Register
      </button>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-blue-500 underline">
          Login
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;
