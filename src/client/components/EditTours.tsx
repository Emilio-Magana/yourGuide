import type { RefObject } from "react";

interface EditToursProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  className: string;
  id: string;
}

export default function EditTours({
  sectionRef,
  id,
  className,
}: EditToursProps) {
  return (
    <article id={id} ref={sectionRef} className={className}>
      <h1 className="font-semibold duration-300">Edit Tours</h1>
    </article>
  );
}
