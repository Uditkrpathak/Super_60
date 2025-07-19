import React, { useEffect, useState } from 'react';
import { Award, Code, Trophy, Star, Users, BookOpen, Briefcase, Heart, Zap, Target, Globe, Coffee } from 'lucide-react';

const ProfileCard = ({student}) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(()=>{
    console.log(student)
  },[])

  // Content for each grid space (excluding center)
  const gridContent = [
    { icon: <Code className="w-6 h-6" />, label: "React", sublabel: "Expert", gradient: "from-blue-500 to-cyan-400" },
    { icon: <Award className="w-6 h-6" />, label: "UI/UX", sublabel: "Designer", gradient: "from-purple-500 to-pink-400" },
    { icon: <Trophy className="w-6 h-6" />, label: "Awards", sublabel: "15+", gradient: "from-yellow-500 to-orange-400" },
    { icon: <Users className="w-6 h-6" />, label: "Clients", sublabel: "500+", gradient: "from-green-500 to-emerald-400" },
    null, // Center space for image
    { icon: <Star className="w-6 h-6" />, label: "Rating", sublabel: "4.9/5", gradient: "from-indigo-500 to-purple-400" },
    { icon: <BookOpen className="w-6 h-6" />, label: "Projects", sublabel: "100+", gradient: "from-teal-500 to-cyan-400" },
    { icon: <Briefcase className="w-6 h-6" />, label: "Experience", sublabel: "5+ Years", gradient: "from-rose-500 to-pink-400" },
    { icon: <Heart className="w-6 h-6" />, label: "Mentor", sublabel: "Passionate", gradient: "from-red-500 to-rose-400" },
  ];

  return (
    <div className="flex items-center justify-center bg-gradient-to-br bg-blue-900 rounded-3xl cursor-pointer">
      <div
        className="relative w-full h-96 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 hover:shadow-3xl hover:scale-105 border border-white/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Grid Layout */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-3 p-6">
          {gridContent.map((content, index) => {
            // Center position (index 4) - Profile Image
            if (index === 4) {
              return (
                <div key={index} className="relative flex flex-col items-center justify-center -mt-2">
                  {/* Curved Background Effects */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute -inset-6 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse"></div>
                  <div className="absolute -inset-8 bg-gradient-to-br from-violet-500/5 to-rose-500/5 rounded-full blur-3xl"></div>

                  {/* Organic Shape Background */}
                  <div
                    className="absolute -inset-2 bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-lg animate-pulse"
                    style={{
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                      transform: 'rotate(45deg)'
                    }}
                  ></div>

                  {/* Profile Image Container */}
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1.5 shadow-2xl z-10 mb-2">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                      <img
                        src={student.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>

                  {/* Name and Badge - Always Visible */}
                  <div className="relative z-20 text-center">
                    <h3 className="text-white font-bold text-sm mb-1 drop-shadow-lg">{student.name}</h3>
                    <div className="inline-flex items-center bg-gradient-to-r from-orange-500 to-purple-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-lg">
                      {student.batch}
                    </div>
                  </div>
                </div>
              );
            }

            // Content spaces
            return (
              <div
                key={index}
                className={`relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex flex-col items-center justify-center p-3 transition-all duration-500 transform hover:scale-110 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-70 translate-y-2'
                  }`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  clipPath: index === 1 || index === 7 ? 'polygon(0 20%, 100% 0, 100% 80%, 0 100%)' :
                    index === 3 || index === 5 ? 'polygon(0 0, 100% 20%, 100% 100%, 0 80%)' : 'none'
                }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${content.gradient} rounded-2xl opacity-20 transition-opacity duration-500 ${isHovered ? 'opacity-30' : 'opacity-20'
                  }`}></div>

                {/* Content */}
                <div className="relative z-10 text-center">
                  <div className="text-white mb-1 flex justify-center">
                    {content.icon}
                  </div>
                  <div className="text-white font-semibold text-sm mb-1">
                    {content.label}
                  </div>
                  <div className="text-white/80 text-xs font-medium">
                    {content.sublabel}
                  </div>
                </div>

                {/* Hover Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${content.gradient} rounded-2xl blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-20' : 'opacity-0'
                  }`}></div>
              </div>
            );
          })}
        </div>

        {/* Ambient Lighting Effects */}
        <div className={`absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl transition-opacity duration-1000 ${isHovered ? 'opacity-100' : 'opacity-0'
          }`}></div>
        <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-2xl transition-opacity duration-1000 ${isHovered ? 'opacity-100' : 'opacity-0'
          }`}></div>

        {/* Floating Particles Effect */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full animate-ping"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '2s'
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;