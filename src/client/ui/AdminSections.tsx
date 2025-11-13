import UserProfile from "./generalUser/UserProfile";
import UserSettings from "./generalUser/UserSettings";
import type { User } from "../config/schema";
import type { Section } from "./SectionNavigator";
import EditTours from "../components/admin/EditTours";
import AllReviews from "../components/admin/AllReviews";
import AllBookings from "../components/admin/AllBookings";
import AllUsers from "../components/admin/AllUsers";

interface AdminSectionsProps {
  sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>>;
  sections: Section[];
  user: User;
}
export default function AdminSections({
  sections,
  user,
  sectionRefs,
}: AdminSectionsProps) {
  console.log("inAdmin sections :", sections);
  return (
    <>
      <UserProfile
        id={sections[0].id}
        user={user}
        sectionRef={sectionRefs["Profile"]}
        className="flex scroll-mt-28 flex-col gap-5 text-black"
      />
      <AllUsers
        id={sections[1].id}
        sectionRef={sectionRefs["Bookings"]}
        className="flex scroll-mt-24 flex-col gap-5"
      />
      <AllBookings
        id={sections[2].id}
        sectionRef={sectionRefs["Bookings"]}
        className="flex scroll-mt-24 flex-col gap-5"
      />
      <AllReviews
        id={sections[3].id}
        sectionRef={sectionRefs["Reviews"]}
        className="flex scroll-mt-24 flex-col gap-5"
      />
      <EditTours
        id={sections[4].id}
        sectionRef={sectionRefs["Edit Tours"]}
        className="flex w-full scroll-mt-24 flex-col gap-5 text-black"
      />
      <UserSettings
        id={sections[5].id}
        sectionRef={sectionRefs["Settings"]}
        className="flex w-full scroll-mt-24 flex-col gap-5 text-black"
      />
    </>
  );
}
