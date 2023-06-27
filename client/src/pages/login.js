import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLogin();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xs mx-auto bg-white shadow-md rounded-lg p-6"
      style={{ marginTop: "50vh", transform: "translateY(-50%)" }}>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
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
          autocomplete="current-password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
        Login
      </button>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-500 underline">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
