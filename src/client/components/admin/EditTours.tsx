import { FaPlus } from "react-icons/fa";
import { useState } from "react";

import type { UserSection } from "../../ui/SectionNavigator";
import { useGetTours } from "../../api/queries/tourQueries";
import TourCardMini from "../../ui/tour/TourCardMini";
import TourForm from "../forms/TourForm";

export default function EditTours({ sectionRef, id }: UserSection) {
  const [isEditing, setIsEditing] = useState(false);
  const [tourId, setTourId] = useState("");
  const { data: tours } = useGetTours();

  const handleOnClick = (tourId?: string) => {
    setIsEditing(true);
    if (tourId) setTourId(tourId);
  };

  return (
    <article
      id={id}
      ref={sectionRef}
      className="flex w-full scroll-mt-7 flex-col gap-5 text-black"
    >
      <h1 className="user-section-header">Edit Tours</h1>
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
          {tours && tours.length > 0 ? (
            tours.map((tour) => (
              <TourCardMini
                {...tour}
                key={tour.name}
                onClick={() => handleOnClick(tour._id)}
              />
            ))
          ) : (
            <h2>No Tours Yet!</h2>
          )}
        </div>
      )}
    </article>
  );
}
