import { FaCalendarCheck, FaEdit } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { MdReviews } from "react-icons/md";
import { IoPeople } from "react-icons/io5";

import type { UserRoles } from "../config/schema";
import type { UserOptions } from "../ui/OptionTypes";
import UserProfile from "../ui/user/UserProfile";
import UserBookings from "../ui/user/UserBookings";
import UserReviews from "../ui/user/UserReviews";
import UserSettings from "../ui/user/UserSettings";
import AllUsers from "../components/admin/AllUsers";
import AllBookings from "../components/admin/AllBookings";
import AllReviews from "../components/admin/AllReviews";
import EditTours from "../components/admin/EditTours";
import GuideJobs from "../components/guide/GuideJobs";

export const userNavigation: UserOptions<UserRoles> = {
  user: [
    {
      id: "Profile",
      href: "/users/:userId/dashboard#Profile",
      Icon: BsPersonCircle,
      Component: UserProfile,
    },
    {
      id: "Bookings",
      href: "/users/:userId/dashboard#Bookings",
      Icon: FaCalendarCheck,
      Component: UserBookings,
    },
    {
      id: "Reviews",
      href: "/users/:userId/dashboard#Reviews",
      Icon: MdReviews,
      Component: UserReviews,
    },
    {
      id: "Settings",
      href: "/users/:userId/dashboard#Settings",
      Icon: IoMdSettings,
      Component: UserSettings,
    },
  ],
  admin: [
    {
      id: "Profile",
      href: "/users/:userId/dashboard#Profile",
      Icon: BsPersonCircle,
      Component: UserProfile,
    },
    {
      id: "All Users",
      href: "/users/:userId/dashboard#All%20Users",
      Icon: IoPeople,
      Component: AllUsers,
    },
    {
      id: "All Bookings",
      href: "/users/:userId/dashboard#All%20Bookings",
      Icon: FaCalendarCheck,
      Component: AllBookings,
    },
    {
      id: "All Reviews",
      href: "/users/:userId/dashboard#All%20Reviews",
      Icon: MdReviews,
      Component: AllReviews,
    },
    {
      id: "Tour Editor",
      href: "/users/:userId/dashboard#Tour%20Editor",
      Icon: FaEdit,
      Component: EditTours,
    },
    {
      id: "Settings",
      href: "/users/:userId/dashboard#Settings",
      Icon: IoMdSettings,
      Component: UserSettings,
    },
  ],
  guide: [
    {
      id: "Profile",
      href: "/users/:userId/dashboard#Profile",
      Icon: BsPersonCircle,
      Component: UserProfile,
    },
    {
      id: "Your Tasks",
      href: "/users/:userId/dashboard#Your%20Tasks",
      Icon: FaEdit,
      Component: GuideJobs,
    },
    {
      id: "Settings",
      href: "/users/:userId/dashboard#Settings",
      Icon: IoMdSettings,
      Component: UserSettings,
    },
  ],
};
