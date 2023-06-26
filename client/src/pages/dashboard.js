import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

const Dashboard = () => {
  const [universities, setUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl + "/api/universities", {
          withCredentials: true,
        });
        setUniversities(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching universities:", error);
        setIsLoading(false);
      }
    };
    if (user) {
      fetchData();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">
        List of Universities in Kenya{" "}
      </h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {universities.map((university) => (
            <a
              href={university.web_pages[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-lg p-4 hover:bg-gray-100 transition-colors duration-200"
              key={university._id}>
              <h3 className="text-lg font-semibold mb-2">{university.name}</h3>

              {university.state_province && (
                <p>
                  <strong>State/Province:</strong> {university.state_province}
                </p>
              )}
              <p>
                <strong>Domains:</strong> {university.domains.join(", ")}
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
