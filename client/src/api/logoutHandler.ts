export const logoutHandler = async () => {
  const response = await fetch("http://localhost:3000/logout", {
    method: "GET",
    credentials: "include",
  });
  return response;
};
