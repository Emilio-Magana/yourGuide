import type { RefObject } from "react";
// import type { User } from "../config/schema";

interface AllBookingsProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  className: string;
  id: string;
  //   users: User[];
}

export default function AllBookings({
  sectionRef,
  className,
  id,
}: AllBookingsProps) {
  return (
    <article id={id} ref={sectionRef} className={className}>
      <h1 className="font-semibold duration-300">All Bookings</h1>
    </article>
  );
}
