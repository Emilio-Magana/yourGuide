import { useDeleteUser, useUpdateUser } from "../../api/queries/userQueries";
import { useGetUserReviews } from "../../api/queries/reviewQueries";
import type { User, UserRoles } from "../../config/schema";

import { FaEdit, FaStar } from "react-icons/fa";
import { BsSave, BsX } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";

export function UserWithReviews({ user }: { user: User }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { data: reviews } = useGetUserReviews(user._id);
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();
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

  const handleDelete = async () => {
    try {
      await deleteUserMutation.mutateAsync(user._id);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const getRoleBadgeColor = (role: UserRoles) => {
    const colors = {
      admin: "bg-purple-100 text-purple-800",
      // "lead-guide": "bg-blue-100 text-blue-800",
      guide: "bg-green-100 text-green-800",
      user: "bg-gray-100 text-gray-800",
    };
    return colors[role as keyof typeof colors] || colors.user;
  };

  return (
    <div className="h-96 overflow-scroll rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        {isEditing ? (
          <div className="flex-1 space-y-2">
            <input
              type="text"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
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
        ) : (
          <div>
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
            <span
              className={`mt-1 inline-block rounded px-2 py-1 text-xs ${getRoleBadgeColor(user.role || "user")}`}
            >
              {user.role || "user"}
            </span>
          </div>
        )}

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                disabled={updateUserMutation.isPending}
                className="rounded-lg p-2 text-green-600 transition-colors hover:bg-green-50"
              >
                <BsSave size={20} />
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditData({
                    name: user.name,
                    email: user.email,
                    role: user.role,
                  });
                }}
                className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
              >
                <BsX size={20} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
              >
                <FaEdit size={20} />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
              >
                <FiTrash2 size={20} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="border-t pt-3">
        <h3 className="mb-2 text-sm font-medium text-gray-700">Reviews:</h3>
        {reviews && reviews.length > 0 ? (
          <div className="space-y-3">
            {reviews.map((review) => (
              <div key={review._id} className="rounded bg-gray-50 p-3">
                <p className="text-sm font-medium text-blue-600">
                  {review.tour?.name || "Unknown Tour"}
                </p>
                <p className="mt-1 text-sm text-gray-700">{review.review}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        className={`h-3 w-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    {review.rating}/5
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            User has not made any reviews yet!
          </p>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold">Delete User</h3>
            <p className="mb-4 text-gray-600">
              Are you sure you want to delete {user.name}? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteUserMutation.isPending}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleteUserMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
