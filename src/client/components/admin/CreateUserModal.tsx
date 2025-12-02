import { BsX } from "react-icons/bs";
import type { UserRoles } from "../../config/schema";
import { useState } from "react";
import { useCreateUser } from "../../api/queries/userQueries";

export function CreateUserModal({ onClose }: { onClose: () => void }) {
  const createUserMutation = useCreateUser();
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    role: UserRoles;
  }>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "user",
  });

  const handleSubmit = async () => {
    try {
      await createUserMutation.mutateAsync(formData);
      onClose();
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  console.log(formData);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Create New User</h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-gray-100">
            <BsX size={20} />
          </button>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          <input
            type="text"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          <input
            type="text"
            placeholder="Confirm Password"
            value={formData.passwordConfirm}
            onChange={(e) =>
              setFormData({ ...formData, passwordConfirm: e.target.value })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          />
          <select
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value as UserRoles })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="user">User</option>
            <option value="guide">Guide</option>
            <option value="lead-guide">Lead Guide</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={createUserMutation.isPending}
            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {createUserMutation.isPending ? "Creating..." : "Create User"}
          </button>
        </div>
      </div>
    </div>
  );
}
