import { useGetUserBookings } from "../../api/queries/bookingQueries";
import type { User } from "../../config/schema";
import UserReviewCard from "./UserReviewCard";
import type { UserSection } from "../SectionNavigator";

interface BookingsProps extends UserSection {
  user: User;
}

export default function UserBookings({ sectionRef, id, user }: BookingsProps) {
  const { data: bookings } = useGetUserBookings(user?._id || "");
  // figure out booking data type

  return (
    <article
      id={id}
      ref={sectionRef}
      className="flex scroll-mt-24 flex-col gap-5"
    >
      <h1 className="font-semibold duration-300">Bookings</h1>
      {bookings && bookings.length > 0 ? (
        bookings.map((booking: any) => (
          <UserReviewCard
            _id={booking.tour._id}
            review={booking.review}
            name={booking.tour.name}
            imageCover={booking.tour.imageCover}
            className="relative justify-self-stretch overflow-hidden rounded-2xl duration-300 hover:scale-105"
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
