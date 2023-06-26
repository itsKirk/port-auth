import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(apiUrl + "/api/users/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        // remove user from storage
        localStorage.removeItem("user");

        // dispatch logout action
        dispatch({ type: "LOGOUT" });
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.log({ error });

      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading, error };
};
