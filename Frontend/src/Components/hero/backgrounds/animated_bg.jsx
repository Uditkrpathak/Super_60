import { useEffect, useRef, useState } from "react";

const AnimatedBack = ({ scrollY, bgActive }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize particles
  useEffect(() => {
    const initParticles = () => {
      const particles = [];
      const particleCount = 150;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          color: Math.random() > 0.7 ? '#f97316' : '#6b7280',
          pulse: Math.random() * Math.PI * 2,
        });
      }
      particlesRef.current = particles;
    };

    if (dimensions.width > 0 && dimensions.height > 0) {
      initParticles();
    }
  }, [dimensions]);

  // Handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let time = 0;

    const animate = () => {
      time += 0.01;
      
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position with scroll influence
        particle.x += particle.vx + (scrollY * 0.001);
        particle.y += particle.vy + Math.sin(time + particle.pulse) * 0.2;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = dimensions.width;
        if (particle.x > dimensions.width) particle.x = 0;
        if (particle.y < 0) particle.y = dimensions.height;
        if (particle.y > dimensions.height) particle.y = 0;

        // Pulse effect
        const pulseOpacity = particle.opacity + Math.sin(time * 2 + particle.pulse) * 0.2;
        const activeMultiplier = bgActive ? 1.5 : 1;
        const scrollFade = Math.max(0.1, 1 - scrollY * 0.002);

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color === '#f97316' 
          ? `rgba(249, 115, 22, ${pulseOpacity * activeMultiplier * scrollFade})`
          : `rgba(107, 114, 128, ${pulseOpacity * activeMultiplier * scrollFade})`;
        ctx.fill();

        // Draw connections
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              const opacity = (1 - distance / 100) * 0.1 * scrollFade;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(156, 163, 175, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });

      // Draw floating geometric shapes
      for (let i = 0; i < 5; i++) {
        const x = (dimensions.width / 6) * (i + 1) + Math.sin(time + i) * 50;
        const y = dimensions.height / 2 + Math.cos(time * 0.5 + i) * 100;
        const size = 20 + Math.sin(time * 2 + i) * 10;
        const rotation = time + i;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.strokeStyle = `rgba(249, 115, 22, ${0.1 * scrollFade})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(-size/2, -size/2, size, size);
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, scrollY, bgActive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        background: `radial-gradient(ellipse at center, rgba(249, 115, 22, 0.03) 0%, rgba(255, 255, 255, 0) 70%)`,
        opacity: Math.max(0.3, 1 - scrollY * 0.003)
      }}
    />
  );
};

export default AnimatedBack;