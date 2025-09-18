export const loginUser = (token) => {
  localStorage.setItem("authToken", token);
};
export const logoutUser = () => {
  localStorage.removeItem("authToken");
};

export const isUserLoggedIn = () => {
  const token = localStorage.getItem("authToken");
  return token !== null;
};

export const generateRandomToken = () => {
  return [...crypto.getRandomValues(new Uint8Array(16))]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};
