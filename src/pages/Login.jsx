import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useAuth() || {};
  const { googleSignIn, user } = authContext;
  const auth = getAuth();

  // Helper to check if googleSignIn is available
  const isGoogleSignInAvailable = typeof googleSignIn === "function";

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      toast.success("Login successful!");
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // No redirect here; handled by useEffect when user updates
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!isGoogleSignInAvailable) {
      toast.error("Google Sign-In is not available. Please try again later.");
      return;
    }
    setLoading(true);
    try {
      await googleSignIn();
      // No redirect here; handled by useEffect when user updates
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
      <form
        className="card w-full max-w-sm bg-base-200 shadow-xl p-6"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <div className="mb-3">
          <label className="label">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 relative">
          <label className="label">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="input input-bordered w-full pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-2 top-9 text-xl"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? <span>👁️</span> : <span>🙈</span>}
          </button>
        </div>
        <div className="flex justify-between mb-3">
          <Link
            to="/forgot-password"
            state={{ email }}
            className="link link-hover text-sm"
          >
            Forgot Password?
          </Link>
          <Link to="/signup" className="link link-hover text-sm">
            Signup
          </Link>
        </div>
        <button className="btn btn-primary w-full mb-2" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <button
          type="button"
          className="btn btn-outline w-full flex items-center gap-2"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <FcGoogle className="text-xl" /> Google Login
        </button>
      </form>
    </div>
  );
}
