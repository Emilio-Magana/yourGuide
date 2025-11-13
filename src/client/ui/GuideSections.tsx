import UserProfile from "./generalUser/UserProfile";
import UserSettings from "./generalUser/UserSettings";
import type { User } from "../config/schema";
import type { Section } from "./SectionNavigator";
import GuideJobs from "../components/guide/GuideJobs";

interface GuideSectionsProps {
  sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>>;
  sections: Section[];
  user: User;
}
export default function GuideSections({
  sections,
  user,
  sectionRefs,
}: GuideSectionsProps) {
  return (
    <>
      <UserProfile
        id={sections[0].id}
        user={user}
        sectionRef={sectionRefs["Profile"]}
        className="flex scroll-mt-28 flex-col gap-5 text-black"
      />
      <GuideJobs
        id={sections[1].id}
        user={user}
        sectionRef={sectionRefs["Bookings"]}
        className="flex scroll-mt-24 flex-col gap-5"
      />

      <UserSettings
        id={sections[2].id}
        sectionRef={sectionRefs["Settings"]}
        className="flex w-full scroll-mt-24 flex-col gap-5 text-black"
      />
    </>
  );
}
