import React from "react";
import "./EasterCarousel.css"; // Import the custom CSS for animation

const easterItems = [
  {
  
    img: "https://images.pexels.com/photos/635699/pexels-photo-635699.jpeg",
    
  },
  {
  
    img: "https://images.pexels.com/photos/7168798/pexels-photo-7168798.jpeg",
 
  },
  {
    
    img: "https://images.pexels.com/photos/4099179/pexels-photo-4099179.jpeg",
    
  },
  {
   
    img: "https://images.pexels.com/photos/5145/animal-easter-chick-chicken.jpg",
    
  },
  {
   
    img: "https://images.pexels.com/photos/2072158/pexels-photo-2072158.jpeg",
    
  },
  {

    img: "https://images.pexels.com/photos/12787666/pexels-photo-12787666.jpeg",

  },
];

const EasterCarousel = () => {
  return (
   <div className="w-full overflow-hidden carousel-mask">
    
  <div className="flex items-start gap-6 animate-track">
    {easterItems.map((item, idx) => (
      <article key={idx} className="carousel-item w-80">
        <img src={item.img} alt={item.title} className="object-cover h-48 rounded-t-lg w-80" />
      </article>
    ))}
  </div>
</div>

  );
};

export default EasterCarousel;
