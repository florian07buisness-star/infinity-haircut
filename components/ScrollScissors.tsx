'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollScissors() {
  const { scrollYProgress } = useScroll()
  
  const rotateY = useTransform(scrollYProgress, [0, 0.3], [0, 360])
  const rotateX = useTransform(scrollYProgress, [0, 0.3], [0, 15])
  const scale = useTransform(scrollYProgress, [0, 0.15], [1, 0.6])
  const opacity = useTransform(scrollYProgress, [0.2, 0.35], [1, 0])

  return (
    <motion.div
      className="absolute right-[5%] top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none"
      style={{
        rotateY,
        rotateX,
        scale,
        opacity,
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Metallic Scissors SVG */}
      <svg
        width="320"
        height="320"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
      >
        {/* Blade 1 */}
        <defs>
          <linearGradient id="blade1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c4a87c" />
            <stop offset="50%" stopColor="#8b6f47" />
            <stop offset="100%" stopColor="#6b5230" />
          </linearGradient>
          <linearGradient id="blade2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d4b88c" />
            <stop offset="50%" stopColor="#9b7f57" />
            <stop offset="100%" stopColor="#7b6240" />
          </linearGradient>
          <linearGradient id="handle" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b6f47" />
            <stop offset="100%" stopColor="#6b5230" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Top Blade */}
        <path
          d="M100 95 L170 30 Q175 25 172 22 L168 20 Q165 18 160 22 L100 85Z"
          fill="url(#blade1)"
          stroke="#c4a87c"
          strokeWidth="0.5"
        />
        {/* Top blade edge highlight */}
        <path
          d="M100 90 L165 28"
          stroke="#e8d5b0"
          strokeWidth="0.8"
          opacity="0.6"
        />
        
        {/* Bottom Blade */}
        <path
          d="M100 105 L170 170 Q175 175 172 178 L168 180 Q165 182 160 178 L100 115Z"
          fill="url(#blade2)"
          stroke="#c4a87c"
          strokeWidth="0.5"
        />
        {/* Bottom blade edge highlight */}
        <path
          d="M100 110 L165 172"
          stroke="#e8d5b0"
          strokeWidth="0.8"
          opacity="0.6"
        />
        
        {/* Top Handle (ring) */}
        <ellipse
          cx="55"
          cy="55"
          rx="28"
          ry="25"
          fill="none"
          stroke="url(#handle)"
          strokeWidth="8"
        />
        <ellipse
          cx="55"
          cy="55"
          rx="28"
          ry="25"
          fill="none"
          stroke="#c4a87c"
          strokeWidth="1"
          opacity="0.4"
        />
        
        {/* Bottom Handle (ring) */}
        <ellipse
          cx="55"
          cy="145"
          rx="28"
          ry="25"
          fill="none"
          stroke="url(#handle)"
          strokeWidth="8"
        />
        <ellipse
          cx="55"
          cy="145"
          rx="28"
          ry="25"
          fill="none"
          stroke="#c4a87c"
          strokeWidth="1"
          opacity="0.4"
        />

        {/* Connection bars */}
        <path
          d="M75 68 L100 95"
          stroke="url(#blade1)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M75 132 L100 105"
          stroke="url(#blade2)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        
        {/* Pivot screw */}
        <circle cx="100" cy="100" r="8" fill="url(#handle)" filter="url(#glow)" />
        <circle cx="100" cy="100" r="5" fill="#c4a87c" />
        <circle cx="100" cy="100" r="2" fill="#e8d5b0" opacity="0.8" />
        
        {/* Screw cross detail */}
        <line x1="97" y1="100" x2="103" y2="100" stroke="#8b6f47" strokeWidth="1" />
        <line x1="100" y1="97" x2="100" y2="103" stroke="#8b6f47" strokeWidth="1" />
      </svg>
    </motion.div>
  )
}
