import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ email, password });
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // Redirect to the support page on successful login
        navigate("/support");
      } else {
        setError("Failed to log in. Please check your credentials.");
      }

      console.log(response.data);
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Failed to log in. Please check your credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl shadow-emerald-800/35 pt-0">
      <div className="bg-emerald-600 rounded-t-lg">
        <h1 className="text-xl mb-6 py-4 px-10 text-white">Support Portal</h1>
      </div>
      <div className="px-8 py-10 pt-4">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-black/50 text-xs uppercase font-bold mb-2"
            >
              Your Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              name="email"
              className="w-80 px-4 py-3 border rounded text-black placeholder:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-black/50 text-xs uppercase font-bold mb-2"
            >
              Enter your Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              className="w-80 px-4 py-3 border rounded text-black placeholder:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-8">
            <button
              className="bg-emerald-600 text-white px-4 py-3 rounded hover:bg-emerald-700 shadow-md shadow-emerald-800/25 font-semibold"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
