import UserProfile from "../user/UserProfile";
import UserSettings from "../user/UserSettings";
import type { User } from "../../config/schema";
import type { Section } from "../SectionNavigator";
import EditTours from "../../components/admin/EditTours";
import AllReviews from "../../components/admin/AllReviews";
import AllBookings from "../../components/admin/AllBookings";
import AllUsers from "../../components/admin/AllUsers";

interface AdminSectionsProps {
  sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>>;
  userSections: Section[];
  user: User;
}
export default function AdminSections({
  userSections,
  user,
  sectionRefs,
}: AdminSectionsProps) {
  return (
    <>
      <UserProfile
        id={userSections[0].id}
        user={user}
        sectionRef={sectionRefs["Profile"]}
        className="flex scroll-mt-28 flex-col gap-5 text-black"
      />
      <AllUsers
        id={userSections[1].id}
        sectionRef={sectionRefs["Bookings"]}
        className="flex scroll-mt-24 flex-col gap-5"
      />
      <AllBookings
        id={userSections[2].id}
        sectionRef={sectionRefs["Bookings"]}
        className="flex scroll-mt-24 flex-col gap-5"
      />
      <AllReviews
        id={userSections[3].id}
        sectionRef={sectionRefs["Reviews"]}
        className="flex scroll-mt-24 flex-col gap-5"
      />
      <EditTours
        id={userSections[4].id}
        sectionRef={sectionRefs["Edit Tours"]}
        className="flex w-full scroll-mt-24 flex-col gap-5 text-black"
      />
      <UserSettings
        id={userSections[5].id}
        sectionRef={sectionRefs["Settings"]}
        className="flex w-full scroll-mt-24 flex-col gap-5 text-black"
      />
    </>
  );
}
