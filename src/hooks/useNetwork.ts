import { useEffect } from "react";
import network from "../utils/network";
import { useAuthContext } from "../context/authContext/AuthContext";
import { tokenExpired } from "../utils/tokenTools";

const useNetwork = () => {
  const { state, logout } = useAuthContext();

  useEffect(() => {
    // Request interceptor
    let isRefreshingToken = false;
    const requestInterceptor = network.interceptors.request.use(
      async (config) => {
        if (!isRefreshingToken) {
          const accessToken = localStorage.getItem("access_token");

          if (accessToken && tokenExpired(accessToken, 60000)) {
            await logout();
            return Promise.reject("No valid refresh token, user logged out.");
          } else if (accessToken) {
            // If the access token is still valid
            console.log("Access token is still valid");
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    //Response Interceptor
    const responseInterceptor = network.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response) {
          if (error.response.status === 401) {
            console.error("Token is no longer valid");
            // Token is no longer valid
            await logout();
          }
          // API unavailable errors
          if (error.response.status > 500) {
            alert(
              "Elnézést kérünk, de a szolgáltatás jelenleg nem elérhető. Kérjük próbálja meg később."
            );
          }
        } else if (error.request) {
          // The request was made but no response was received
          alert(
            "Elnézést kérünk, de a szolgáltatás jelenleg nem elérhető. Kérjük próbálja meg később."
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          alert("Váratlan hiba történt. Kérjük próbálja meg később.");
        }
        return Promise.reject(error);
      }
    );

    //Cleanup
    return () => {
      network.interceptors.request.eject(requestInterceptor);
      network.interceptors.response.eject(responseInterceptor);
    };
  }, [state, logout]);
};

export default useNetwork;
