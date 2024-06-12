import React from "react";

const Searchbar = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //   email: email,
          //   password: password,
        }),
      });
      //   if (response.ok) {
      //     navigate("/");
      //   }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form
        className="flex items-center mx-12 my-12"
        onSubmit={handleSubmit}
        action="/search"
        method="post"
      >
        <label className="text-2xl mr-6" htmlFor="search">
          Search
        </label>
        <input
          className="rounded-xl py-2 px-4 w-full"
          type="text"
          id="search"
          name="search"
          placeholder="eg Harry Potter"
        />
      </form>
    </div>
  );
};

export default Searchbar;
