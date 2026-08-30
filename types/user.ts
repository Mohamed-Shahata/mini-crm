export type Department =
  | "marketing"
  | "frontend"
  | "backend"
  | "full_stack"
  | "ui_ux"
  | "content";

export type Role = "admin" | "manager" | "member";

export type CurrentUser = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  department: Department;
  phone: string | null;
  age: number | null;
  avatarUrl: string | null;
};

export type UserContextValue = {
  user: CurrentUser | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
};
