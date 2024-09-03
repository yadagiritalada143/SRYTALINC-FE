import { IconUserEdit, IconUsersPlus } from "@tabler/icons-react";

export const adminNavLinks = [
  { url: "admin/dashboard", icon: IconUsersPlus, name: "Add Employee" },
  {
    url: "admin/dashboard/employees",
    icon: IconUserEdit,
    name: "Edit Employee",
  },
];
