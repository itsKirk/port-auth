import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(
        apiUrl + "/api/users/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.status === 200) {
        const json = await axios.post(apiUrl + "/api/users/getUser", null, {
          withCredentials: true,
        });
        const loggedInUser = await json.data;
        console.log({ loggedInUser });
        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        console.log(localStorage.getItem("user"));

        // update the auth context
        dispatch({ type: "LOGIN", payload: loggedInUser });
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
