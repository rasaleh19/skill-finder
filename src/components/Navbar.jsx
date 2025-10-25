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
          <div
            className="relative group flex items-center"
            style={{ minHeight: "90px" }}
          >
            <img
              src={
                user.photoURL
                  ? user.photoURL
                  : "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
              }
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border border-base-300 mr-2"
              style={{ imageRendering: "auto" }}
            />
            <div className="absolute right-0 mt-24 px-4 py-2 min-w-40 bg-base-100 rounded shadow text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-base-300">
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
