import { useState } from "react";
import { useCreateUser } from "../../api/queries/userQueries";
import { FaCheckDouble, FaLock } from "react-icons/fa";
import { BsX } from "react-icons/bs";

export default function SignUpForm() {
  const createUserMutation = useCreateUser();
  const [message, setMessage] = useState({ type: "", text: "" });
  //   const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    setMessage({ type: "", text: "" });
  };
  const validatePasswords = () => {
    if (!userData.password) {
      setMessage({ type: "error", text: "New password is required" });
      return false;
    }
    if (userData.password.length < 8) {
      setMessage({
        type: "error",
        text: "Password must be at least 8 characters",
      });
      return false;
    }
    if (userData.password !== userData.passwordConfirm) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!validatePasswords()) return;

    try {
      await createUserMutation.mutateAsync(userData);
      setMessage({ type: "success", text: "Password updated successfully!" });

      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Failed to create user",
      });
    }
  };
  const isPasswordMatch =
    userData.password &&
    userData.passwordConfirm &&
    userData.password === userData.passwordConfirm;
  const isPasswordMismatch =
    userData.password &&
    userData.passwordConfirm &&
    userData.password !== userData.passwordConfirm;

  console.log("UserData", userData);
  return (
    <div>
      <h1>SignUpForm</h1>
      <form action="">
        <div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              placeholder="Enter your Email"
              className="input"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="text"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              placeholder="Enter your Password"
              className="input"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="text"
              name="passwordConfirm"
              value={userData.passwordConfirm}
              onChange={handleInputChange}
              className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-green-500 ${
                isPasswordMismatch
                  ? "border-red-300 bg-red-50"
                  : isPasswordMatch
                    ? "border-green-300 bg-green-50"
                    : "border-gray-300"
              }`}
              placeholder="Confirm your new password"
            />
          </div>
          {isPasswordMatch && (
            <p className="mt-2 flex items-center gap-1 text-sm text-green-600">
              <FaCheckDouble className="h-4 w-4" />
              Passwords match
            </p>
          )}
          {isPasswordMismatch && (
            <p className="mt-2 flex items-center gap-1 text-sm text-red-600">
              <BsX className="h-4 w-4" />
              Passwords do not match
            </p>
          )}
        </div>
        <button
          type="button"
          key="submitButton"
          onClick={handleSubmit}
          disabled={
            createUserMutation.isPending ||
            !userData.email ||
            !userData.password ||
            !userData.passwordConfirm
          }
          className="form-submit-button w-full"
        >
          <FaLock size={20} />
          {createUserMutation.isPending ? "Signing up new user..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
