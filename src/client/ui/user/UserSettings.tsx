import PasswordForm from "../../components/forms/PasswordForm";
import type { RefObject } from "react";

interface SettingsProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  id: string;
}
export default function UserSettings({ sectionRef, id }: SettingsProps) {
  return (
    <article
      id={id}
      ref={sectionRef}
      className="flex w-full scroll-mt-24 flex-col gap-5 text-black"
    >
      <h1 className="user-section-primary">Settings</h1>
      <PasswordForm />
    </article>
  );
}
