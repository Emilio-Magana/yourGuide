import type { RefObject } from "react";
// import type { User } from "../config/schema";

interface AllUsersProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  className: string;
  id: string;
  //   users: User[];
}

export default function AllUsers({ sectionRef, className, id }: AllUsersProps) {
  return (
    <article id={id} ref={sectionRef} className={className}>
      <h1 className="font-semibold duration-300">All Users</h1>
    </article>
  );
}
