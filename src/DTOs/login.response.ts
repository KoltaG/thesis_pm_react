export type Role = "PM" | "Dev";

export type User = {
  _id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};
