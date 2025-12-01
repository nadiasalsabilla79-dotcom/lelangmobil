"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { createNoise4D } from 'simplex-noise'

interface AnimatedBackgroundProps {
  theme?: 'purple' | 'blue' | 'green' | 'pink' | 'orange' | 'dark'
}

const themes = {
  purple: {
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    light1: 0x667eea,
    light2: 0x764ba2,
    light3: 0xf093fb,
    light4: 0xee3bcf
  },
  blue: {
    bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    light1: 0x4facfe,
    light2: 0x00f2fe,
    light3: 0x43e97b,
    light4: 0x38f9d7
  },
  green: {
    bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    light1: 0x43e97b,
    light2: 0x38f9d7,
    light3: 0x4facfe,
    light4: 0x00f2fe
  },
  pink: {
    bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    light1: 0xf093fb,
    light2: 0xf5576c,
    light3: 0xfeca57,
    light4: 0xee5a6f
  },
  orange: {
    bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    light1: 0xfa709a,
    light2: 0xfee140,
    light3: 0xff6b6b,
    light4: 0xfeca57
  },
  dark: {
    bg: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    light1: 0x4facfe,
    light2: 0x00f2fe,
    light3: 0x667eea,
    light4: 0xf093fb
  }
}

export function AnimatedBackground({ theme = 'purple' }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const selectedTheme = themes[theme]

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    let renderer: THREE.WebGLRenderer
    let scene: THREE.Scene
    let camera: THREE.PerspectiveCamera
    let plane: THREE.Mesh
    let light1: THREE.PointLight
    let light2: THREE.PointLight
    let light3: THREE.PointLight
    let light4: THREE.PointLight
    
    const noise4D = createNoise4D()
    let width = window.innerWidth
    let height = window.innerHeight
    
    const config = {
      fov: 75,
      cameraZ: 60,
      xyCoef: 50,
      zCoef: 10,
      lightIntensity: 0.9,
      light1Color: selectedTheme.light1,
      light2Color: selectedTheme.light2,
      light3Color: selectedTheme.light3,
      light4Color: selectedTheme.light4
    }

    const mouse = { x: 0, y: 0 }

    function init() {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setSize(width, height)
      
      camera = new THREE.PerspectiveCamera(config.fov, width / height, 0.1, 1000)
      camera.position.z = config.cameraZ
      
      scene = new THREE.Scene()
      
      initLights()
      initPlane()
      
      animate()
    }

    function initLights() {
      const r = 30
      const y = 10
      const lightDistance = 500

      light1 = new THREE.PointLight(config.light1Color, config.lightIntensity, lightDistance)
      light1.position.set(0, y, r)
      scene.add(light1)
      
      light2 = new THREE.PointLight(config.light2Color, config.lightIntensity, lightDistance)
      light2.position.set(0, -y, -r)
      scene.add(light2)
      
      light3 = new THREE.PointLight(config.light3Color, config.lightIntensity, lightDistance)
      light3.position.set(r, y, 0)
      scene.add(light3)
      
      light4 = new THREE.PointLight(config.light4Color, config.lightIntensity, lightDistance)
      light4.position.set(-r, y, 0)
      scene.add(light4)
    }

    function initPlane() {
      const wWidth = getRendererSize()[0]
      const wHeight = getRendererSize()[1]
      
      const mat = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide })
      const geo = new THREE.PlaneGeometry(wWidth, wHeight, Math.floor(wWidth / 2), Math.floor(wHeight / 2))
      plane = new THREE.Mesh(geo, mat)
      
      plane.rotation.x = -Math.PI / 2 - 0.2
      plane.position.y = -25
      
      scene.add(plane)
    }

    function animate() {
      requestAnimationFrame(animate)
      
      animatePlane()
      animateLights()
      
      renderer.render(scene, camera)
    }

    function animatePlane() {
      const positions = plane.geometry.attributes.position
      const time = Date.now() * 0.0002
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const y = positions.getY(i)
        const z = noise4D(x / config.xyCoef, y / config.xyCoef, time, mouse.x + mouse.y) * config.zCoef
        positions.setZ(i, z)
      }
      
      positions.needsUpdate = true
    }

    function animateLights() {
      const time = Date.now() * 0.001
      const d = 50
      
      light1.position.x = Math.sin(time * 0.1) * d
      light1.position.z = Math.cos(time * 0.2) * d
      
      light2.position.x = Math.cos(time * 0.3) * d
      light2.position.z = Math.sin(time * 0.4) * d
      
      light3.position.x = Math.sin(time * 0.5) * d
      light3.position.z = Math.sin(time * 0.6) * d
      
      light4.position.x = Math.sin(time * 0.7) * d
      light4.position.z = Math.cos(time * 0.8) * d
    }

    function getRendererSize() {
      const vFOV = (camera.fov * Math.PI) / 180
      const height = 2 * Math.tan(vFOV / 2) * Math.abs(config.cameraZ)
      const width = height * camera.aspect
      return [width, height]
    }

    function handleResize() {
      width = window.innerWidth
      height = window.innerHeight
      
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    function handleMouseMove(e: MouseEvent) {
      mouse.x = (e.clientX / width) * 2 - 1
      mouse.y = -(e.clientY / height) * 2 + 1
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    
    init()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      renderer.dispose()
      plane.geometry.dispose()
      ;(plane.material as THREE.Material).dispose()
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10" style={{ background: selectedTheme.bg }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  )
}
