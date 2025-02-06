import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

const MatrixBackground = () => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for(let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      // Set background color based on theme
      const bgColor = isDark ? 'rgba(26, 31, 53, 0.1)' : 'rgba(255, 255, 255, 0.1)';
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set text color based on theme
      const textColor = isDark 
        ? 'rgba(96, 165, 250, 0.3)'  // Blue with opacity for dark theme
        : 'rgba(59, 130, 246, 0.2)';  // Slightly darker blue with lower opacity for light theme
      
      ctx.fillStyle = textColor;
      ctx.font = `${fontSize}px monospace`;

      for(let i = 0; i < drops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        ctx.fillText(text, x, y);
        
        if(y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]); // Add isDark to dependencies to re-initialize when theme changes

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ 
        backgroundColor: isDark ? '#1a1f35' : '#ffffff'
      }}
    />
  );
};

export default MatrixBackground;