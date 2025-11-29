import { type RefObject } from "react";

interface JobsProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  id: string;
}

export default function GuideJobs({ sectionRef, id }: JobsProps) {
  return (
    <article
      id={id}
      ref={sectionRef}
      className="flex scroll-mt-24 flex-col gap-5"
    >
      <h1 className="user-section-primary">Your Tasks</h1>
    </article>
  );
}
