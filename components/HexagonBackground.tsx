'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface Hexagon {
  x: number
  y: number
  size: number
  opacity: number
  rotation: number
  baseX?: number
  baseY?: number
}

export default function HexagonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosRef = useRef({ x: 0, y: 0 })
  const scrollPosRef = useRef({ x: 0, y: 0 })
  const hexagonsRef = useRef<Hexagon[]>([])
  const animationFrameRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const isMobileRef = useRef(false)

  // Detect mobile device
  useEffect(() => {
    isMobileRef.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768
  }, [])

  // Throttled mouse/touch handler
  const handlePointerMove = useCallback((x: number, y: number) => {
    mousePosRef.current = { x, y }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const initializeHexagons = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      // Initialize hexagons - more particles for richer background
      const hexCount = isMobileRef.current ? 30 : 60
      const baseSize = isMobileRef.current ? 25 : 35
      const sizeRange = isMobileRef.current ? 35 : 50

      // Better distribution - use grid-like spacing to avoid clustering
      const cols = Math.ceil(Math.sqrt(hexCount * (width / height)))
      const rows = Math.ceil(hexCount / cols)
      const cellWidth = width / cols
      const cellHeight = height / rows

      hexagonsRef.current = Array.from({ length: hexCount }, (_, i) => {
        // Grid-based positioning with random offset to avoid perfect grid
        const col = i % cols
        const row = Math.floor(i / cols)
        const baseX = col * cellWidth + cellWidth / 2
        const baseY = row * cellHeight + cellHeight / 2
        
        // Add random offset within cell (max 40% of cell size)
        const offsetX = (Math.random() - 0.5) * cellWidth * 0.4
        const offsetY = (Math.random() - 0.5) * cellHeight * 0.4
        
        return {
          x: baseX + offsetX,
          y: baseY + offsetY,
          size: baseSize + Math.random() * sizeRange,
          opacity: 0.05 + Math.random() * 0.1,
          rotation: Math.random() * Math.PI * 2,
          baseX: baseX, // Store original position for floating effect
          baseY: baseY,
        }
      })
    }

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight
      
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      
      // Reinitialize hexagons on resize to distribute them properly
      initializeHexagons()
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Optimized draw function - cache calculations
    const drawHexagon = (
      x: number,
      y: number,
      size: number,
      opacity: number,
      rotation: number
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.beginPath()
      
      // Pre-calculate hexagon points
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const hx = size * Math.cos(angle)
        const hy = size * Math.sin(angle)
        if (i === 0) ctx.moveTo(hx, hy)
        else ctx.lineTo(hx, hy)
      }
      ctx.closePath()
      ctx.strokeStyle = `rgba(201, 169, 97, ${opacity})`
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.restore()
    }

    let lastUpdate = 0
    const animationThrottleDelay = 50 // Same responsiveness on mobile and desktop

    const animate = (currentTime: number) => {
      // Throttle updates
      if (currentTime - lastUpdate < animationThrottleDelay) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }
      lastUpdate = currentTime

      const width = window.innerWidth
      const height = window.innerHeight
      ctx.clearRect(0, 0, width, height)

      const time = currentTime * 0.001
      const mouseX = mousePosRef.current.x
      const mouseY = mousePosRef.current.y
      const scrollX = scrollPosRef.current.x
      const scrollY = scrollPosRef.current.y
      
      // Increased interaction radius and intensity for mobile
      const maxDistance = isMobileRef.current ? 350 : 400
      const parallaxIntensity = isMobileRef.current ? 35 : 40
      const repulsionStrength = isMobileRef.current ? 45 : 50

      hexagonsRef.current.forEach((hex, index) => {
        // Calculate interaction point - combine mouse/touch and scroll on mobile
        let interactionX = mouseX
        let interactionY = mouseY
        
        if (isMobileRef.current && (scrollX !== 0 || scrollY !== 0)) {
          // On mobile, blend touch position with scroll influence
          const scrollInfluence = 0.3 // 30% influence from scroll
          const touchInfluence = 0.7 // 70% influence from touch
          interactionX = mouseX * touchInfluence + scrollX * scrollInfluence
          interactionY = mouseY * touchInfluence + scrollY * scrollInfluence
        }
        
        // Optimized distance calculation
        const dx = interactionX - hex.x
        const dy = interactionY - hex.y
        const distanceSq = dx * dx + dy * dy
        const maxDistanceSq = maxDistance * maxDistance
        
        let offsetX = 0
        let offsetY = 0
        let glowOpacity = hex.opacity

        if (distanceSq < maxDistanceSq && distanceSq > 0) {
          const distance = Math.sqrt(distanceSq)
          const influence = 1 - distance / maxDistance
          
          // Repulsion effect - particles move away from mouse/touch/scroll
          const repulsionFactor = Math.min(1, repulsionStrength / distance)
          offsetX = -(dx / distance) * parallaxIntensity * influence * repulsionFactor
          offsetY = -(dy / distance) * parallaxIntensity * influence * repulsionFactor

          // Glow effect - reduced calculation
          if (distance < 150) {
            glowOpacity = hex.opacity + (1 - distance / 150) * 0.15
          }
        }

        // Enhanced floating animation - particles float around their base position
        const floatX = Math.sin(time * 0.3 + index * 0.7) * 3
        const floatY = Math.cos(time * 0.4 + index * 0.6) * 3
        
        // Use base position if available, otherwise use current position
        const baseX = hex.baseX !== undefined ? hex.baseX : hex.x
        const baseY = hex.baseY !== undefined ? hex.baseY : hex.y

        drawHexagon(
          baseX + offsetX + floatX,
          baseY + offsetY + floatY,
          hex.size,
          glowOpacity,
          hex.rotation + time * 0.05
        )
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    // Mouse and touch event handlers with optimized throttling
    let mouseThrottle: NodeJS.Timeout | null = null
    const eventThrottleDelay = 16 // ~60fps for smooth interactions
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseThrottle) {
        handlePointerMove(e.clientX, e.clientY)
        mouseThrottle = setTimeout(() => {
          mouseThrottle = null
        }, eventThrottleDelay)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        handlePointerMove(touch.clientX, touch.clientY)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        if (!mouseThrottle) {
          handlePointerMove(touch.clientX, touch.clientY)
          mouseThrottle = setTimeout(() => {
            mouseThrottle = null
          }, eventThrottleDelay)
        }
      }
    }

    const handleTouchEnd = () => {
      // Keep last touch position for smooth transition
      // Don't reset immediately to allow particles to settle
    }

    // Scroll handler for mobile - particles react to scroll position
    const handleScroll = () => {
      if (isMobileRef.current) {
        const scrollY = window.scrollY
        const scrollX = window.scrollX
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2
        
        // Create dynamic interaction point based on scroll
        // Particles react to scroll position relative to viewport center
        const scrollInfluenceX = (scrollX / window.innerWidth) * 200 // Max 200px offset
        const scrollInfluenceY = (scrollY / window.innerHeight) * 200 // Max 200px offset
        
        scrollPosRef.current = {
          x: centerX + scrollInfluenceX,
          y: centerY + scrollInfluenceY
        }
      }
    }

    // Use pointer events for better cross-device support
    const handlePointerEvent = (e: PointerEvent) => {
      if (!mouseThrottle) {
        handlePointerMove(e.clientX, e.clientY)
        mouseThrottle = setTimeout(() => {
          mouseThrottle = null
        }, eventThrottleDelay)
      }
    }

    // Add all event listeners for maximum compatibility
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('pointermove', handlePointerEvent, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('pointermove', handlePointerEvent)
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (mouseThrottle) {
        clearTimeout(mouseThrottle)
      }
    }
  }, [handlePointerMove])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}
