import React from 'react';

interface CortexLogoIconProps {
  className?: string;
}

export const CortexLogoIcon: React.FC<CortexLogoIconProps> = ({ className = "h-9 w-9" }) => {
  return (
    <svg 
      viewBox="0 0 100 85" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        <linearGradient id="cortexGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
        
        <linearGradient id="cortexGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>

        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#67e8f9" stopOpacity="1" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </radialGradient>

        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Main Outer Brain Shell Contours */}
      <path 
        d="M 16 42 C 10 24 30 10 56 12 C 76 14 92 28 92 46 C 92 64 78 78 58 79 C 48 80 43 89 36 85 C 30 81 37 70 30 66 C 22 64 15 54 16 42 Z" 
        stroke="url(#cortexGrad1)" 
        strokeWidth="3.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]"
      />

      <path 
        d="M 28 20 C 42 12 68 14 82 28" 
        stroke="url(#cortexGrad2)" 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />

      <path 
        d="M 44 80 C 56 81 72 76 82 66" 
        stroke="url(#cortexGrad1)" 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />

      {/* Eye Structure on Right Hemisphere */}
      {/* Outer Eye Outline */}
      <path 
        d="M 46 46 Q 66 26 86 46 Q 66 66 46 46 Z" 
        stroke="url(#cortexGrad1)" 
        strokeWidth="3" 
        fill="#0284c7" 
        fillOpacity="0.1" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        filter="url(#neonGlow)"
      />

      {/* Iris Circle */}
      <circle 
        cx="66" 
        cy="46" 
        r="11" 
        stroke="url(#cortexGrad2)" 
        strokeWidth="2.5" 
        fill="#082f49" 
        fillOpacity="0.6" 
      />

      {/* Pupil Circle */}
      <circle 
        cx="66" 
        cy="46" 
        r="4.5" 
        fill="#22d3ee" 
      />

      {/* Pupil Catchlight Reflection Dot */}
      <circle 
        cx="68" 
        cy="44" 
        r="1.5" 
        fill="#ffffff" 
      />

      {/* Left Hemisphere Neural Network Nodes & Connections */}
      <g filter="url(#neonGlow)">
        {/* Connection Lines */}
        <line x1="24" y1="34" x2="36" y2="26" stroke="#22d3ee" strokeWidth="2" opacity="0.85" />
        <line x1="36" y1="26" x2="44" y2="38" stroke="#22d3ee" strokeWidth="2" opacity="0.85" />
        <line x1="24" y1="34" x2="22" y2="48" stroke="#22d3ee" strokeWidth="2" opacity="0.85" />
        <line x1="22" y1="48" x2="34" y2="44" stroke="#22d3ee" strokeWidth="2" opacity="0.85" />
        <line x1="34" y1="44" x2="44" y2="38" stroke="#22d3ee" strokeWidth="2" opacity="0.85" />
        <line x1="34" y1="44" x2="42" y2="54" stroke="#22d3ee" strokeWidth="2" opacity="0.85" />
        <line x1="22" y1="48" x2="30" y2="60" stroke="#22d3ee" strokeWidth="2" opacity="0.85" />
        <line x1="30" y1="60" x2="42" y2="54" stroke="#22d3ee" strokeWidth="2" opacity="0.85" />
        
        {/* Lines connecting Neural Network to the Eye */}
        <line x1="44" y1="38" x2="56" y2="34" stroke="#38bdf8" strokeWidth="2" opacity="0.9" />
        <line x1="42" y1="54" x2="66" y2="46" stroke="#38bdf8" strokeWidth="2" opacity="0.9" />
        <line x1="34" y1="44" x2="46" y2="46" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2 2" opacity="0.8" />

        {/* Neural Nodes (Circles with glowing centers) */}
        <circle cx="24" cy="34" r="3.5" fill="#22d3ee" stroke="#082f49" strokeWidth="1" />
        <circle cx="36" cy="26" r="3.5" fill="#67e8f9" stroke="#082f49" strokeWidth="1" />
        <circle cx="44" cy="38" r="4" fill="#22d3ee" stroke="#082f49" strokeWidth="1" />
        <circle cx="22" cy="48" r="3.5" fill="#38bdf8" stroke="#082f49" strokeWidth="1" />
        <circle cx="34" cy="44" r="4.5" fill="#67e8f9" stroke="#082f49" strokeWidth="1" />
        <circle cx="42" cy="54" r="3.5" fill="#22d3ee" stroke="#082f49" strokeWidth="1" />
        <circle cx="30" cy="60" r="3" fill="#38bdf8" stroke="#082f49" strokeWidth="1" />
        
        {/* Node on eye boundary */}
        <circle cx="56" cy="34" r="3" fill="#67e8f9" />
      </g>
    </svg>
  );
};
