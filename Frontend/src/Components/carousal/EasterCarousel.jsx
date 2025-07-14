import React from "react";
import "./EasterCarousel.css"; // Import the custom CSS for animation

const easterItems = [
  {
  
    img: "https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rAWGbiBcYnIQDTmzWgy0bcOvPRLxFCXr97NJo",
    
  },
  {
  
    img: "https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rHptqDVpF2pQE4PFU7NAMVr6YeWicz5h1KuJt",
 
  },
  {
    
    img: "https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rSSl9pOoaFDA2LEeO4I3rP8jBzJb7cltWkQRY",
    
  },
  {
   
    img: "https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rAWGbiBcYnIQDTmzWgy0bcOvPRLxFCXr97NJo",
    
  },
  {
  
    img: "https://kmz0l2g36g.ufs.sh/f/szSqTLNNPY1rHptqDVpF2pQE4PFU7NAMVr6YeWicz5h1KuJt",
 
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
