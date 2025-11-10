import RetractingSideBar from "../components/RetractingSideBar";
import type { Section } from "../ui/SectionNavigator";
import UserBookings from "../components/UserBookings";
import UserSettings from "../components/UserSettings";
import UserProfile from "../components/UserProfile";
import UserReviews from "../components/UserReviews";
import { useAuth, useGetUserBookings } from "../api/queries";

import { createRef, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { FaCalendarCheck, FaEdit } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { MdReviews } from "react-icons/md";
import EditTours from "../components/EditTours";

const userOverviewSections: Section[] = [
  { id: "Profile", icon: BsPersonCircle },
  { id: "Bookings", icon: FaCalendarCheck },
  { id: "Reviews", icon: MdReviews },
  { id: "Edit Tours", icon: FaEdit, locked: true },
  { id: "Settings", icon: IoMdSettings },
];

export default function UserOverview() {
  const { data: user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const { data: userBookings } = useGetUserBookings(user._id);
  const bookingsExist = userBookings != undefined;
  let userBookingsAmount;
  if (bookingsExist) {
    userBookingsAmount = userBookings.length;
  }

  const sectionRefs = useMemo(() => {
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {};
    userOverviewSections.forEach((section) => {
      refs[section.id] = createRef<HTMLDivElement | null>();
    });
    return refs;
  }, []);

  return (
    // h-[calc(100vh-70px)]
    <section className="z-10 mt-[70px] flex w-screen bg-mainBg pb-10 pt-4">
      <RetractingSideBar
        className="sticky top-[70px] h-[388px] shrink-0 overflow-hidden rounded-r-2xl bg-white p-2"
        // active={active}
        sections={userOverviewSections}
        sectionRefs={sectionRefs}
        numBookings={userBookingsAmount}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        user={user}
      />
      <motion.div
        layout
        key="dashboard"
        className="-ml-[1px] flex w-screen flex-col gap-7 p-4 text-primary"
      >
        <UserProfile
          pfp={user?.photo}
          userName={user.name}
          userEmail={user.email}
          id={userOverviewSections[0].id}
          sectionRef={sectionRefs["Profile"]}
          className="flex scroll-mt-28 flex-col gap-5 text-black"
        />
        <UserBookings
          id={userOverviewSections[1].id}
          sectionRef={sectionRefs["Bookings"]}
          className="flex scroll-mt-24 flex-col gap-5"
        />
        <UserReviews
          id={userOverviewSections[2].id}
          sectionRef={sectionRefs["Reviews"]}
          className="flex scroll-mt-24 flex-col gap-5"
        />
        {(user.role === "admin" || "lead-guide" || "guide") && (
          <EditTours
            id={userOverviewSections[3].id}
            sectionRef={sectionRefs["Edit Tours"]}
            className="flex w-full scroll-mt-24 flex-col gap-5"
          />
        )}
        <UserSettings
          id={userOverviewSections[4].id}
          sectionRef={sectionRefs["Settings"]}
          className="flex w-full scroll-mt-24 flex-col gap-5 text-black"
        />
      </motion.div>
    </section>
  );
}
