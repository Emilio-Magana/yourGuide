import { useGetUserBookings } from "../../api/queries/bookingQueries";
import type { UserSection } from "../SectionNavigator";
import UserReviewCard from "./UserReviewCard";

export default function UserBookings({ sectionRef, id, user }: UserSection) {
  const { data: bookings } = useGetUserBookings(user?._id || "");
  // figure out booking data type

  return (
    <article
      id={id}
      ref={sectionRef}
      className="flex scroll-mt-7 flex-col gap-5"
    >
      <h1 className="user-section-header">Bookings</h1>
      {bookings && bookings.length > 0 ? (
        bookings.map((booking: any) => (
          <UserReviewCard
            _id={booking.tour._id}
            review={booking.review}
            name={booking.tour.name}
            imageCover={booking.tour.imageCover}
          />
        ))
      ) : (
        <h2 className="overflow-hidden rounded-2xl bg-white px-6 py-4 text-black">
          No Bookings Yet!
        </h2>
      )}
    </article>
  );
}
