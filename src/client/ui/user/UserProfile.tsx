import ProfileForm from "../../components/forms/ProfileForm";
import type { UserSection } from "../SectionNavigator";
import type { User } from "../../config/schema";

export default function UserProfile({ user, id, sectionRef }: UserSection) {
  return (
    <article
      id={id}
      ref={sectionRef}
      className="flex scroll-mt-3 flex-col gap-5 text-black"
    >
      <h1 className="user-section-header">Account Management</h1>
      <ProfileForm user={user as User} />
    </article>
  );
}
