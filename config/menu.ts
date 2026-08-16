import {
  LayoutDashboard,
  Users,
  FolderKanban,
  BarChart3,
  Settings,
  User,
  BriefcaseBusiness,
  BookUser,
} from "lucide-react";
import { PERMISSIONS } from "./const";

const menus = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    permission: PERMISSIONS.USERS_VIEW
  },
  {
    title: "Projects",
    icon: FolderKanban,
    href: "/project",
    permission: PERMISSIONS.PROJECTS_VIEW,
    children: [
      {
        title: "Add New Project",
        href: "/project/add",
        permission: PERMISSIONS.PROJECTS_CREATE,
      },
    ],
  },
  {
    title: "User",
    href: "/user",
    icon: User,
    permission: PERMISSIONS.USERS_VIEW,
    children: [
      {
        title: "Add New User",
        href: "/user/add",
        permission: PERMISSIONS.USERS_CREATE,
      },
    ],
  },
  {
    title: "Designation",
    href: "/designation",
    icon: BriefcaseBusiness,
    permission: PERMISSIONS.ROLES_VIEW,
    children: [
      {
        title: "Add New Designation",
        href: "/designation/add",
        permission: PERMISSIONS.ROLES_CREATE,
      },
    ],
  },
  {
    title: "Team",
    href: "/team",
    icon: Users,
    permission: PERMISSIONS.TEAMS_VIEW,
    children: [
      {
        title: "Add New Team",
        href: "/team/add",
        permission: PERMISSIONS.TEAMS_CREATE,
      },
    ],
  },
  {
    title: "Client",
    href: "/client",
    icon: BookUser,
    permission: PERMISSIONS.CLIENTS_VIEW,
    children: [
      {
        title: "Add New Client",
        href: "/client/add",
        permission: PERMISSIONS.CLIENTS_CREATE,
      },
    ],
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
    permission: PERMISSIONS.USERS_VIEW,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    permission: PERMISSIONS.USERS_VIEW,
  },
];
export default menus;