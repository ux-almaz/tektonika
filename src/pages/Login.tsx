import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PillButton from "@/components/PillButton";
import tektonika from "@/assets/tektonika-logo.svg";

const SITE_PASSWORD = "tektonika";
const PASSWORD_LOGIN_ENABLED = false;

const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!PASSWORD_LOGIN_ENABLED) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  if (!PASSWORD_LOGIN_ENABLED) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SITE_PASSWORD) {
      sessionStorage.setItem("site_auth", "1");
      navigate("/", { replace: true });
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-5">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full max-w-sm">
        <img src={tektonika} alt="Тектоника" className="h-6 mb-4" />
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
          placeholder="Введите пароль"
          className="w-full h-14 rounded-pill border border-border bg-card px-6 text-sm outline-none focus:ring-2 focus:ring-primary"
          autoFocus
        />
        {error && <p className="text-destructive text-sm -mt-4">Неверный пароль</p>}
        <PillButton type="submit" className="w-full py-4">
          Войти
        </PillButton>
      </form>
    </div>
  );
};

export default Login;
