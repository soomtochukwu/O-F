"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  type: "seed" | "pollen" | "leaf"
  angle: number
}

export default function AnimatedFarmBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.min(25, Math.floor(window.innerWidth / 50)) // Fewer but more visible particles

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5, // Slightly faster movement
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 3 + 1.5, // Slightly larger particles
          opacity: Math.random() * 0.15 + 0.1, // More visible opacity
          color: ["#86efac", "#bbf7d0", "#dcfce7", "#f0fdf4"][Math.floor(Math.random() * 4)],
          type: ["seed", "pollen", "leaf"][Math.floor(Math.random() * 3)] as "seed" | "pollen" | "leaf",
          angle: Math.random() * Math.PI * 2,
        })
      }

      particlesRef.current = particles
    }

    const drawParticle = (particle: Particle) => {
      ctx.save()
      ctx.globalAlpha = particle.opacity
      ctx.fillStyle = particle.color

      if (particle.type === "seed") {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      } else if (particle.type === "pollen") {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 0.7, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.translate(particle.x, particle.y)
        ctx.rotate(particle.angle)
        ctx.beginPath()
        ctx.ellipse(0, 0, particle.size, particle.size * 1.5, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.setTransform(1, 0, 0, 1, 0, 0) // Reset transform
      }

      ctx.restore()
    }

    const drawFieldLines = () => {
      ctx.save()
      ctx.strokeStyle = "#f0fdf4"
      ctx.globalAlpha = 0.08 // Slightly more visible field lines
      ctx.lineWidth = 1

      for (let i = 0; i < 4; i++) {
        const y = (canvas.height / 5) * (i + 1)
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      ctx.restore()
    }

    const animate = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.02)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw subtle field lines
      drawFieldLines()

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        const time = Date.now() * 0.001
        particle.y += Math.sin(time + particle.x * 0.01) * 0.2
        particle.x += Math.cos(time + particle.y * 0.01) * 0.1

        if (particle.type === "leaf") {
          particle.angle += 0.01
        }

        // Wrap around screen
        if (particle.x > canvas.width + 20) particle.x = -20
        if (particle.x < -20) particle.x = canvas.width + 20
        if (particle.y > canvas.height + 20) particle.y = -20
        if (particle.y < -20) particle.y = canvas.height + 20

        particle.opacity = 0.1 + Math.sin(time * 2 + particle.x * 0.01) * 0.05

        drawParticle(particle)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createParticles()

    setTimeout(() => {
      animate()
    }, 100)

    const handleResize = () => {
      resizeCanvas()
      createParticles()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: "transparent",
        width: "100%",
        height: "100%",
      }}
    />
  )
}
