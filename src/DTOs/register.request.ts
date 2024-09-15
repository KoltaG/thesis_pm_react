import { Role } from "./login.response";

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  role: Role;
};
