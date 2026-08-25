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
  name: string;
  role: Role;
  department: Department;
};

export type UserContextValue = {
  user: CurrentUser | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
};
