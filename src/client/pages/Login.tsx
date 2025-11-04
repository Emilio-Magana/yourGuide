import { useState } from "react";
import { useLogin } from "./../api/queries"; // adjust path as needed
// import { useLocation, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync({ email, password });
      // console.log("Login successful!");
    } catch (error) {
      // console.error("Login failed:", error);
    }
  };

  return (
    <section className="my-52 flex w-[450px] flex-col justify-between gap-5 place-self-center l_window:w-[900px] l_window:flex-row">
      <h1 className="text-2xl text-primary">Sign in or Create account</h1>

      <form
        onSubmit={handleSubmit}
        className="w-[450px] space-y-4 rounded-2xl border p-7 shadow-lg"
      >
        <div>
          <input
            placeholder="Email address"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            disabled={loginMutation.isPending}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            disabled={loginMutation.isPending}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loginMutation.error && (
          <div className="text-sm text-red-600">
            Login failed. Please check your credentials.
          </div>
        )}

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-primary hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}
