import UserProfile from "../components/UserProfile";
import UserBookings from "../components/UserBookings";
import UserReviews from "../components/UserReviews";
import UserSettings from "../components/UserSettings";
import type { User } from "../config/schema";
import type { Section } from "./SectionNavigator";

interface UserSectionsProps {
  sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>>;
  sections: Section[];
  user: User;
}
export default function UserSections({
  sections,
  user,
  sectionRefs,
}: UserSectionsProps) {
  return (
    <>
      <UserProfile
        id={sections[0].id}
        user={user}
        sectionRef={sectionRefs["Profile"]}
        className="flex scroll-mt-28 flex-col gap-5 text-black"
      />
      <UserBookings
        id={sections[1].id}
        user={user}
        sectionRef={sectionRefs["Bookings"]}
        className="flex scroll-mt-24 flex-col gap-5"
      />
      <UserReviews
        id={sections[2].id}
        user={user}
        sectionRef={sectionRefs["Reviews"]}
        className="flex scroll-mt-24 flex-col gap-5"
      />
      <UserSettings
        id={sections[4].id}
        sectionRef={sectionRefs["Settings"]}
        className="flex w-full scroll-mt-24 flex-col gap-5 text-black"
      />
    </>
  );
}
