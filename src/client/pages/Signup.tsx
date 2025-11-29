import SignUpForm from "../components/forms/SignUpForm";

export default function Signup() {
  return (
    <section className="flex flex-col justify-between gap-5 place-self-center">
      <h1 className="text-2xl font-medium text-primary">Sign Up</h1>
      <SignUpForm />
      <div
        key="securityTips"
        className="flex flex-col gap-2 rounded-lg border border-sky-200 bg-sky-50 p-4 shadow-lg"
      >
        <h3 className="text-sm font-semibold text-sky-950">Security Tips</h3>
        <ul className="ml-4 list-disc space-y-1 text-sm text-sky-500">
          <li>Use a strong, unique password</li>
          <li>
            Include uppercase (A-Z), lowercase (a-z), <br />
            numbers (0-9), and Special Character (!@#$%^&*)
          </li>
          <li>Avoid using personal information</li>
          <li>Don't reuse passwords from other accounts</li>
        </ul>
      </div>
    </section>
  );
}
