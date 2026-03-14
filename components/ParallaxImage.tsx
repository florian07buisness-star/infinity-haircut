'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  onClick?: () => void
}

export default function ParallaxImage({ src, alt, className = '', onClick }: ParallaxImageProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-xl ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
    >
      <motion.div style={{ y }} className="absolute inset-[-20%]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          unoptimized
        />
      </motion.div>
    </motion.div>
  )
}
