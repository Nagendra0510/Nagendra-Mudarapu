import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: undefined, y: undefined });
  const particlesRef = useRef([]);
  const gearsRef = useRef([]);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    class Gear {
      constructor(x, y, radius, teeth) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.teeth = teeth;
        this.rotation = 0;
        this.speed = (Math.random() * 0.001) + 0.001;
        this.direction = Math.random() > 0.5 ? 1 : -1;
      }

      draw() {
        ctx.strokeStyle = isDark ? 'rgba(147, 197, 253, 0.3)' : 'rgba(59, 130, 246, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        // Draw gear teeth
        for (let i = 0; i < this.teeth; i++) {
          const angle = (Math.PI * 2 * i) / this.teeth + this.rotation;
          const innerRadius = this.radius * 0.8;
          const outerRadius = this.radius;
          
          // Draw tooth
          ctx.lineTo(
            this.x + Math.cos(angle) * outerRadius,
            this.y + Math.sin(angle) * outerRadius
          );
          ctx.lineTo(
            this.x + Math.cos(angle + Math.PI/this.teeth) * innerRadius,
            this.y + Math.sin(angle + Math.PI/this.teeth) * innerRadius
          );
        }
        
        ctx.closePath();
        ctx.stroke();

        // Draw center circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.2, 0, Math.PI * 2);
        ctx.stroke();
      }

      update() {
        this.rotation += this.speed * this.direction;
      }
    }

    class DataPoint {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 20) + 1;
        this.type = Math.random() > 0.7 ? 'data' : 'connection';
      }

      draw() {
        if (this.type === 'data') {
          // Draw data points as small squares
          ctx.fillStyle = isDark ? 'rgba(147, 197, 253, 0.4)' : 'rgba(59, 130, 246, 0.4)';
          ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        } else {
          // Draw connection points as circles
          ctx.fillStyle = isDark ? 'rgba(147, 197, 253, 0.2)' : 'rgba(59, 130, 246, 0.2)';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size/2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      update() {
        if (mouseRef.current.x !== undefined) {
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

    const init = () => {
      particlesRef.current = [];
      gearsRef.current = [];
      
      // Create data points
      const numberOfParticles = (canvas.width * canvas.height) / 15000;
      for (let i = 0; i < numberOfParticles; i++) {
        particlesRef.current.push(new DataPoint());
      }
      
      // Create gears at fixed positions
      const gearPositions = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, r: 40, t: 12 },
        { x: canvas.width * 0.8, y: canvas.height * 0.3, r: 50, t: 16 },
        { x: canvas.width * 0.5, y: canvas.height * 0.7, r: 45, t: 14 }
      ];
      
      gearPositions.forEach(pos => {
        gearsRef.current.push(new Gear(pos.x, pos.y, pos.r, pos.t));
      });
    };
    
    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw data flow connections
      ctx.strokeStyle = isDark ? 'rgba(147, 197, 253, 0.1)' : 'rgba(59, 130, 246, 0.1)';
      ctx.lineWidth = 1;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i; j < particlesRef.current.length; j++) {
          let dx = particlesRef.current[i].x - particlesRef.current[j].x;
          let dy = particlesRef.current[i].y - particlesRef.current[j].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
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

      // Update and draw gears
      gearsRef.current.forEach(gear => {
        gear.update();
        gear.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 transition-colors duration-300"
      style={{ 
        backgroundColor: isDark ? '#121212' : '#ffffff'
      }}
    />
  );
};

export default AnimatedBackground;