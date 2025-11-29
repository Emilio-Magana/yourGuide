import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <section className="flex flex-col justify-between gap-5 place-self-center l_window:w-[900px] l_window:flex-row">
      <h1 className="text-2xl font-medium text-primary">
        Sign in or Create account
      </h1>

      <LoginForm />
      <div className="flex justify-end text-green-700">
        <Link
          to="/signup"
          className="rounded-2xl border border-green-700 py-1 duration-700 hover:bg-green-700"
        >
          <span className="px-3 py-2 duration-300 hover:px-7 hover:text-white">
            Sign up
          </span>
        </Link>
      </div>
    </section>
  );
}
