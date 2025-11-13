import { useGetUserBookings } from "../api/queries/bookingQueries";
import { userNavigation } from "../config/userNavigation";
import RetractingSideBar from "../ui/RetractingSideBar";
// import GuideSections from "../ui/guide/GuideSections";
// import AdminSections from "../ui/admin/AdminSections";
// import UserSections from "../ui/user/UserSections";
import type { User } from "../config/schema";

import { createRef, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";

export default function UserOverview() {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useOutletContext<{ user: User }>();
  const { data: userBookings } = useGetUserBookings(user?._id || "");

  const userSections = userNavigation[user?.role || "user"];

  const sectionRefs = useMemo(() => {
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {};
    userSections.forEach((section) => {
      refs[section.id] = createRef<HTMLDivElement | null>();
    });
    return refs;
  }, []);

  const bookingsExist = userBookings != undefined;
  let userBookingsAmount;
  if (bookingsExist) {
    userBookingsAmount = userBookings.length;
  }

  // const example = userNavigation["admin"][4].id;
  // console.log(example.replace(/\s/g, ""));

  // console.log("role", user?.role); //renders twice but maybe thats because its in development

  return (
    // h-[calc(100vh-70px)]
    <section className="z-10 mt-[70px] flex w-screen bg-mainBg pb-10 pt-4">
      <RetractingSideBar
        className="sticky top-[70px] h-[388px] shrink-0 overflow-hidden rounded-r-2xl bg-white p-2"
        // active={active}
        sections={userSections}
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
        {userSections.map((section) => {
          const SectionComponent = section.Component;
          return <SectionComponent key={section.id} {...section} />;
        })}
        {/* {user.role === "admin" && (
          <AdminSections
            sectionRefs={sectionRefs}
            userSections={userSections}
            user={user}
          />
        )}
        {user.role === "user" && (
          <UserSections
            sectionRefs={sectionRefs}
            userSections={userSections}
            user={user}
          />
        )}
        {user.role === "guide" && (
          <GuideSections
            sectionRefs={sectionRefs}
            userSections={userSections}
            user={user}
          />
        )} */}
      </motion.div>
    </section>
  );
}
