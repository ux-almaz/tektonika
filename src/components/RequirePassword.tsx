import { Navigate } from "react-router-dom";

const PASSWORD_LOGIN_ENABLED = false;

const RequirePassword = ({ children }: { children: React.ReactNode }) => {
  if (!PASSWORD_LOGIN_ENABLED) return <>{children}</>;
  const isAuthed = sessionStorage.getItem("site_auth") === "1";
  if (!isAuthed) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default RequirePassword;
