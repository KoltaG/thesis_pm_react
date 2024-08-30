export type Role = "PM" | "Dev";

export type User = {
  _id: string;
  name: string;
  email: string;
  role: Role;
  date: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};
