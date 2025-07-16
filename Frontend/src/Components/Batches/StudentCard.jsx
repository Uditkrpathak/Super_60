import { useContext, useState } from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaArrowRight,
  FaTools,
  FaMedal,
  FaFolderOpen,
  FaBriefcase, // For Internships and Client (formerly Client Internships)
  FaCertificate, // For Certifications
  FaEnvelope, // For Email in Modal
  FaPhone, // For Phone in Modal
  FaLink, // For Portfolio in Modal
  FaEye // For View Certificate
} from "react-icons/fa";
import AuthContext from "../../context/AuthContext";
import StudentEditContext from "../../context/StudentEditContext";
import { useNavigate } from "react-router-dom";

const StudentCard = ({ student }) => {
  const [showModal, setShowModal] = useState(false);
  const { isAdmin } = useContext(AuthContext);
  const { setStudentProfile } = useContext(StudentEditContext);
  const navigate = useNavigate();

  const editHandler = (student) => {
    setStudentProfile(student);
    navigate("/editstudentprofile");
  };

  return (
    <>
      {/* Student Card */}
      <div className="w-full max-w-sm rounded-2xl shadow-xl overflow-hidden transition transform hover:scale-[1.03] hover:shadow-2xl bg-white border border-gray-200">
        {/* Image */}
        <div className="relative overflow-hidden h-52">
          <img
            src={student.profileImage || "https://via.placeholder.com/400x300?text=Student+Profile"}
            alt={student.name}
            className="object-cover w-full h-full"
          />
          {student.batch && (
            <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold bg-[#002277] text-white rounded-full shadow">
              {student.batch}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-800">{student.name || 'Student Name'}</h2>
          <p className="mb-4 text-sm text-gray-500">{student.branch || 'Branch'}</p>

          <div className="space-y-2 text-sm">
            {student.skills?.length > 0 && (
              <div className="flex items-center gap-2 text-gray-600">
                <FaTools />
                <span>{student.skills.length} Skills</span>
              </div>
            )}
            {student.achievements?.length > 0 && (
              <div className="flex items-center gap-2 text-yellow-600">
                <FaMedal />
                <span>{student.achievements.length} Achievements</span>
              </div>
            )}
            {student.projects?.length > 0 && (
              <div className="flex items-center gap-2 text-blue-600">
                <FaFolderOpen />
                <span>{student.projects.length} Projects</span>
              </div>
            )}
            {student.internship?.length > 0 && (
              <div className="flex items-center gap-2 text-green-600">
                <FaBriefcase />
                <span>{student.internship.length} Internships</span>
              </div>
            )}
            {student.client?.length > 0 && (
              <div className="flex items-center gap-2 text-purple-600">
                <FaBriefcase />
                <span>{student.client.length} Client Projects</span>
              </div>
            )}
            {student.certificates?.length > 0 && (
              <div className="flex items-center gap-2 text-orange-600">
                <FaCertificate />
                <span>{student.certificates.length} Certifications</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 pb-5">
          <div className="flex gap-3 text-gray-500">
            {student.socialLinks?.github && (
              <a href={student.socialLinks.github} target="_blank" rel="noopener noreferrer" className="transition hover:text-black" aria-label="GitHub Profile">
                <FaGithub />
              </a>
            )}
            {student.socialLinks?.linkedin && (
              <a href={student.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#0077b5] transition" aria-label="LinkedIn Profile">
                <FaLinkedinIn />
              </a>
            )}
            {student.socialLinks?.twitter && (
              <a href={student.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="transition hover:text-sky-500" aria-label="Twitter Profile">
                <FaTwitter />
              </a>
            )}
            {student.socialLinks?.whatsapp && (
              <a href={`https://wa.me/${student.socialLinks.whatsapp}`} target="_blank" rel="noopener noreferrer" className="transition hover:text-green-500" aria-label="WhatsApp">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-4 h-4" />
              </a>
            )}
            {student.socialLinks?.fiverr && (
              <a href={student.socialLinks.fiverr} target="_blank" rel="noopener noreferrer" className="transition hover:text-green-600" aria-label="Fiverr Profile">
                <FaLink />
              </a>
            )}
            {student.socialLinks?.instagram && (
              <a href={student.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="transition hover:text-pink-500" aria-label="Instagram Profile">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="w-4 h-4" />
              </a>
            )}
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="p-2 text-white bg-[#C57726] rounded-full hover:bg-[#a2601e] transition"
            aria-label="View Full Profile"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg max-w-5xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute text-2xl font-bold text-gray-600 top-4 right-4 hover:text-black"
              aria-label="Close Modal"
            >
              &times;
            </button>

            <div className="flex flex-col gap-8 md:flex-row">
              {/* Left Column (Profile Info) */}
              <div className="w-full md:w-1/3">
                <img
                  src={student.profileImage || "https://via.placeholder.com/400x400?text=Student+Profile"}
                  alt={student.name}
                  className="w-full mb-4 rounded-xl shadow-md"
                />

                <div className="flex items-center justify-between mb-2">
                  {student.batch && (
                    <span className="text-sm bg-[#002277] text-white px-3 py-1 rounded-md">
                      {student.batch}
                    </span>
                  )}
                  {isAdmin && (
                    <button
                      onClick={() => editHandler(student)}
                      className="text-sm bg-[#002277] text-white px-3 py-1 rounded-md hover:bg-blue-800 transition"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-gray-900">{student.name || 'Student Name'}</h2>
                <p className="mb-4 text-base text-gray-600">{student.branch || 'Branch'}</p>

                {student.academicRollNo && <p className="text-sm text-gray-700 mb-1"><strong>Academic Roll No:</strong> {student.academicRollNo}</p>}
                {student.universityRollNo && <p className="text-sm text-gray-700 mb-1"><strong>University Roll No:</strong> {student.universityRollNo}</p>}
                {student.email && (
                  <p className="flex items-center text-sm text-gray-700 mb-1">
                    <FaEnvelope className="mr-2 text-gray-500" /> {student.email}
                  </p>
                )}
                {student.phone && (
                  <p className="flex items-center text-sm text-gray-700 mb-1">
                    <FaPhone className="mr-2 text-gray-500" /> {student.phone}
                  </p>
                )}
                {student.portfolioLink && (
                  <p className="flex items-center text-sm text-blue-600 mb-1">
                    <FaLink className="mr-2" /> <a href={student.portfolioLink} target="_blank" rel="noopener noreferrer" className="hover:underline">Portfolio</a>
                  </p>
                )}

                {(student.socialLinks?.github || student.socialLinks?.linkedin || student.socialLinks?.twitter || student.socialLinks?.whatsapp || student.socialLinks?.fiverr || student.socialLinks?.instagram) && (
                  <>
                    <h3 className="mt-6 font-semibold text-gray-800">Connect</h3>
                    <div className="flex gap-3 mt-2 text-xl text-gray-600">
                      {student.socialLinks?.github && <a href={student.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-black" aria-label="GitHub Profile"><FaGithub /></a>}
                      {student.socialLinks?.linkedin && <a href={student.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#0077b5]" aria-label="LinkedIn Profile"><FaLinkedinIn /></a>}
                      {student.socialLinks?.twitter && <a href={student.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-sky-500" aria-label="Twitter Profile"><FaTwitter /></a>}
                      {student.socialLinks?.whatsapp && <a href={`https://wa.me/${student.socialLinks.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-500" aria-label="WhatsApp"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" /></a>}
                      {student.socialLinks?.fiverr && <a href={student.socialLinks.fiverr} target="_blank" rel="noopener noreferrer" className="hover:text-green-600" aria-label="Fiverr Profile"><FaLink /></a>}
                      {student.socialLinks?.instagram && <a href={student.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500" aria-label="Instagram Profile"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="w-5 h-5" /></a>}
                    </div>
                  </>
                )}

                {student.skills?.length > 0 && (
                  <>
                    <h3 className="mt-6 font-semibold text-gray-800">Skills</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {student.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </>
                )}
                {student.specialization?.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-800">Specialization</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {student.specialization.map((spec, i) => (
                        <span key={i} className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {student.placement?.placed && student.placement.companyName && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-800">Placement Status</h3>
                    <p className="text-sm text-gray-700">
                      Placed at **{student.placement.companyName}** on {student.placement.placedOn ? new Date(student.placement.placedOn).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column (About, Achievements, Projects, Internships, Client, Certifications) */}
              <div className="w-full md:w-2/3">
                {student.about && (
                  <>
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">About</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{student.about}</p>
                  </>
                )}

                {/* Achievements */}
                {student.achievements?.length > 0 && (
                  <>
                    <h3 className="mt-6 mb-2 text-lg font-semibold text-gray-800">Achievements 🏆</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {student.achievements.map((ach, i) => (
                        <div key={i} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <FaMedal className="text-yellow-500" />
                            <h4 className="font-bold text-gray-900">{ach.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600">{ach.description}</p>
                          {ach.date && <p className="mt-1 text-xs text-gray-400">{new Date(ach.date).toLocaleDateString()}</p>}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Projects */}
                {student.projects?.length > 0 && (
                  <>
                    <h3 className="mt-6 mb-2 text-lg font-semibold text-gray-800">Projects 🚀</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {student.projects.map((project, i) => (
                        <div key={i} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                          {project.projectImage && (
                            <img
                              src={project.projectImage}
                              alt={project.title}
                              className="w-full h-32 object-cover rounded-md mb-2"
                              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300x150?text=Project+Image" }}
                            />
                          )}
                          <h4 className="font-bold text-gray-900">{project.title}</h4>
                          <p className="text-sm text-gray-600">{project.description}</p>
                          {project.technologiesUsed?.length > 0 && (
                            <p className="text-xs text-gray-500 mt-1">
                              Technologies: {project.technologiesUsed.join(', ')}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.projectLink && (
                              <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline flex items-center">
                                <FaLink className="mr-1" /> View Project
                              </a>
                            )}
                            {project.githubRepo && (
                              <a href={project.githubRepo} target="_blank" rel="noopener noreferrer" className="text-gray-700 text-sm hover:underline flex items-center">
                                <FaGithub className="mr-1" /> GitHub
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Internships */}
                {student.internship?.length > 0 && (
                  <>
                    <h3 className="mt-6 mb-2 text-lg font-semibold text-gray-800">Internships 💼</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {student.internship.map((intern, i) => (
                        <div key={i} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                          <h4 className="font-bold text-gray-900">{intern.companyName}</h4>
                          {intern.role && <p className="text-sm text-gray-600">Role: {intern.role}</p>}
                          {(intern.startDate || intern.endDate) && (
                            <p className="text-xs text-gray-500 mt-1">
                              {intern.startDate ? new Date(intern.startDate).toLocaleDateString() : 'N/A'} - {intern.endDate ? new Date(intern.endDate).toLocaleDateString() : 'N/A'}
                            </p>
                          )}
                          {intern.description && <p className="text-sm text-gray-700 mt-2">{intern.description}</p>}
                          {intern.certificate && (
                            <a href={intern.certificate} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline flex items-center mt-2">
                              <FaCertificate className="mr-1" /> View Certificate
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Client Projects */}
                {student.client?.length > 0 && (
                  <>
                    <h3 className="mt-6 mb-2 text-lg font-semibold text-gray-800">Client Projects 🤝</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {student.client.map((clientProject, i) => (
                        <div key={i} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                          <h4 className="font-bold text-gray-900">{clientProject.companyName}</h4>
                          {clientProject.role && <p className="text-sm text-gray-600">Role: {clientProject.role}</p>}
                          {(clientProject.startDate || clientProject.endDate) && (
                            <p className="text-xs text-gray-500 mt-1">
                              {clientProject.startDate ? new Date(clientProject.startDate).toLocaleDateString() : 'N/A'} - {clientProject.endDate ? new Date(clientProject.endDate).toLocaleDateString() : 'N/A'}
                            </p>
                          )}
                          {clientProject.description && <p className="text-sm text-gray-700 mt-2">{clientProject.description}</p>}
                          {clientProject.certificate && (
                            <a href={clientProject.certificate} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline flex items-center mt-2">
                              <FaCertificate className="mr-1" /> View Certificate
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Certifications */}
                {student.certificates?.length > 0 && (
                  <>
                    <h3 className="mt-6 mb-2 text-lg font-semibold text-gray-800">Certifications 🏅</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {student.certificates.map((cert, i) => (
                        <div key={i} className="p-4 border rounded-lg bg-gray-50 shadow-sm">
                          {cert.viewLink && (
                            <img
                              src={cert.viewLink}
                              alt={cert.name}
                              className="w-full h-32 object-cover rounded-md mb-2"
                              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300x150?text=Certificate+Image" }}
                            />
                          )}
                          <h4 className="font-bold text-gray-900">{cert.name}</h4>
                          {cert.issuedBy && <p className="text-sm text-gray-600">Issued By: {cert.issuedBy}</p>}
                          {cert.issueDate && (
                            <p className="text-xs text-gray-500 mt-1">
                              Issue Date: {new Date(cert.issueDate).toLocaleDateString()}
                            </p>
                          )}
                          {cert.viewLink && (
                            <a href={cert.viewLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline flex items-center mt-2">
                              <FaEye className="mr-1" /> View Certificate
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentCard;