"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const MatrixRain = ({ className }: { className?: string }) => {
  const [drops, setDrops] = useState<number[]>([]);

  useEffect(() => {
    // This code will only run on the client
    const columns = Math.floor(window.innerWidth / 20);
    setDrops(Array(columns).fill(1));

    const interval = setInterval(() => {
      setDrops(prevDrops => 
        prevDrops.map((drop, i) => {
          if (drop * 16 > window.innerHeight && Math.random() > 0.975) {
            return 0;
          }
          return drop + 1;
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        'absolute inset-0 z-0 overflow-hidden bg-background',
        className
      )}
      aria-hidden="true"
    >
      {drops.map((_, i) => {
        const left = `${i * 20}px`;
        // Create a column of characters
        return (
          <div
            key={i}
            className="absolute top-0 flex flex-col font-mono text-primary/30"
            style={{ left }}
          >
            {Array.from({ length: Math.ceil(window.innerHeight / 16) }).map((__, j) => (
              <span
                key={j}
                style={{
                  opacity: Math.random(),
                  animation: `fall ${Math.random() * 5 + 5}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              >
                {characters.charAt(Math.floor(Math.random() * characters.length))}
              </span>
            ))}
          </div>
        );
      })}
       <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
};

export default MatrixRain;
