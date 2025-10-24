import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const authContext = useAuth() || {};
  const { user, logout } = authContext;
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (logout) {
      await logout();
      navigate("/");
    }
  };

  return (
    <nav className="navbar bg-base-200 px-4 py-2 flex justify-between items-center shadow">
      <div className="flex items-center gap-2">
        <img src="/vite.svg" alt="SkillSwap Logo" className="h-8 w-8" />
        <span className="font-bold text-xl">SkillSwap</span>
      </div>
      <div className="flex gap-4 items-center">
        <Link to="/" className="btn btn-ghost">
          Home
        </Link>
        <Link to="/profile" className="btn btn-ghost">
          My Profile
        </Link>
        {user ? (
          <div className="relative group">
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 px-4 py-2 min-w-[120px] bg-base-100 rounded shadow text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              {user.displayName || user.email}
            </div>
          </div>
        ) : null}
        {user ? (
          <button className="btn btn-outline" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/signup" className="btn btn-outline">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
