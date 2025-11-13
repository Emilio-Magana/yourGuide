import RetractingSideBar from "../ui/RetractingSideBar";
import { useAuth, useGetUserBookings } from "../api/queries";
import type { UserSection } from "../ui/SectionNavigator";

import { createRef, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { FaCalendarCheck, FaEdit } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { MdReviews } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import type { UserRoles } from "../config/schema";
import AdminSections from "../ui/AdminSections";
import UserSections from "../ui/UserSections";
import GuideSections from "../ui/GuideSections";
import { useParams } from "react-router-dom";

const OverviewSections: UserSection<UserRoles>[] = [
  {
    user: [
      { id: "Profile", icon: BsPersonCircle },
      { id: "Bookings", icon: FaCalendarCheck },
      { id: "Reviews", icon: MdReviews },
      { id: "Settings", icon: IoMdSettings },
    ],
    admin: [
      { id: "Profile", icon: BsPersonCircle },
      { id: "All Users", icon: IoPeople },
      { id: "All Bookings", icon: FaCalendarCheck },
      { id: "All Reviews", icon: MdReviews },
      { id: "Tour Editor", icon: FaEdit },
      { id: "Settings", icon: IoMdSettings },
    ],
    guide: [
      { id: "Profile", icon: BsPersonCircle },
      { id: "Your Tasks", icon: FaEdit },
      { id: "Settings", icon: IoMdSettings },
    ],
    // "lead-guide": [
    //   { id: "Profile", icon: BsPersonCircle },
    //   { id: "Your Tasks", icon: FaEdit },
    //   { id: "Settings", icon: IoMdSettings },
    // ],
  },
];

export default function UserOverview() {
  const [isOpen, setIsOpen] = useState(true);
  const { data: user } = useAuth();
  const { data: userBookings } = useGetUserBookings(user!._id);
  const { pathname } = useParams();
  console.log("pathname", pathname);

  const sections = OverviewSections[0][user!.role];

  const sectionRefs = useMemo(() => {
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {};
    sections.forEach((section) => {
      refs[section.id] = createRef<HTMLDivElement | null>();
    });
    return refs;
  }, []);

  const bookingsExist = userBookings != undefined;
  let userBookingsAmount;
  if (bookingsExist) {
    userBookingsAmount = userBookings.length;
  }

  console.log("role", user!.role);
  console.log("sections", sections);

  return (
    // h-[calc(100vh-70px)]
    <section className="z-10 mt-[70px] flex w-screen bg-mainBg pb-10 pt-4">
      <RetractingSideBar
        className="sticky top-[70px] h-[388px] shrink-0 overflow-hidden rounded-r-2xl bg-white p-2"
        // active={active}
        sections={sections}
        sectionRefs={sectionRefs}
        numBookings={userBookingsAmount}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        user={user!}
      />
      <motion.div
        layout
        key="dashboard"
        className="-ml-[1px] flex w-screen flex-col gap-7 p-4 text-primary"
      >
        {user!.role === "admin" && (
          <AdminSections
            sectionRefs={sectionRefs}
            sections={sections}
            user={user!}
          />
        )}
        {user!.role === "user" && (
          <UserSections
            sectionRefs={sectionRefs}
            sections={sections}
            user={user!}
          />
        )}
        {user!.role === "guide" && (
          <GuideSections
            sectionRefs={sectionRefs}
            sections={sections}
            user={user!}
          />
        )}
      </motion.div>
    </section>
  );
}
