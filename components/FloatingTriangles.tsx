'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const colors = [
  'from-emerald-400 to-teal-500',
  'from-teal-400 to-emerald-500',
  'from-violet-400 to-purple-500',
  'from-rose-400 to-pink-500',
  'from-amber-400 to-orange-500',
  'from-lime-400 to-green-500',
];

interface Triangle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
}

function generateTriangles(count: number): Triangle[] {
  const triangles: Triangle[] = [];
  for (let i = 0; i < count; i++) {
    triangles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 20,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      rotate: Math.random() * 360,
    });
  }
  return triangles;
}

export default function FloatingTriangles() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const triangles = useMemo(() => {
    return generateTriangles(typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 15);
  }, []);

  if (!isMounted) {
    return <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none" />;
  }

  return (
    <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
      {triangles.map((triangle) => (
        <motion.div
          key={triangle.id}
          className="absolute opacity-[0.06] dark:opacity-[0.08]"
          style={{
            left: `${triangle.x}%`,
            top: `${triangle.y}%`,
            width: 0,
            height: 0,
            borderLeft: `${triangle.size / 2}px solid transparent`,
            borderRight: `${triangle.size / 2}px solid transparent`,
            borderBottom: `${triangle.size}px solid`,
            borderBottomColor: 'currentColor',
            filter: 'blur(1px)',
          }}
          initial={{ 
            y: 0, 
            rotate: triangle.rotate,
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 15, 0, -15, 0],
            rotate: [triangle.rotate, triangle.rotate + 180],
            scale: [0.5, 1, 0.8, 1, 0.5],
            opacity: [0, 0.15, 0.1, 0.15, 0],
          }}
          transition={{
            duration: triangle.duration,
            delay: triangle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className={`absolute inset-0 bg-gradient-to-b ${colors[triangle.id % colors.length]} blur-sm`} />
        </motion.div>
      ))}
    </div>
  );
}
