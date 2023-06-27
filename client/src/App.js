import "./index.css";
import RegisterForm from "./pages/register";
import Home from "./pages/home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginForm from "./pages/login";
import Navbar from "./components/navbar";
import Dashboard from "./pages/dashboard";
import { useAuthContext } from "./hooks/useAuthContext";
import NotFound from "./pages/notfound";
import axios from "axios";
axios.defaults.withCredentials = true;
const App = () => {
  const { user } = useAuthContext();
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/dashboard" /> : <RegisterForm />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <LoginForm />}
        />
        <Route
          path="/dashboard"
          element={!user ? <Navigate to="/login" /> : <Dashboard />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </Router>
  );
};

export default App;
