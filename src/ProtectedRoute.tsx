import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  redirectPath: string;
  isAuthenticated: boolean;
  loading?: boolean;
  children: ReactElement;
}

export const ProtectedRoute = ({
  redirectPath,
  isAuthenticated,
  children,
}: ProtectedRouteProps) => {
  return !isAuthenticated ? (
    <Navigate
      to={redirectPath}
      replace
    />
  ) : (
    children
  );
};
