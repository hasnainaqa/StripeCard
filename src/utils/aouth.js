export const loginUser = (token) => {
  localStorage.setItem("stripe", token);
};
export const logoutUser = () => {
  localStorage.removeItem("stripe");
};

export const isUserLoggedIn = () => {
  const token = localStorage.getItem("stripe");
  return token !== null;};



export const generateRandomToken = () => {
  return [...crypto.getRandomValues(new Uint8Array(16))]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};
