import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    fetch("/skills.json")
      .then((res) => res.json())
      .then((data) => setSkills(data));
    AOS.init({ duration: 800 });
  }, []);

  // Top Rated Providers (static demo)
  const topProviders = [
    { name: "Alice", skill: "Guitar", rating: 5, image: "/vite.svg" },
    { name: "Bob", skill: "Yoga", rating: 4.9, image: "/vite.svg" },
    { name: "Carol", skill: "Coding", rating: 4.8, image: "/vite.svg" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Hero Swiper Slider */}
      <section className="mb-8" data-aos="fade-up">
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 2500 }}
          pagination={{ clickable: true }}
          loop={skills.length > 3}
          slidesPerView={1}
        >
          {skills.slice(0, 3).map((skill) => (
            <SwiperSlide key={skill.skillId}>
              <div className="h-64 flex items-center justify-center bg-base-200 rounded-xl shadow">
                <img
                  src={skill.image}
                  alt={skill.skillName}
                  className="h-40 w-40 object-cover rounded-full"
                />
                <div className="ml-6">
                  <h2 className="text-3xl font-bold">{skill.skillName}</h2>
                  <p className="text-lg">{skill.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Popular Skills */}
      <section className="mb-8" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-4">Popular Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.skillId}
              className="card bg-base-100 shadow hover:scale-105 transition-transform duration-300"
            >
              <figure>
                <img
                  src={skill.image}
                  alt={skill.skillName}
                  className="h-32 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{skill.skillName}</h3>
                <p>Rating: {skill.rating}</p>
                <p>Price: ${skill.price}</p>
                <Link
                  to={`/skill/${skill.skillId}`}
                  className="btn btn-primary mt-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Rated Providers */}
      <section className="mb-8" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-4">Top Rated Providers</h2>
        <div className="flex gap-6">
          {topProviders.map((p, i) => (
            <div
              key={i}
              className="card bg-base-100 shadow p-4 flex flex-col items-center"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-16 h-16 rounded-full mb-2"
              />
              <span className="font-semibold">{p.name}</span>
              <span className="text-sm">{p.skill}</span>
              <span className="text-yellow-500">★ {p.rating}</span>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-8" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <ol className="list-decimal ml-6">
          <li>Browse available skills and providers</li>
          <li>View details and ratings</li>
          <li>Book a session with your chosen provider</li>
          <li>Connect, learn, and rate your experience</li>
        </ol>
      </section>

      {/* Extra Section: Community Stories */}
      <section className="mb-8" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-4">Community Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow p-4">
            <h3 className="font-bold mb-2">
              "SkillSwap helped me learn guitar in just 2 months!"
            </h3>
            <p>- Dave, Student</p>
          </div>
          <div className="card bg-base-100 shadow p-4">
            <h3 className="font-bold mb-2">
              "I found a language partner and improved my English."
            </h3>
            <p>- Maria, Learner</p>
          </div>
        </div>
      </section>
    </div>
  );
}
