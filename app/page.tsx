'use client'

import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Scissors, SprayCan, Baby, Sparkles, Eye, Star, Phone, MessageCircle, MapPin, Instagram } from 'lucide-react'
import AnimatedText from '@/components/AnimatedText'
import MagneticButton from '@/components/MagneticButton'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import ParallaxImage from '@/components/ParallaxImage'
import Lightbox from '@/components/Lightbox'
import ScrollScissors from '@/components/ScrollScissors'

const services = [
  { icon: Scissors, name: 'Haarschnitt & Styling', desc: 'Präzisionsschnitt, individuell auf dich abgestimmt.', price: 'ab €25' },
  { icon: SprayCan, name: 'Bartrasur', desc: 'Klassische Nassrasur mit heißem Tuch für perfekte Konturen.', price: 'ab €20' },
  { icon: Baby, name: 'Kinderhaarschnitt', desc: 'Geduldig & kinderfreundlich — für die Kleinen.', price: 'ab €18' },
  { icon: Sparkles, name: 'Enthaarung Gesicht', desc: 'Sanfte Gesichtsenthaarung für ein glattes Ergebnis.', price: 'ab €15' },
  { icon: Star, name: 'Gesichtsmaske & Peeling', desc: 'Pflege pur — für ein frisches, strahlendes Hautbild.', price: 'ab €20' },
  { icon: Eye, name: 'Augenbrauen Styling', desc: 'Perfekt geformte Augenbrauen, die dein Gesicht betonen.', price: 'ab €10' },
]

const reviews = [
  { text: 'Bester Friseur in Götzis! Immer top Ergebnis.', author: 'Thomas M.' },
  { text: 'Seit 2 Jahren Stammkunde. Perfekter Fade jedes Mal.', author: 'Daniel K.' },
  { text: 'Super nettes Team, tolle Atmosphäre im Garnmarkt.', author: 'Michael R.' },
  { text: 'Mein Sohn liebt es hierher zu kommen. Sehr kinderfreundlich!', author: 'Sandra W.' },
]

const galleryImages = [
  'https://images.unsplash.com/photo-1585747860019-8e3e9b1c6c93?w=600',
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600',
  'https://images.unsplash.com/photo-1521490683712-35a1cb235d1c?w=600',
  'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600',
  'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600',
  'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600',
]

function FadeInSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = service.icon
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, borderColor: '#8b6f47' }}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-transparent transition-shadow hover:shadow-md"
    >
      <div className="w-12 h-12 rounded-xl bg-bg-secondary flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-accent" />
      </div>
      <h3 className="font-serif text-xl font-semibold mb-2">{service.name}</h3>
      <p className="text-muted text-sm leading-relaxed mb-4">{service.desc}</p>
      <p className="text-accent font-semibold text-lg">{service.price}</p>
    </motion.div>
  )
}

function ReviewCard({ review, index }: { review: typeof reviews[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-accent text-accent" />
        ))}
      </div>
      <p className="text-text leading-relaxed mb-4 italic">&ldquo;{review.text}&rdquo;</p>
      <p className="text-muted text-sm font-medium">— {review.author}</p>
    </motion.div>
  )
}

export default function Home() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1585747860019-8e3e9b1c6c93?w=1920&q=80"
            alt="Barber Shop Atmosphere"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-32 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-accent-light text-sm tracking-[0.3em] uppercase mb-4 font-medium">Premium Barber · Götzis</p>
            <h1 className="font-serif text-6xl sm:text-7xl lg:text-9xl font-bold tracking-tight leading-[0.9] mb-6 text-white">
              INFINITY
              <span className="block text-accent-light font-light text-3xl sm:text-4xl lg:text-5xl mt-2 tracking-wide">haircut</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-10 max-w-lg font-light leading-relaxed">
              Wo Handwerk auf Stil trifft. Dein Barber-Erlebnis im Herzen vom Garnmarkt.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-start gap-4 mb-10"
          >
            <a
              href="tel:+436766504191"
              className="inline-flex items-center justify-center px-10 py-5 bg-accent text-white font-medium rounded-full hover:bg-accent/90 transition-all duration-300 text-sm tracking-wider uppercase shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-105"
            >
              Termin buchen
            </a>
            <a
              href="#leistungen"
              className="inline-flex items-center text-sm text-white/60 hover:text-white transition-colors tracking-wider uppercase py-5"
            >
              Leistungen entdecken →
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/10"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent-light text-accent-light" />
              ))}
            </div>
            <span className="text-white text-sm font-medium">5.0</span>
            <span className="text-white/50 text-xs">· 150+ zufriedene Kunden</span>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1.5, y: { repeat: Infinity, duration: 2 } }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white/60"
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* SERVICES */}
      <section id="leistungen" className="py-20 md:py-32 bg-bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <AnimatedText
              text="UNSERE LEISTUNGEN"
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4"
            />
            <FadeInSection delay={0.3}>
              <p className="text-muted max-w-xl mx-auto">
                Von Haarschnitt bis Gesichtspflege — bei uns bist du in besten Händen.
              </p>
            </FadeInSection>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.name} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE/AFTER */}
      <section className="py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <AnimatedText
              text="WARUM INFINITY"
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4"
            />
            <FadeInSection delay={0.3}>
              <p className="text-muted">Zahlen die für sich sprechen</p>
            </FadeInSection>
          </div>
          <FadeInSection>
            <BeforeAfterSlider />
          </FadeInSection>
        </div>
      </section>

      {/* GALLERY */}
      <section id="galerie" className="py-20 md:py-32 bg-bg-secondary/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <AnimatedText
              text="EINBLICKE IN UNSEREN SALON"
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((src, i) => (
              <ParallaxImage
                key={i}
                src={src}
                alt={`Infinity Haircut Galerie ${i + 1}`}
                className={`${i % 3 === 1 ? 'aspect-[3/4]' : 'aspect-square'} cursor-pointer`}
                onClick={() => setLightboxSrc(src)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <AnimatedText
              text="WAS UNSERE KUNDEN SAGEN"
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4"
            />
            <FadeInSection delay={0.3}>
              <div className="flex items-center justify-center gap-3 mt-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-3xl font-serif font-bold">5.0</span>
                <span className="text-muted">aus 150+ Bewertungen</span>
              </div>
            </FadeInSection>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, i) => (
              <ReviewCard key={i} review={review} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <section id="kontakt" className="py-20 md:py-32 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <AnimatedText
              text="BESUCHE UNS"
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left - Info */}
            <FadeInSection>
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-semibold mb-1">INFINITY haircut</h3>
                  <p className="text-muted">Am Garnmarkt 10, 6840 Götzis</p>
                  <p className="text-muted text-sm">Infinity Haircut GmbH</p>
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="tel:+436766504191"
                    className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Jetzt anrufen</p>
                      <p className="text-xs text-muted">0676 6504191</p>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/436766504191"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <MessageCircle className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">WhatsApp</p>
                      <p className="text-xs text-muted">Schreib uns</p>
                    </div>
                  </a>
                  <a
                    href="https://www.google.com/maps/search/Am+Garnmarkt+10,+6840+Götzis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Route planen</p>
                      <p className="text-xs text-muted">Im Garnmarkt Götzis</p>
                    </div>
                  </a>
                  <a
                    href="https://instagram.com/infinity.haircut"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Instagram className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Instagram</p>
                      <p className="text-xs text-muted">@infinity.haircut</p>
                    </div>
                  </a>
                </div>

                {/* Opening Hours */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-serif text-lg font-semibold mb-4">Öffnungszeiten</h4>
                  <div className="space-y-2 text-sm">
                    {[
                      { day: 'Montag – Freitag', time: '09:00 – 19:00' },
                      { day: 'Samstag', time: '09:00 – 18:00' },
                      { day: 'Sonntag', time: 'Geschlossen' },
                    ].map((item) => (
                      <div key={item.day} className="flex justify-between">
                        <span className="text-muted">{item.day}</span>
                        <span className={`font-medium ${item.time === 'Geschlossen' ? 'text-red-400' : ''}`}>
                          {item.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Right - Map */}
            <FadeInSection delay={0.2}>
              <div className="rounded-2xl overflow-hidden shadow-sm h-[400px] lg:h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1354!2d9.6472025!3d47.335983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479b1f8e5c0b5555%3A0xa72b7d9e5c0b5555!2sAm+Garnmarkt+10%2C+6840+G%C3%B6tzis!5e0!3m2!1sde!2sat!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-text text-white/60">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-serif text-lg text-white/90 tracking-wider">INFINITY haircut</p>
          <p className="text-xs">© {new Date().getFullYear()} Infinity Haircut GmbH. Alle Rechte vorbehalten.</p>
        </div>
      </footer>

      {/* Lightbox */}
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </main>
  )
}
