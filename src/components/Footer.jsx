import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer bg-base-200 p-4 flex flex-col md:flex-row justify-between items-center mt-8">
      <div>
        <span className="font-semibold">Contact:</span> info@skillswap.com
      </div>
      <div className="flex gap-4">
        <a href="#" className="link link-hover">
          Privacy Policy
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="link link-hover"
        >
          <FaFacebook className="inline text-xl" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="link link-hover"
        >
          <FaTwitter className="inline text-xl" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="link link-hover"
        >
          <FaInstagram className="inline text-xl" />
        </a>
      </div>
    </footer>
  );
}
