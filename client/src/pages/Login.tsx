import { useState } from "react";
import { useLogin } from "./../api/queries"; // adjust path as needed

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginMutation.mutateAsync({ email, password });
      // Login successful - you might want to redirect or show success message
      console.log("Login successful!");
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-28 mt-52 max-w-md space-y-4 rounded-2xl border p-7 shadow-lg"
    >
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-white"
        >
          Email
        </label>
        <input
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
        <label
          htmlFor="password"
          className="mb-1 block text-sm font-medium text-white"
        >
          Password
        </label>
        <input
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
        className="w-full rounded-md bg-blue-600 px-4 py-2 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
