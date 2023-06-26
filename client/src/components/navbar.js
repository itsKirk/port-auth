import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleClick = () => {
    navigate("/dashboard");
  };
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <span
          onClick={handleClick}
          className="text-xl font-bold cursor-pointer">
          EDU-KE
        </span>
        <div>
          {!user && (
            <Link
              to="/register"
              className="mr-4 text-gray-300 hover:text-white">
              Register
            </Link>
          )}
          {!user && (
            <Link
              to="/login"
              className="mr-4 text-gray-300 hover:text-white">
              Login
            </Link>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="mr-4 text-gray-300 hover:text-white">
              Logout
            </button>
          )}
          {!user && (
            <Link
              to="/dashboard"
              className="text-gray-300 hover:text-white">
              Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
