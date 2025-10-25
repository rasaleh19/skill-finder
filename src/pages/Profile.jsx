import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getAuth, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";

export default function Profile() {
  const { user, auth } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
      toast.success("Profile updated!");
      setEditing(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
      <div className="card w-full max-w-sm bg-base-200 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>
        <div className="flex flex-col items-center mb-4">
          <img
            src={
              user?.photoURL ||
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            }
            alt="User"
            className="w-40 h-40 object-cover rounded-xl mb-2 border border-base-300"
          />
          <span className="font-semibold text-lg">{user?.displayName}</span>
          <span className="text-sm text-gray-500">{user?.email}</span>
        </div>
        {!editing ? (
          <button
            className="btn btn-primary w-full"
            onClick={() => setEditing(true)}
          >
            Update Profile
          </button>
        ) : (
          <form onSubmit={handleUpdate} className="flex flex-col gap-3 mt-3">
            <input
              type="text"
              className="input input-bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="url"
              className="input input-bordered"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              required
            />
            <button className="btn btn-success" disabled={loading}>
              {loading ? "Updating..." : "Save"}
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
