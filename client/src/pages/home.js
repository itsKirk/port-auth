import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/login");
  };
  return (
    <div className="bg-gray-200 min-h-screen">

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4">Welcome to JasNat Wares</h2>
          <p className="text-gray-700">
            This is an example application demonstrating how to utilize
            Passport&apos;s Local Strategy as an authentication means in a MERN
            app.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-4 rounded">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
