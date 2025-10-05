import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Spinner from "./../ui/Spinner";
import { useCurrentUser } from "./../api/queries";

function ProtectedRoutes({ roles }: { roles?: string[] }) {
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useCurrentUser();

  useEffect(() => {
    if (!isLoading) {
      if (error) {
        navigate("/login", { replace: true });
      } else if (roles && user && !roles.includes(user.role)) {
        navigate("/forbidden", { replace: true });
      }
    }
  }, [isLoading, error, roles, user, navigate]);

  if (isLoading) return <Spinner></Spinner>;

  // If there's an error (like 401), the effect above will redirect
  if (error) return null;
  return <Outlet context={{ user }} />;
}

export default ProtectedRoutes;
