import { useSignUserUp } from "../../api/queries/userQueries";

import { FaCheckDouble } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import { useState } from "react";
import { containsAllCharacterTypes } from "../../utils/constainsAllCharacterTypes";

export default function SignUpForm() {
  const createUserMutation = useSignUserUp();
  const [message, setMessage] = useState({ type: "", text: "" });
  const [userData, setUserData] = useState({
    name: "",
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
      setMessage({ type: "success", text: "User created successfully!" });

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

  const isPasswordLongEnough = userData.password.length < 8 ? false : true;
  const isAllCharacters = containsAllCharacterTypes(userData.password);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
      {message.text && (
        <div
          className={`mb-6 flex items-start gap-3 rounded-lg p-4 ${
            message.type === "success"
              ? "border border-green-200 bg-green-50 text-green-800"
              : "border border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {message.type === "success" ? (
            <FaCheckDouble className="mt-0.5 h-5 w-5 flex-shrink-0" />
          ) : (
            <BsX className="mt-0.5 h-5 w-5 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}
      <form className="w-[450px] space-y-4 rounded-2xl border p-7 shadow-lg">
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleInputChange}
          placeholder="Enter your username"
          className="input"
        />
        <input
          type="text"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          placeholder="Enter your Email"
          className="input"
        />
        <input
          type="text"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          placeholder="Enter your Password"
          className="input"
        />
        {(!isAllCharacters || !isPasswordLongEnough) && (
          <p className="mt-2 flex items-center gap-1 text-sm text-red-600">
            Password does not meet security requirements
          </p>
        )}
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
          {createUserMutation.isPending ? "Signing up new user..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
