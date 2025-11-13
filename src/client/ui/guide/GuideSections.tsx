import UserProfile from "../user/UserProfile";
import UserSettings from "../user/UserSettings";
import type { User } from "../../config/schema";
import type { Section } from "../SectionNavigator";
import GuideJobs from "../../components/guide/GuideJobs";

interface GuideSectionsProps {
  sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>>;
  userSections: Section[];
  user: User;
}
export default function GuideSections({
  userSections,
  user,
  sectionRefs,
}: GuideSectionsProps) {
  return (
    <>
      <UserProfile
        id={userSections[0].id}
        user={user}
        sectionRef={sectionRefs["Profile"]}
        className="flex scroll-mt-28 flex-col gap-5 text-black"
      />
      <GuideJobs
        id={userSections[1].id}
        user={user}
        sectionRef={sectionRefs["Bookings"]}
        className="flex scroll-mt-24 flex-col gap-5"
      />

      <UserSettings
        id={userSections[2].id}
        sectionRef={sectionRefs["Settings"]}
        className="flex w-full scroll-mt-24 flex-col gap-5 text-black"
      />
    </>
  );
}
