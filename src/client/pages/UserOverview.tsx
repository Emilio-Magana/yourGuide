import { useGetUserBookings } from "../api/queries/bookingQueries";
import { userNavigation } from "../config/userNavigation";
import RetractingSideBar from "../ui/RetractingSideBar";

import type { User } from "../config/schema";

import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { refGenerator } from "../utils/refGenerator";

export default function UserOverview() {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useOutletContext<{ user: User }>();
  const { data: bookings } = useGetUserBookings(user?._id || "");
  let bookingLength: number = 0;

  if (bookings && bookings.length > 0) bookingLength = bookings.length ?? 1;

  const userSections = userNavigation[user?.role || "user"];

  const sectionRefs = useMemo(() => refGenerator(userSections), [userSections]);

  return (
    // h-[calc(100vh-70px)]
    <section className="z-30 mt-[70px] flex w-screen bg-mainBg pb-10 pt-4">
      <div className="relative">
        <div className="sticky top-0 z-30 box-border h-5 bg-mainBg" />

        <RetractingSideBar
          className="sticky top-[10px] z-40 h-[388px] shrink-0 overflow-hidden rounded-r-2xl bg-white p-2"
          // active={active}
          sections={userSections}
          sectionRefs={sectionRefs}
          numBookings={bookingLength} //not sure if this works quite yet...
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          user={user}
        />
      </div>
      <motion.div
        layout
        key="dashboard"
        className="z-30 -ml-[1px] flex w-screen flex-col gap-7 bg-mainBg p-4 text-primary"
      >
        {userSections.map((section) => {
          const SectionComponent = section.component;
          const sectionId = section.id.replace(/\s/g, "");
          return (
            <SectionComponent
              key={section.id}
              {...section}
              id={sectionId}
              sectionRefs={sectionRefs}
              userSections={userSections}
              className=""
              user={user}
            />
          );
        })}
      </motion.div>
    </section>
  );
}
