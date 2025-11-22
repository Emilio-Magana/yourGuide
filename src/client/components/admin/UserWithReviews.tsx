import { useGetUserReviews } from "../../api/queries/reviewQueries";
import { useDeleteUser } from "../../api/queries/userQueries";
import UserReviewsDB from "../../ui/admin/UserReviewsDB";
import type { Review, User } from "../../config/schema";
import EditUserModal from "../admin/EditUserModal";
import UserAccordion from "../UserAccordion";

import { useState } from "react";

export function UserWithReviews({ user }: { user: User }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { data: reviews } = useGetUserReviews(user._id);
  const deleteUserMutation = useDeleteUser();

  const handleDelete = async () => {
    try {
      await deleteUserMutation.mutateAsync(user._id);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="bg-mainBg">
      <UserAccordion
        user={user}
        setIsEditing={setIsEditing}
        setShowDeleteConfirm={setShowDeleteConfirm}
      >
        <UserReviewsDB reviews={reviews as Review[]} />
      </UserAccordion>
      {isEditing && (
        <EditUserModal
          setIsEditing={setIsEditing}
          user={user}
          onClose={() => setIsEditing(false)}
        />
      )}

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
