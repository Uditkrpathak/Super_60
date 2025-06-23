import React from "react";
import styles from "./ManagementDeskCarousel.module.css";

const managementData = [
  {
    name: "Dr. A. Sharma",
    title: "Principal",
    description: "Leading academic excellence with a focus on holistic student development.",
    image: "https://bmnmsbiymz.ufs.sh/f/1V3V2P4kpAum8xTTG5XlJfrKGuWUjb4n6NYRd3wE9DxCgy0v"
  },
  {
    name: "Prof. B. Verma",
    title: "Vice Principal",
    description: "Ensuring quality education and discipline across all departments.",
    image: "https://via.placeholder.com/80"
  },
  {
    name: "Dr. C. Mishra",
    title: "Dean of Academics",
    description: "Overseeing curriculum design and academic strategy.",
    image: "https://via.placeholder.com/80"
  },
  {
    name: "Mr. D. Singh",
    title: "Registrar",
    description: "Managing administrative operations and student records.",
    image: "https://via.placeholder.com/80"
  },
  {
    name: "Mrs. E. Rathi",
    title: "HOD, CS Dept.",
    description: "Guiding innovation and excellence in computer science education.",
    image: "https://via.placeholder.com/80"
  }
];

const ManagementDeskCarousel = () => {
  return (
    <div className={styles.void}>
      <div className={styles.crop}>
        <ul className={styles.cardList} style={{ "--count": managementData.length }}>
          {managementData.map((member, index) => (
            <li
              key={index}
              style={{ animationDelay: `calc((var(--rotate-speed)/var(--count)) * -${index}s)` }}
            >
              <div
                className={styles.card}
                style={{ animationDelay: `calc((var(--rotate-speed)/var(--count)) * -${index}s)` }}
              >
                <img src={member.image} alt={member.name} />
                <div className={styles.info}>
                  <span className={styles.name}>{member.name}</span>
                  <span className={styles.title}>{member.title}</span>
                  <p>{member.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.lastCircle}></div>
        <div className={styles.secondCircle}></div>
      </div>
      <div className={styles.mask}></div>
      <div className={styles.centerCircle}></div>
    </div>
  );
};

export default ManagementDeskCarousel;
