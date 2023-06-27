import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
function getPascalCase(fullName) {
  const trimmedFullName = fullName.trim();

  const names = trimmedFullName.split(/\s+/);

  const firstName = names[0].replace(/[^\w\s]/g, "");

  const lastName = names[names.length - 1].replace(/[^\w\s]/g, "");

  const formattedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

  const formattedLastName =
    lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

  return `${formattedFirstName} ${formattedLastName}`;
}

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleClick = () => {
    navigate("/");
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
          <span className="mr-4 text-gray-300">
            {user ? "Hello, " + getPascalCase(user.name) : null}
          </span>
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
