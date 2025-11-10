import { type RefObject } from "react";
import { useAuth, useGetUserBookings } from "../api/queries";
import UserReviewCard from "../ui/UserReviewCard";

interface BookingsProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  id: string;
  userName?: string;
  userEmail?: string;
  className: string;
}

export default function UserBookings({
  sectionRef,
  id,
  className,
}: BookingsProps) {
  const { data: user } = useAuth();
  const { data: userBookings } = useGetUserBookings(user._id);
  const bookingsExist = userBookings != undefined;

  return (
    <article id={id} ref={sectionRef} className={className}>
      <h1 className="font-semibold duration-300">Bookings</h1>
      {bookingsExist ? (
        userBookings.length > 0 ? (
          userBookings.map((booking: any, ind: React.Key) => (
            <UserReviewCard
              id={ind}
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
        )
      ) : (
        <h2 className="overflow-hidden rounded-2xl bg-white px-6 py-4 text-black">
          No Bookings Yet!
        </h2>
      )}
    </article>
  );
}
