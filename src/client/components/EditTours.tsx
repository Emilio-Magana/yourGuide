import { useState, type RefObject } from "react";
// import TourForm from "./TourForm";
import { useGetTours } from "../api/queries";
import TourCardMini from "../ui/TourCardMini";
import type { Tour } from "../config/schema";
import { FaPlus } from "react-icons/fa";
import TourForm from "./TourForm";

interface EditToursProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  className: string;
  id: string;
}

export default function EditTours({
  sectionRef,
  className,
  id,
}: EditToursProps) {
  const [tourId, setTourId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { data: tours } = useGetTours();
  const toursExist = tours != undefined;
  let tourCount;
  if (toursExist) {
    tourCount = tours.length;
  } else {
    tourCount = 0;
  }
  const handleOnClick = (tourId?: string) => {
    setIsEditing(true);
    if (tourId) setTourId(tourId);
  };

  console.log("editing: ", isEditing, "tourId: ", tourId);

  return (
    <article id={id} ref={sectionRef} className={className}>
      <h1 className="font-semibold text-primary duration-300">Edit Tours</h1>
      {isEditing ? (
        <TourForm
          setIsEditing={setIsEditing}
          tourId={tourId}
          isEditing={isEditing}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        />
      ) : (
        <div
          className={`grid grid-cols-1 gap-3 duration-300 xs_window:grid-cols-2 m_window:grid-cols-3 l_window:grid-cols-4 xl_window:grid-cols-5 xxl_window:grid-cols-6`}
        >
          <button
            onClick={() => handleOnClick("")}
            className="relative h-40 overflow-hidden rounded-2xl border border-primary bg-mainBg duration-300 hover:-translate-y-1 hover:cursor-pointer hover:drop-shadow-[0_4px_1.2px_var(--primary)]"
          >
            <FaPlus
              size={24}
              className="absolute inset-0 place-self-center text-primary"
            />
          </button>
          {toursExist ? (
            tourCount > 0 ? (
              tours.map((tour: Tour, ind: number) => (
                <TourCardMini
                  {...tour}
                  key={ind}
                  onClick={() => handleOnClick(tour._id)}
                  className="relative h-40 justify-self-stretch overflow-hidden rounded-2xl duration-300 hover:-translate-y-1 hover:cursor-pointer hover:drop-shadow-[0_4px_1.2px_var(--primary)]"
                />
              ))
            ) : (
              <h2>No Reviews Yet!</h2>
            )
          ) : (
            <h2>No Reviews Yet!</h2>
          )}
        </div>
      )}
    </article>
  );
}
