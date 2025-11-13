import { useUpdatePassword } from "../../api/queries/userQueries";

import { FaCheckDouble, FaLock } from "react-icons/fa";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { BsX } from "react-icons/bs";

import { useState } from "react";

export default function PasswordForm() {
  const updatePasswordMutation = useUpdatePassword();
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwords, setPasswords] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    setMessage({ type: "", text: "" });
  };
  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  const validatePasswords = () => {
    if (!passwords.passwordCurrent) {
      setMessage({ type: "error", text: "Current password is required" });
      return false;
    }
    if (!passwords.password) {
      setMessage({ type: "error", text: "New password is required" });
      return false;
    }
    if (passwords.password.length < 8) {
      setMessage({
        type: "error",
        text: "Password must be at least 8 characters",
      });
      return false;
    }
    if (passwords.password !== passwords.passwordConfirm) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return false;
    }
    if (passwords.passwordCurrent === passwords.password) {
      setMessage({
        type: "error",
        text: "New password must be different from current password",
      });
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!validatePasswords()) return;
    try {
      await updatePasswordMutation.mutateAsync(passwords);
      setMessage({ type: "success", text: "Password updated successfully!" });
      setPasswords({
        passwordCurrent: "",
        password: "",
        passwordConfirm: "",
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Failed to update password",
      });
    }
  };
  const isPasswordMatch =
    passwords.password &&
    passwords.passwordConfirm &&
    passwords.password === passwords.passwordConfirm;
  const isPasswordMismatch =
    passwords.password &&
    passwords.passwordConfirm &&
    passwords.password !== passwords.passwordConfirm;
  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      {/* Header */}
      <div className="flex flex-col gap-1 bg-gradient-to-r from-headerBegBg to-headerEndBg px-6 py-5">
        <div className="flex items-center gap-2">
          <FaLock size={20} className="text-white" />
          <h1 className="text-xl font-bold text-white">Change Password</h1>
        </div>
        <p className="text-indigo-100">Keep your account secure</p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5 p-6">
        {/* Message Display */}
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

        <form className="flex flex-col gap-5">
          <div key="currentPassWord">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                name="passwordCurrent"
                autoComplete="on"
                value={passwords.passwordCurrent}
                onChange={handleInputChange}
                className="input"
                placeholder="Enter your current password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.current ? (
                  <IoMdEyeOff className="h-5 w-5" />
                ) : (
                  <IoMdEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div key="newPassWord">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                name="password"
                autoComplete="on"
                value={passwords.password}
                onChange={handleInputChange}
                placeholder="Enter your new password"
                className="input"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.new ? (
                  <IoMdEyeOff className="h-5 w-5" />
                ) : (
                  <IoMdEye className="h-5 w-5" />
                )}
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Password must be at least 8 characters long
            </p>
          </div>

          <div key="confirmNewPassWord">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                name="passwordConfirm"
                autoComplete="on"
                value={passwords.passwordConfirm}
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
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPasswords.confirm ? (
                  <IoMdEyeOff className="h-5 w-5" />
                ) : (
                  <IoMdEye className="h-5 w-5" />
                )}
              </button>
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
        </form>

        <button
          type="button"
          key="submitButton"
          onClick={handleSubmit}
          disabled={
            updatePasswordMutation.isPending ||
            !passwords.passwordCurrent ||
            !passwords.password ||
            !passwords.passwordConfirm
          }
          className="form-submit-button w-full"
        >
          <FaLock size={20} />
          {updatePasswordMutation.isPending
            ? "Updating Password..."
            : "Update Password"}
        </button>

        <div
          key="securityTips"
          className="flex flex-col gap-2 rounded-lg border border-indigo-200 bg-indigo-50 p-4"
        >
          <h3 className="text-sm font-semibold text-indigo-900">
            Security Tips
          </h3>
          <ul className="ml-4 list-disc space-y-1 text-sm text-indigo-800">
            <li>Use a strong, unique password</li>
            <li>Include uppercase, lowercase, numbers, and symbols</li>
            <li>Avoid using personal information</li>
            <li>Don't reuse passwords from other accounts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
