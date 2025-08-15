"use client"

import { useEffect, useRef } from "react"

interface AnimatedElement {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  type: "cow" | "chicken" | "sheep" | "horse" | "pig" | "windmill" | "barn" | "fence" | "crop" | "tractor"
  angle: number
  animationOffset: number
  phase: number
}

export default function AnimatedFarmBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const elementsRef = useRef<AnimatedElement[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createElements = () => {
      const elements: AnimatedElement[] = []

      // Add cows (gentle movement, low opacity)
      for (let i = 0; i < 2; i++) {
        elements.push({
          x: Math.random() * canvas.width,
          y: canvas.height * 0.7 + Math.random() * canvas.height * 0.2,
          vx: (Math.random() - 0.5) * 0.05,
          vy: 0,
          size: 10 + Math.random() * 6,
          opacity: 0.10 + Math.random() * 0.05,
          color: ["#2d2d2d", "#8b4513", "#f5f5f5"][Math.floor(Math.random() * 3)],
          type: "cow",
          angle: 0,
          animationOffset: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2,
        })
      }

      // Add chickens (small, subtle pecking animation)
      for (let i = 0; i < 3; i++) {
        elements.push({
          x: Math.random() * canvas.width,
          y: canvas.height * 0.8 + Math.random() * canvas.height * 0.1,
          vx: (Math.random() - 0.5) * 0.03,
          vy: 0,
          size: 4 + Math.random() * 2,
          opacity: 0.12 + Math.random() * 0.06,
          color: ["#cd853f", "#ffd700", "#f4a460"][Math.floor(Math.random() * 3)],
          type: "chicken",
          angle: 0,
          animationOffset: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2,
        })
      }

      // Add sheep (gentle grazing)
      for (let i = 0; i < 3; i++) {
        elements.push({
          x: Math.random() * canvas.width,
          y: canvas.height * 0.7 + Math.random() * canvas.height * 0.2,
          vx: (Math.random() - 0.5) * 0.04,
          vy: 0,
          size: 8 + Math.random() * 4,
          opacity: 0.10 + Math.random() * 0.05,
          color: "#f5f5f5",
          type: "sheep",
          angle: 0,
          animationOffset: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2,
        })
      }

      // Add horses (slow walking)
      for (let i = 0; i < 2; i++) {
        elements.push({
          x: Math.random() * canvas.width,
          y: canvas.height * 0.6 + Math.random() * canvas.height * 0.2,
          vx: (Math.random() - 0.5) * 0.06,
          vy: 0,
          size: 12 + Math.random() * 6,
          opacity: 0.11 + Math.random() * 0.05,
          color: ["#8b4513", "#a0522d", "#cd853f"][Math.floor(Math.random() * 3)],
          type: "horse",
          angle: 0,
          animationOffset: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2,
        })
      }

      // Add pigs (subtle movement)
      for (let i = 0; i < 2; i++) {
        elements.push({
          x: Math.random() * canvas.width,
          y: canvas.height * 0.75 + Math.random() * canvas.height * 0.15,
          vx: (Math.random() - 0.5) * 0.04,
          vy: 0,
          size: 7 + Math.random() * 3,
          opacity: 0.10 + Math.random() * 0.05,
          color: "#ffc0cb",
          type: "pig",
          angle: 0,
          animationOffset: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2,
        })
      }

      // Add windmills (slow rotating blades)
      for (let i = 0; i < 1; i++) {
        elements.push({
          x: Math.random() * canvas.width * 0.5 + canvas.width * 0.25,
          y: canvas.height * 0.4 + Math.random() * canvas.height * 0.2,
          vx: 0,
          vy: 0,
          size: 20 + Math.random() * 10,
          opacity: 0.08 + Math.random() * 0.04,
          color: "#a9a9a9",
          type: "windmill",
          angle: 0,
          animationOffset: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2,
        })
      }

      // Add barns (static, distant)
      for (let i = 0; i < 1; i++) {
        elements.push({
          x: Math.random() * canvas.width * 0.5 + canvas.width * 0.25,
          y: canvas.height * 0.5 + Math.random() * canvas.height * 0.1,
          vx: 0,
          vy: 0,
          size: 25 + Math.random() * 15,
          opacity: 0.09 + Math.random() * 0.04,
          color: "#b22222",
          type: "barn",
          angle: 0,
          animationOffset: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2,
        })
      }

      // Add fences (static lines)
      for (let i = 0; i < 5; i++) {
        elements.push({
          x: Math.random() * canvas.width,
          y: canvas.height * 0.75 + Math.random() * canvas.height * 0.1,
          vx: 0,
          vy: 0,
          size: 15 + Math.random() * 5,
          opacity: 0.07 + Math.random() * 0.03,
          color: "#8b4513",
          type: "fence",
          angle: 0,
          animationOffset: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2,
        })
      }

      // Add crops (swaying gently)
      for (let i = 0; i < 15; i++) {
        elements.push({
          x: Math.random() * canvas.width,
          y: canvas.height * 0.8 + Math.random() * canvas.height * 0.15,
          vx: 0,
          vy: 0,
          size: 6 + Math.random() * 4,
          opacity: 0.08 + Math.random() * 0.04,
          color: ["#ffd700", "#f0e68c", "#bdb76b"][Math.floor(Math.random() * 3)],
          type: "crop",
          angle: 0,
          animationOffset: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2,
        })
      }

      // Add tractors (slow moving)
      for (let i = 0; i < 1; i++) {
        elements.push({
          x: Math.random() * canvas.width,
          y: canvas.height * 0.7 + Math.random() * canvas.height * 0.1,
          vx: 0.1 + Math.random() * 0.05,
          vy: 0,
          size: 15 + Math.random() * 5,
          opacity: 0.10 + Math.random() * 0.05,
          color: "#008000",
          type: "tractor",
          angle: 0,
          animationOffset: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2,
        })
      }

      elementsRef.current = elements
    }

    const drawCow = (element: AnimatedElement, time: number) => {
      ctx.save()
      ctx.globalAlpha = element.opacity
      ctx.fillStyle = element.color

      // Cow body
      ctx.beginPath()
      ctx.ellipse(element.x, element.y, element.size * 1.2, element.size * 0.8, 0, 0, Math.PI * 2)
      ctx.fill()

      // Head
      ctx.beginPath()
      ctx.arc(element.x - element.size * 1.0, element.y - element.size * 0.2, element.size * 0.5, 0, Math.PI * 2)
      ctx.fill()

      // Gentle grazing motion
      const graze = Math.sin(time * 1.5 + element.animationOffset) * 0.1
      ctx.translate(element.x - element.size * 1.0, element.y - element.size * 0.2)
      ctx.rotate(graze)
      ctx.translate(-(element.x - element.size * 1.0), -(element.y - element.size * 0.2))

      ctx.restore()
    }

    const drawChicken = (element: AnimatedElement, time: number) => {
      ctx.save()
      ctx.globalAlpha = element.opacity
      ctx.fillStyle = element.color

      // Chicken body
      ctx.beginPath()
      ctx.arc(element.x, element.y, element.size * 0.8, 0, Math.PI * 2)
      ctx.fill()

      // Head
      ctx.beginPath()
      ctx.arc(element.x - element.size * 0.5, element.y - element.size * 0.5, element.size * 0.4, 0, Math.PI * 2)
      ctx.fill()

      // Pecking animation
      const peck = Math.sin(time * 3 + element.animationOffset) * 0.15
      ctx.translate(element.x - element.size * 0.5, element.y - element.size * 0.5)
      ctx.rotate(peck)
      ctx.translate(-(element.x - element.size * 0.5), -(element.y - element.size * 0.5))

      ctx.restore()
    }

    const drawSheep = (element: AnimatedElement, time: number) => {
      ctx.save()
      ctx.globalAlpha = element.opacity
      ctx.fillStyle = element.color

      // Sheep body (fluffy)
      ctx.beginPath()
      ctx.ellipse(element.x, element.y, element.size * 1.0, element.size * 0.7, 0, 0, Math.PI * 2)
      ctx.fill()

      // Head
      ctx.fillStyle = "#2d2d2d"
      ctx.beginPath()
      ctx.arc(element.x - element.size * 0.8, element.y - element.size * 0.1, element.size * 0.3, 0, Math.PI * 2)
      ctx.fill()

      // Gentle movement
      const sway = Math.sin(time * 1.2 + element.animationOffset) * 0.05

      ctx.restore()
    }

    const drawHorse = (element: AnimatedElement, time: number) => {
      ctx.save()
      ctx.globalAlpha = element.opacity
      ctx.fillStyle = element.color

      // Horse body
      ctx.beginPath()
      ctx.ellipse(element.x, element.y, element.size * 1.5, element.size * 0.8, 0, 0, Math.PI * 2)
      ctx.fill()

      // Head
      ctx.beginPath()
      ctx.ellipse(element.x - element.size * 1.2, element.y - element.size * 0.3, element.size * 0.6, element.size * 0.4, -0.2, 0, Math.PI * 2)
      ctx.fill()

      // Walking animation
      const walk = Math.sin(time * 2 + element.animationOffset) * 0.1

      ctx.restore()
    }

    const drawPig = (element: AnimatedElement, time: number) => {
      ctx.save()
      ctx.globalAlpha = element.opacity
      ctx.fillStyle = element.color

      // Pig body
      ctx.beginPath()
      ctx.arc(element.x, element.y, element.size, 0, Math.PI * 2)
      ctx.fill()

      // Snout
      ctx.beginPath()
      ctx.arc(element.x - element.size * 0.8, element.y, element.size * 0.3, 0, Math.PI * 2)
      ctx.fill()

      // Subtle rooting animation
      const root = Math.sin(time * 1.8 + element.animationOffset) * 0.08

      ctx.restore()
    }

    const drawWindmill = (element: AnimatedElement, time: number) => {
      ctx.save()
      ctx.globalAlpha = element.opacity
      ctx.fillStyle = element.color

      // Tower
      ctx.fillRect(element.x - element.size * 0.1, element.y, element.size * 0.2, element.size * 0.8)

      // Blades (rotating slowly)
      ctx.strokeStyle = element.color
      ctx.lineWidth = 2
      const rotation = time * 0.5 + element.animationOffset
      for (let j = 0; j < 4; j++) {
        ctx.beginPath()
        ctx.moveTo(element.x, element.y)
        ctx.lineTo(
          element.x + Math.cos(rotation + j * Math.PI / 2) * element.size,
          element.y + Math.sin(rotation + j * Math.PI / 2) * element.size
        )
        ctx.stroke()
      }

      ctx.restore()
    }

    const drawBarn = (element: AnimatedElement, time: number) => {
      ctx.save()
      ctx.globalAlpha = element.opacity
      ctx.fillStyle = element.color

      // Barn base
      ctx.fillRect(element.x - element.size * 0.8, element.y, element.size * 1.6, element.size * 0.6)

      // Roof
      ctx.beginPath()
      ctx.moveTo(element.x - element.size * 0.8, element.y)
      ctx.lineTo(element.x, element.y - element.size * 0.8)
      ctx.lineTo(element.x + element.size * 0.8, element.y)
      ctx.fill()

      ctx.restore()
    }

    const drawFence = (element: AnimatedElement, time: number) => {
      ctx.save()
      ctx.globalAlpha = element.opacity
      ctx.strokeStyle = element.color
      ctx.lineWidth = 1

      // Horizontal rails
      ctx.beginPath()
      ctx.moveTo(element.x - element.size, element.y - element.size * 0.2)
      ctx.lineTo(element.x + element.size, element.y - element.size * 0.2)
      ctx.moveTo(element.x - element.size, element.y + element.size * 0.2)
      ctx.lineTo(element.x + element.size, element.y + element.size * 0.2)
      ctx.stroke()

      // Vertical posts
      for (let j = -1; j <= 1; j++) {
        ctx.beginPath()
        ctx.moveTo(element.x + j * element.size * 0.8, element.y - element.size * 0.4)
        ctx.lineTo(element.x + j * element.size * 0.8, element.y + element.size * 0.4)
        ctx.stroke()
      }

      ctx.restore()
    }

    const drawCrop = (element: AnimatedElement, time: number) => {
      ctx.save()
      ctx.globalAlpha = element.opacity
      ctx.strokeStyle = element.color
      ctx.lineWidth = 1

      // Swaying stalk
      const sway = Math.sin(time * 1.0 + element.animationOffset) * 0.1
      ctx.beginPath()
      ctx.moveTo(element.x, element.y + element.size)
      ctx.quadraticCurveTo(element.x + sway * element.size, element.y + element.size * 0.5, element.x + sway * element.size * 1.5, element.y - element.size)
      ctx.stroke()

      // Grain head
      ctx.fillStyle = element.color
      ctx.beginPath()
      ctx.ellipse(element.x + sway * element.size * 1.5, element.y - element.size, element.size * 0.3, element.size * 0.5, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.restore()
    }

    const drawTractor = (element: AnimatedElement, time: number) => {
      ctx.save()
      ctx.globalAlpha = element.opacity
      ctx.fillStyle = element.color

      // Tractor body
      ctx.fillRect(element.x - element.size * 0.8, element.y - element.size * 0.3, element.size * 1.6, element.size * 0.6)

      // Wheels
      ctx.fillStyle = "#2d2d2d"
      ctx.beginPath()
      ctx.arc(element.x - element.size * 0.5, element.y + element.size * 0.3, element.size * 0.4, 0, Math.PI * 2)
      ctx.arc(element.x + element.size * 0.5, element.y + element.size * 0.3, element.size * 0.3, 0, Math.PI * 2)
      ctx.fill()

      // Subtle rolling
      const roll = time * 2 + element.animationOffset

      ctx.restore()
    }

    const drawElement = (element: AnimatedElement, time: number) => {
      switch (element.type) {
        case "cow":
          drawCow(element, time)
          break
        case "chicken":
          drawChicken(element, time)
          break
        case "sheep":
          drawSheep(element, time)
          break
        case "horse":
          drawHorse(element, time)
          break
        case "pig":
          drawPig(element, time)
          break
        case "windmill":
          drawWindmill(element, time)
          break
        case "barn":
          drawBarn(element, time)
          break
        case "fence":
          drawFence(element, time)
          break
        case "crop":
          drawCrop(element, time)
          break
        case "tractor":
          drawTractor(element, time)
          break
      }
    }

    const animate = () => {
      // More subtle fade effect for less visibility
      ctx.fillStyle = "rgba(255, 255, 255, 0.015)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001

      elementsRef.current.forEach((element) => {
        // Slower, gentler movements
        element.x += element.vx * 0.5
        element.y += element.vy * 0.5

        // Subtle floating/sway for some elements
        if (element.type === "crop") {
          element.angle += 0.002
        }

        // Wrap around for moving elements
        if (element.x > canvas.width + element.size) {
          element.x = -element.size
        }
        if (element.x < -element.size) {
          element.x = canvas.width + element.size
        }

        // Reduced opacity variation
        const baseOpacity = element.opacity
        element.opacity = baseOpacity + Math.sin(time * 0.8 + element.phase) * baseOpacity * 0.1

        drawElement(element, time)

        element.opacity = baseOpacity
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createElements()

    setTimeout(() => {
      animate()
    }, 100)

    const handleResize = () => {
      resizeCanvas()
      createElements()
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
        background: "linear-gradient(to bottom, #fef7ed 0%, #fefce8 30%, #f0fdf4 70%, #ecfdf5 100%)",
        width: "100%",
        height: "100%",
      }}
    />
  )
}