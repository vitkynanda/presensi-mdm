import { getUUID } from "utils";

export const addNewUser = {
  name: "",
  email: "",
  id: "",
  profile_desc: "",
  phone: "",
  address: "",
  imageUrl: "",
  system_role: "User",
  is_verified: false,
  is_active: true,
  company_role: {
    id: "",
    name: "",
  },
  workplace: {
    id: "",
    name: "",
  },
  team: {
    name: "",
    id: "",
  },
};

export const clockIn = {
  id: getUUID(),
  clock_out: "",
};
