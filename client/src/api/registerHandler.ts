export const registerHandler = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
) => {
  const response = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    }),
  });
  return response;
};
