import { FaCalendarCheck, FaEdit, FaDatabase } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { MdReviews } from "react-icons/md";

import DatabaseManager from "../components/admin/DatabaseManager";
import EditTours from "../components/admin/EditTours";
import GuideJobs from "../components/guide/GuideJobs";
import type { UserOptions } from "../ui/OptionTypes";
import UserSettings from "../ui/user/UserSettings";
import UserBookings from "../ui/user/UserBookings";
import type { UserRoles } from "../config/schema";
import UserReviews from "../ui/user/UserReviews";
import UserProfile from "../ui/user/UserProfile";

const Profile = {
  id: "Profile",
  href: "/users/:userId/dashboard#Profile",
  Icon: BsPersonCircle,
  component: UserProfile,
};
const Settings = {
  id: "Settings",
  href: "/users/:userId/dashboard#Settings",
  Icon: IoMdSettings,
  component: UserSettings,
};

export const userNavigation: UserOptions<UserRoles> = {
  user: [
    Profile,
    {
      id: "Bookings",
      href: "/users/:userId/dashboard#Bookings",
      Icon: FaCalendarCheck,
      component: UserBookings,
    },
    {
      id: "Reviews",
      href: "/users/:userId/dashboard#Reviews",
      Icon: MdReviews,
      component: UserReviews,
    },
    Settings,
  ],
  admin: [
    Profile,
    {
      id: "Database",
      href: "/users/:userId/dashboard#Database",
      Icon: FaDatabase,
      component: DatabaseManager,
    },
    {
      id: "Tour Editor",
      href: "/users/:userId/dashboard#TourEditor",
      Icon: FaEdit,
      component: EditTours,
    },
    Settings,
  ],
  guide: [
    Profile,
    {
      id: "Your Tasks",
      href: "/users/:userId/dashboard#YourTasks",
      Icon: FaEdit,
      component: GuideJobs,
    },
    Settings,
  ],
};
