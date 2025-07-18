import { useState } from "react";
import { FaTwitter, FaLinkedin, FaPlus } from "react-icons/fa";

const TeamMemberCard = ({ name, position, quote, image }) => {
  const [visible, setVisible] = useState(false);

  return (
    <article
      className={`relative w-full max-w-[35ch] mx-auto text-center rounded-md overflow-hidden bg-[#002277] transition-all duration-500`}
    >
      {/* Front */}
      <div
        className={`p-10 space-y-9 transition-all duration-500 ${
          visible ? "opacity-0 translate-y-full" : "opacity-100 translate-y-0"
        }`}
      >
        <img
          src={image}
          alt={name}
          className="object-cover w-20 h-20 mx-auto border-2 border-gray-400 rounded-full"
        />
        <div className="space-y-1">
          <p className="font-bold text-white">{name}</p>
          <p className="italic text-gray-300">{position}</p>
        </div>
      </div>

      {/* Back */}
      <div
        className={`absolute inset-0 p-8 space-y-4 bg-[#14273e] overflow-auto transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0 z-10" : "opacity-0 translate-y-full"
        }`}
      >
        <p className="font-bold text-white">{name}</p>
        <q className="block text-gray-300">{quote}</q>
        <div className="flex justify-center gap-4 mt-4 mb-8">
          <a href="#"><FaTwitter className="text-xl text-white" /></a>
          <a href="#"><FaLinkedin className="text-xl text-white" /></a>
        </div>
      </div>

      {/* Footer Toggle Button */}
      <footer className="relative h-8 bg-[#0d1a2d] z-20 ">
        <button
          onClick={() => setVisible((prev) => !prev)}
          className={`absolute left-1/2 bottom-6 transform -translate-x-1/2 translate-y-1/2 p-3 w-12 h-12 rounded-full transition-colors duration-300 ${
            visible ? "bg-crimson-600" : "bg-teal-600"
          } text-white`}
        >
          <FaPlus className={`transform transition-transform duration-300 ${visible ? "rotate-45" : "rotate-0"}`} />
        </button>
      </footer>
    </article>
  );
};

export default TeamMemberCard;
