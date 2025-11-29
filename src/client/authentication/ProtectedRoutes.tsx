import PathFinderLoader from "../components/PathFinderLoader";
import { useAuth } from "./../api/queries/authQueries";

import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoutes({ roles }: { roles?: string[] }) {
  const navigate = useNavigate();

  const { data: user, isLoading, error } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (error || !user) {
        navigate("/login", { replace: true });
      } else if (roles && !roles.includes(user.role)) {
        navigate("/forbidden", { replace: true });
      }
    }
  }, [isLoading, error, roles, user, navigate]);

  if (isLoading) return <PathFinderLoader />;
  if (error || !user) return null;

  return <Outlet context={{ user }} />;
}
export default ProtectedRoutes;
