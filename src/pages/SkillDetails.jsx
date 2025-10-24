import { useLoaderData, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";

export default function SkillDetails() {
  const skills = useLoaderData();
  const { id } = useParams();
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);

  // Find skill by id from route params
  const skill = Array.isArray(skills)
    ? skills.find((s) => String(s.skillId) === String(id))
    : skills;

  if (!skill) return <div className="text-center mt-10">Skill not found.</div>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Session booked successfully!");
      setForm({ name: user?.displayName || "", email: user?.email || "" });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="card bg-base-200 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-2">{skill.skillName}</h2>
          <img
            src={skill.image}
            alt={skill.skillName}
            className="w-full h-48 object-cover rounded mb-2"
          />
          <p>
            <strong>Provider:</strong> {skill.providerName}
          </p>
          <p>
            <strong>Rating:</strong> {skill.rating}
          </p>
          <p>
            <strong>Price:</strong> ${skill.price}
          </p>
          <p>
            <strong>Description:</strong> {skill.description}
          </p>
          <p>
            <strong>Category:</strong> {skill.category}
          </p>
          <p>
            <strong>Slots Available:</strong> {skill.slotsAvailable}
          </p>
        </div>
      </div>
      <form className="card bg-base-100 shadow p-4" onSubmit={handleSubmit}>
        <h3 className="text-lg font-bold mb-2">Book Session</h3>
        <div className="mb-2">
          <label className="label">Name</label>
          <input
            name="name"
            type="text"
            className="input input-bordered w-full"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <label className="label">Email</label>
          <input
            name="email"
            type="email"
            className="input input-bordered w-full"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Booking..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
