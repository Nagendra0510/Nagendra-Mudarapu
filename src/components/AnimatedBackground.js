import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: undefined, y: undefined });
  const particlesRef = useRef([]);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
      }

      draw() {
        ctx.fillStyle = isDark ? 'rgba(147, 197, 253, 0.3)' : 'rgba(59, 130, 246, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        if (mouseRef.current.x !== undefined && mouseRef.current.y !== undefined) {
          let dx = mouseRef.current.x - this.x;
          let dy = mouseRef.current.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = 100;
          let force = (maxDistance - distance) / maxDistance;
          
          if (distance < maxDistance) {
            this.x -= forceDirectionX * force * this.density;
            this.y -= forceDirectionY * force * this.density;
          } else {
            if (this.x !== this.baseX) {
              let dx = this.x - this.baseX;
              this.x -= dx/10;
            }
            if (this.y !== this.baseY) {
              let dy = this.y - this.baseY;
              this.y -= dy/10;
            }
          }
        }
      }
    }

    // Initialize particles
    const init = () => {
      particlesRef.current = [];
      const numberOfParticles = (canvas.width * canvas.height) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        particlesRef.current.push(new Particle());
      }
    };
    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.strokeStyle = isDark ? 'rgba(147, 197, 253, 0.15)' : 'rgba(59, 130, 246, 0.15)';
      ctx.lineWidth = 1;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i; j < particlesRef.current.length; j++) {
          let dx = particlesRef.current[i].x - particlesRef.current[j].x;
          let dy = particlesRef.current[i].y - particlesRef.current[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Event listeners
    const handleMouseMove = (event) => {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = {
        x: undefined,
        y: undefined
      };
    };

    const handleResize = () => {
      setCanvasSize();
      init();
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]); // Depend on isDark to re-initialize when theme changes

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 transition-colors duration-300"
      style={{ 
        backgroundColor: isDark ? '#1a1f35' : '#ffffff'
      }}
    />
  );
};

export default AnimatedBackground;