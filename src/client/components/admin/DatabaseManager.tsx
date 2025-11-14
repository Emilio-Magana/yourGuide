import { useGetUserReviews } from "../../api/queries/reviewQueries";
import { useGetAllUsers } from "../../api/queries/userQueries";
import type { UserSection } from "../../ui/SectionNavigator";

export default function DatabaseManager({ sectionRef, id }: UserSection) {
  const { data: users } = useGetAllUsers();

  return (
    <article
      id={id}
      ref={sectionRef}
      className="flex scroll-mt-24 flex-col gap-5"
    >
      <h1 className="font-semibold duration-300">Data Management</h1>
      <div className="grid grid-cols-4 gap-1">
        {users && users.length > 0 ? (
          users.map((user) => <UserWithReviews key={user._id} user={user} />)
        ) : (
          <h2>No Users Yet!</h2>
        )}
      </div>
    </article>
  );
}

function UserWithReviews({ user }: { user: any }) {
  const { data: userReviews } = useGetUserReviews(user._id);

  return (
    <div className="space-y-4 rounded-2xl border p-4">
      <h1>{user.name}</h1>
      {userReviews && userReviews.length > 0 ? (
        userReviews.map((review) => (
          <div key={review._id}>
            <p>{review.tour.name}</p>
            <p>{review.review}</p>
          </div>
        ))
      ) : (
        <h2>User has not made any reviews yet!</h2>
      )}
    </div>
  );
}
