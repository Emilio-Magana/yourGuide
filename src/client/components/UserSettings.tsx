import PasswordForm from "./PasswordForm";
import type { RefObject } from "react";

interface SettingsProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  className: string;
  id: string;
}
export default function UserSettings({
  sectionRef,
  id,
  className,
}: SettingsProps) {
  return (
    <article id={id} ref={sectionRef} className={className}>
      <h1 className="font-semibold text-primary duration-300">Settings</h1>
      <PasswordForm />
    </article>
  );
}
