'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'

interface LightboxProps {
  src: string | null
  onClose: () => void
}

export default function Lightbox({ src, onClose }: LightboxProps) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button className="absolute top-6 right-6 text-white p-2" onClick={onClose}>
            <X size={32} />
          </button>
          <motion.div
            className="relative w-full max-w-4xl aspect-[4/3]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt="Gallery image"
              fill
              className="object-contain rounded-lg"
              unoptimized
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
