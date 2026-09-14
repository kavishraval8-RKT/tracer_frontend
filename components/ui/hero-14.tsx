"use client"

import * as React from "react"
import { motion, type Variants } from "framer-motion"
import Balancer from "react-wrap-balancer"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Animation variants for staggered entrance
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
}

const mediaItemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
}

export interface Hero14Props {
  badge?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  primaryCta?: {
    text: string
    href: string
    icon?: React.ReactNode
  }
  secondaryCta?: {
    text: string
    href: string
  }
  media?: React.ReactNode
  className?: string
  backgroundGradient?: string
}

export function Hero14({
  badge,
  title,
  description,
  primaryCta,
  secondaryCta,
  media,
  className,
  backgroundGradient = "from-cyan-500 via-blue-400 to-orange-300",
}: Hero14Props) {
  return (
    <section className={cn("relative overflow-hidden pb-32 pt-24 lg:pb-40 lg:pt-32", className)}>
      {/* Vibrant Horizon Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient - vibrant blue to orange */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-blue-800 to-orange-500/50" />
        {/* Atmospheric layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-orange-400/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-orange-300/30 via-transparent to-transparent" />
        {/* Mountain silhouette */}
        <svg
          className="absolute bottom-0 h-64 w-full opacity-30"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(0,0,0,0.15)"
            d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,165.3C672,171,768,149,864,144C960,139,1056,149,1152,165.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        {/* Radial glow */}
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-blue-400/20 via-transparent to-transparent blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-7xl px-6 lg:px-8"
      >
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          {badge && (
            <motion.div variants={itemVariants} className="mb-6 flex justify-center">
              {badge}
            </motion.div>
          )}

          {/* Headline - Pure White with Heavy Drop Shadow */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-6xl font-semibold tracking-tight text-white lg:text-8xl"
            style={{
              textShadow: "0 10px 40px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3)",
              filter: "drop-shadow(0 0 30px rgba(255,255,255,0.3))",
            }}
          >
            <Balancer>{title}</Balancer>
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              variants={itemVariants}
              className="mx-auto mb-10 max-w-2xl text-balance text-xl text-white/95 lg:text-2xl"
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              <Balancer>{description}</Balancer>
            </motion.p>
          )}

          {/* CTAs */}
          {(primaryCta || secondaryCta) && (
            <motion.div
              variants={itemVariants}
              className="mb-16 flex flex-wrap items-center justify-center gap-4"
            >
              {primaryCta && (
                <a
                  href={primaryCta.href}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-blue-600 px-8 py-3 font-medium text-white shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] transition-all hover:scale-105 hover:bg-blue-500 hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)]"
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  {primaryCta.icon}
                  {primaryCta.text}
                </a>
              )}
              {secondaryCta && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-2 border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                >
                  <a href={secondaryCta.href}>{secondaryCta.text}</a>
                </Button>
              )}
            </motion.div>
          )}
        </div>

        {/* Media Section */}
        {media && (
          <motion.div variants={mediaItemVariants} className="relative">
            {media}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
