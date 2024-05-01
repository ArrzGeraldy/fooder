import useAuth from "./useAuth";

const useRefresh = () => {
  const authContext = useAuth();
  const setAuth = authContext ? authContext.setAuth : () => {};

  const refresh = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/refresh`,
      {
        credentials: "include",
      }
    );
    const json = await response.json();

    setAuth({ user: json.data.user, accessToken: json.data.accessToken });

    return json.data.accessToken;
  };

  return refresh;
};

export default useRefresh;
