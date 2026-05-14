import React, { useState, useEffect } from 'react'

export default function ParticleEffects({ weather, value }) {
  const [raindrops, setRaindrops] = useState([])
  const [hearts, setHearts] = useState([])
  const [lightnings, setLightnings] = useState([])

  // 生成雨滴
  useEffect(() => {
    if (weather === 'rain' || weather === 'storm') {
      const generateRaindrops = () => {
        const drops = []
        for (let i = 0; i < (weather === 'storm' ? 100 : 50); i++) {
          drops.push({
            id: Math.random(),
            left: Math.random() * 100,
            delay: Math.random() * 0.5,
            duration: weather === 'storm' ? 0.5 : 1.5,
          })
        }
        setRaindrops(drops)
      }

      generateRaindrops()
      const interval = setInterval(generateRaindrops, weather === 'storm' ? 300 : 800)

      return () => clearInterval(interval)
    }
  }, [weather])

  // 生成闪电
  useEffect(() => {
    if (weather === 'storm') {
      const generateLightning = () => {
        if (Math.random() > 0.7) {
          const lightning = {
            id: Math.random(),
            x: Math.random() * 100,
            y: Math.random() * 50,
          }
          setLightnings((prev) => [...prev, lightning])
          setTimeout(() => {
            setLightnings((prev) => prev.filter((l) => l.id !== lightning.id))
          }, 200)
        }
      }

      const interval = setInterval(generateLightning, 1000)
      return () => clearInterval(interval)
    }
  }, [weather])

  // 生成爱心粒子
  useEffect(() => {
    if (weather === 'sunny') {
      const generateHearts = () => {
        const newHearts = []
        for (let i = 0; i < 3; i++) {
          newHearts.push({
            id: Math.random(),
            left: Math.random() * 100,
            delay: Math.random() * 0.5,
          })
        }
        setHearts((prev) => [...prev, ...newHearts])
      }

      const interval = setInterval(generateHearts, 600)

      return () => clearInterval(interval)
    } else {
      setHearts([])
    }
  }, [weather])

  // 清理旧的爱心粒子
  useEffect(() => {
    if (weather === 'sunny' && hearts.length > 30) {
      setHearts((prev) => prev.slice(-30))
    }
  }, [hearts, weather])

  return (
    <>
      {/* 雨滴 */}
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className="raindrop"
          style={{
            left: `${drop.left}%`,
            top: '-10px',
            animation: `raindrop ${drop.duration}s linear ${drop.delay}s infinite`,
            animationName: drop.duration < 1 ? 'raindrop' : 'raindrop',
          }}
        />
      ))}

      {/* 闪电 */}
      {lightnings.map((lightning) => (
        <div
          key={lightning.id}
          className="lightning animate-lightning"
          style={{
            left: `${lightning.x}%`,
            top: `${lightning.y}%`,
            width: '100px',
            height: '200px',
            pointerEvents: 'none',
          }}
        >
          <div className="w-full h-full bg-gradient-to-b from-white via-blue-200 to-transparent opacity-80" />
        </div>
      ))}

      {/* 爱心粒子 */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="heart-particle animate-float"
          style={{
            left: `${heart.left}%`,
            top: '100%',
            animation: `float 3s ease-in ${heart.delay}s forwards`,
          }}
        >
          ❤️
        </div>
      ))}
    </>
  )
}
