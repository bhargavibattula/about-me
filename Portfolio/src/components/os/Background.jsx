import React, { useMemo } from 'react';

const Background = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 200 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`,
    }));
  }, []);

  const blobs = [
    { color: 'bg-royal', size: 'w-[500px] h-[500px]', left: '10%', top: '20%' },
    { color: 'bg-fuchsia', size: 'w-[400px] h-[400px]', right: '10%', top: '10%' },
    { color: 'bg-aqua', size: 'w-[600px] h-[600px]', left: '40%', bottom: '10%' },
    { color: 'bg-lavender', size: 'w-[450px] h-[450px]', right: '30%', bottom: '20%' },
    { color: 'bg-orange', size: 'w-[300px] h-[300px]', left: '20%', top: '60%' },
  ];

  return (
    <div className="fixed inset-0 bg-[#030412] overflow-hidden -z-10 os-glitch-active">
      {/* Aurora Blobs */}
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`os-aurora-blob ${blob.color} ${blob.size}`}
          style={{
            left: blob.left,
            top: blob.top,
            right: blob.right,
            bottom: blob.bottom,
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="os-star shadow-[0_0_5px_white]"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            '--duration': star.duration,
          }}
        />
      ))}

      {/* CRT Effects */}
      <div className="os-crt-flicker" />
      <div className="os-scanline" />
    </div>
  );
};

export default Background;
