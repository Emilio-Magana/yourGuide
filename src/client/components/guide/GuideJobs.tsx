import { type RefObject } from "react";
import type { User } from "../../config/schema";

interface JobsProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  className: string;
  id: string;
  user: User;
}

export default function GuideJobs({
  sectionRef,
  className,
  id,
  user,
}: JobsProps) {
  return (
    <article id={id} ref={sectionRef} className={className}>
      <h1 className="font-semibold duration-300">Your Tasks</h1>
    </article>
  );
}
