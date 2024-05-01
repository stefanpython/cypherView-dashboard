import { FormEvent, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setIsLoggedIn } = useAuth();

  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["token"]);

  // Check if the token exists in cookies when the component mounts
  useEffect(() => {
    const token = cookies.token;
    if (token) {
      setIsLoggedIn(true);
    }
  }, [cookies.token, setIsLoggedIn, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Perform login logic
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Check if response is ok
      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message);
        return;
      }

      // Handle successful login
      const data = await res.json();

      // Set token in cookies
      const { token } = data;
      setCookies("token", token, { path: "/" });

      // Set auth context hook to true
      setIsLoggedIn(true);

      navigate("/dashboard");
    } catch (error) {
      console.log("Login failed", error);
    }
  };

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32 shadow-lg">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-400 p-3 md:h-36">
          <div className="w-32 text-white md:w-36 flex items-center">
            <img className="w-8 mr-1" src="./layout.png" alt="logo" />
            <p className="text-3xl">CypherView</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <h1 className={` mb-3 text-2xl`}>Please log in to continue.</h1>
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      required
                      minLength={3}
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                </div>
              </div>

              <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
              >
                {error && (
                  <div className="bg-red-400 text-white w-fit text-sm py-1 px-3 rounded-sm mt-4 rounded-r-md">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button type="submit" className="btn w-full bg-blue-400 text-white">
            Log in
          </button>
        </form>
      </div>
    </main>
  );
}
