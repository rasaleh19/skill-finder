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

      {/* Top Rated Providers Section */}
      <section className="mb-8 flex flex-col items-center" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Top Rated Providers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="bg-base-100 p-6 rounded-xl shadow flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/men/45.jpg"
              alt="Provider"
              className="w-16 h-16 rounded-full mb-2"
            />
            <span className="font-semibold mb-1">Alex Martin</span>
            <span className="text-yellow-500 font-bold">★ 4.8</span>
            <span className="text-sm text-gray-500">Guitar Lessons</span>
          </div>
          <div className="bg-base-100 p-6 rounded-xl shadow flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="Provider"
              className="w-16 h-16 rounded-full mb-2"
            />
            <span className="font-semibold mb-1">Sara Hossain</span>
            <span className="text-yellow-500 font-bold">★ 4.6</span>
            <span className="text-sm text-gray-500">English Practice</span>
          </div>
          <div className="bg-base-100 p-6 rounded-xl shadow flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/men/22.jpg"
              alt="Provider"
              className="w-16 h-16 rounded-full mb-2"
            />
            <span className="font-semibold mb-1">John Doe</span>
            <span className="text-yellow-500 font-bold">★ 4.9</span>
            <span className="text-sm text-gray-500">Python Programming</span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-8 flex flex-col items-center" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-4 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="bg-base-100 p-6 rounded-xl shadow flex flex-col items-center">
            <span className="text-4xl mb-2">🔍</span>
            <span className="font-semibold mb-1">Browse Skills</span>
            <span className="text-sm text-gray-500 text-center">
              Explore a wide range of skills and find what interests you.
            </span>
          </div>
          <div className="bg-base-100 p-6 rounded-xl shadow flex flex-col items-center">
            <span className="text-4xl mb-2">💬</span>
            <span className="font-semibold mb-1">Connect & Book</span>
            <span className="text-sm text-gray-500 text-center">
              Contact providers and book sessions easily.
            </span>
          </div>
          <div className="bg-base-100 p-6 rounded-xl shadow flex flex-col items-center">
            <span className="text-4xl mb-2">🚀</span>
            <span className="font-semibold mb-1">Learn & Grow</span>
            <span className="text-sm text-gray-500 text-center">
              Attend sessions, learn new skills, and track your progress.
            </span>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-8" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-4 text-center">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-base-100 p-6 rounded-xl shadow flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="User"
              className="w-16 h-16 rounded-full mb-2"
            />
            <p className="italic mb-2">
              “SkillSwap helped me learn guitar from scratch. The provider was
              super friendly and supportive!”
            </p>
            <span className="font-semibold">Ayesha Rahman</span>
          </div>
          <div className="bg-base-100 p-6 rounded-xl shadow flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
              className="w-16 h-16 rounded-full mb-2"
            />
            <p className="italic mb-2">
              “I improved my spoken English and gained confidence for job
              interviews. Highly recommended!”
            </p>
            <span className="font-semibold">Imran Hossain</span>
          </div>
          <div className="bg-base-100 p-6 rounded-xl shadow flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/men/65.jpg"
              alt="User"
              className="w-16 h-16 rounded-full mb-2"
            />
            <p className="italic mb-2">
              “The Python programming course was easy to follow and very
              practical. Loved the experience!”
            </p>
            <span className="font-semibold">Tanvir Ahmed</span>
          </div>
        </div>
      </section>
    </div>
  );
}
