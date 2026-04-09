import { Navigate } from "react-router-dom";

const RequirePassword = ({ children }: { children: React.ReactNode }) => {
  const isAuthed = sessionStorage.getItem("site_auth") === "1";
  if (!isAuthed) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default RequirePassword;
