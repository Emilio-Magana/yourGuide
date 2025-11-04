import RetractingSideBar from "../components/RetractingSideBar";
import type { Section } from "../ui/SectionNavigator";
import Bookings from "../components/Bookings";
import Settings from "../components/Settings";
import Profile from "../components/Profile";
import Reviews from "../components/Reviews";
import { useAuth } from "../api/queries";

import { createRef, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { FaCalendarCheck } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdReviews } from "react-icons/md";

const userOverviewSections: Section[] = [
  { id: "Profile", icon: CgProfile },
  { id: "Bookings", icon: FaCalendarCheck },
  { id: "Reviews", icon: MdReviews },
  { id: "Settings", icon: IoMdSettings },
];

export default function UserOverview() {
  const { data: user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

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
        className="sticky top-[70px] h-96 shrink-0 bg-white p-2"
        // active={active}
        sections={userOverviewSections}
        sectionRefs={sectionRefs}
        numBookings={3}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        user={user}
      />
      <motion.div
        layout
        key="dashboard"
        className="-ml-[1px] flex w-screen flex-col gap-7 p-4 text-primary"
      >
        <Profile
          pfp={user?.photo}
          userName={user.name}
          userEmail={user.email}
          id={userOverviewSections[0].id}
          sectionRef={sectionRefs["Profile"]}
          className="flex scroll-mt-28 flex-col gap-5"
        />
        <Bookings
          id={userOverviewSections[1].id}
          sectionRef={sectionRefs["Bookings"]}
          className="scroll-mt-24"
        />
        <Reviews
          id={userOverviewSections[2].id}
          sectionRef={sectionRefs["Reviews"]}
          className="scroll-mt-24"
        />
        <Settings
          id={userOverviewSections[3].id}
          sectionRef={sectionRefs["Settings"]}
          className="scroll-mt-24"
        />
      </motion.div>
    </section>
  );
}
