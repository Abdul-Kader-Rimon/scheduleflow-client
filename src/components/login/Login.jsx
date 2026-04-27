import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SITE_URL}/api/users/login`,
        form
      );

      alert("Login Successful!");
      console.log(res.data);

      
      localStorage.setItem("user", JSON.stringify(res.data.user));

    } catch (error) {
      alert("Login Failed!");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            className="w-full border p-2 rounded"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="w-full border p-2 rounded"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            type="submit"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
};

export default Login;