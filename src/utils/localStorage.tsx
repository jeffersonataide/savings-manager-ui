export const setLocalJWT = (jwt: string) => {
  localStorage.setItem("jwt", jwt);
};

export const getLocalJWT = () => {
  return localStorage.getItem("jwt");
};

export const removeLocalJWT = () => {
  localStorage.removeItem("jwt");
};
