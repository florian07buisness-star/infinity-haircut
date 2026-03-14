'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { Users, Star, Scissors, Clock, Award, Instagram } from 'lucide-react'

function Counter({ from = 0, to, suffix = '', prefix = '', duration = 2 }: { from?: number; to: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView || !ref.current) return
    const controls = animate(from, to, {
      duration: duration || 4,
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(value)}${suffix}`
        }
      },
    })
    return () => controls.stop()
  }, [inView, from, to, suffix, prefix, duration])

  return <span ref={ref}>{prefix}{from}{suffix}</span>
}

const stats = [
  { icon: Users, value: 150, suffix: '+', label: 'Zufriedene Kunden', desc: 'und es werden täglich mehr' },
  { icon: Star, value: 5, suffix: '.0', label: 'Google Rating', desc: 'Bestnote aus echten Bewertungen' },
  { icon: Scissors, value: 6, suffix: '+', label: 'Services', desc: 'von Haarschnitt bis Gesichtspflege' },
  { icon: Clock, value: 10, suffix: 'h', label: 'Geöffnet täglich', desc: 'Mo-Fr 09-19, Sa 09-18' },
]

export default function BeforeAfterSlider() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <div ref={sectionRef}>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm text-center group hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Icon className="w-6 h-6 text-accent" />
              </div>
              <div className="font-serif text-4xl md:text-5xl font-bold text-text mb-1">
                <Counter to={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-medium text-sm text-text mb-1">{stat.label}</p>
              <p className="text-xs text-muted">{stat.desc}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Instagram CTA */}
      <motion.a
        href="https://instagram.com/infinity.haircut"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="flex items-center justify-center gap-3 bg-gradient-to-r from-accent/5 to-accent/10 rounded-2xl p-6 hover:from-accent/10 hover:to-accent/20 transition-all group"
      >
        <Instagram className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
        <div className="text-center">
          <p className="font-medium text-text">Unsere Transformationen auf Instagram</p>
          <p className="text-sm text-muted">@infinity.haircut · Echte Ergebnisse, echte Kunden</p>
        </div>
        <span className="text-accent font-medium hidden sm:block">→</span>
      </motion.a>
    </div>
  )
}
