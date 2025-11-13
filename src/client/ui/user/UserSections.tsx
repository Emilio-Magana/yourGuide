import UserProfile from "../user/UserProfile";
import UserBookings from "../user/UserBookings";
import UserReviews from "../user/UserReviews";
import UserSettings from "../user/UserSettings";
import type { User } from "../../config/schema";
import type { Section } from "../SectionNavigator";

interface UserSectionsProps {
  sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>>;
  userSections: Section[];
  user: User;
}
export default function UserSections({
  userSections,
  user,
  sectionRefs,
}: UserSectionsProps) {
  return (
    <>
      <UserProfile
        id={userSections[0].id}
        user={user}
        sectionRef={sectionRefs[1]}
        className="flex scroll-mt-28 flex-col gap-5 text-black"
      />
      <UserBookings
        id={userSections[1].id}
        user={user}
        sectionRef={sectionRefs["Bookings"]}
        className="flex scroll-mt-24 flex-col gap-5"
      />
      <UserReviews
        id={userSections[2].id}
        user={user}
        sectionRef={sectionRefs["Reviews"]}
        className="flex scroll-mt-24 flex-col gap-5"
      />
      <UserSettings
        id={userSections[3].id}
        sectionRef={sectionRefs["Settings"]}
        className="flex w-full scroll-mt-24 flex-col gap-5 text-black"
      />
    </>
  );
}
