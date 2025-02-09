import { atom } from "recoil";

export const userDetailsAtom = atom<{
  firstName: string;
  lastName: string;
  userRole: string;
  passwordResetRequired: string;
}>({
  key: "userDetails",
  default: {
    firstName: "",
    lastName: "",
    userRole: "",
    passwordResetRequired: "false",
  },
});
