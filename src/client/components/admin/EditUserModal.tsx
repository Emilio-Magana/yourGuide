import { useState } from "react";
import type { User, UserRoles } from "../../config/schema";
import { useUpdateUser } from "../../api/queries/userQueries";
import { BsX } from "react-icons/bs";

export default function EditUserModal({
  onClose,
  user,
  setIsEditing,
}: {
  onClose: () => void;
  user: User;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const updateUserMutation = useUpdateUser();
  const [editData, setEditData] = useState<{
    name: string;
    email: string;
    role: UserRoles;
  }>({
    name: user.name,
    email: user.email,
    role: user.role || "user",
  });

  const handleUpdate = async () => {
    try {
      await updateUserMutation.mutateAsync({
        id: user._id,
        data: editData,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-black">
      <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Update User</h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-gray-100">
            <BsX size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            className="input"
            placeholder="Name"
          />
          <input
            type="email"
            value={editData.email}
            onChange={(e) =>
              setEditData({ ...editData, email: e.target.value })
            }
            className="input"
            placeholder="Email"
          />
          <select
            value={editData.role}
            onChange={(e) =>
              setEditData({ ...editData, role: e.target.value as UserRoles })
            }
            className="input"
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
            onClick={handleUpdate}
            disabled={updateUserMutation.isPending}
            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {updateUserMutation.isPending ? "Updating..." : "Update User"}
          </button>
        </div>
      </div>
    </div>
  );
}
