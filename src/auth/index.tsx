import React, { useEffect } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import { postAPI } from "../api";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const checkAuth = async (refreshToken: string) => {
    try {
      const refreshTokenResponse = await postAPI({
        path: "auth/refresh-token",
        body: {
          refreshToken,
        },
      });
      localStorage.setItem(ACCESS_TOKEN, refreshTokenResponse.data.accessToken);
    } catch (error) {
      console.log("error", error);
      navigate("/comic/login");
    }
  };

  useEffect(function () {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (refreshToken === null) {
      navigate("/comic/login");
    } else {
      checkAuth(refreshToken);
    }
  }, []);

  return <>{children}</>;
};

export default Auth;
