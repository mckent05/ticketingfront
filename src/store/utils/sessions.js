const getToken = () => {
  const token = JSON.parse(localStorage.getItem("user-token"));
  return token;
};

const clearSession = () => {
  localStorage.setItem("session", false);
  localStorage.removeItem("user-token");
};

const baseURL = "https://ticketing-backend-xhyn.onrender.com";

export { getToken, clearSession, baseURL };
