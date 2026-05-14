import React, { useState, useEffect, useRef } from 'react'
import Slider from './components/Slider'
import ParticleEffects from './components/ParticleEffects'
import FloatingText from './components/FloatingText'
import Modal from './components/Modal'
import BackgroundAudio from './components/BackgroundAudio'

export default function App() {
  const [value, setValue] = useState(50)
  const [showModal, setShowModal] = useState(false)
  const audioRef = useRef(null)

  // 根据滑块值获取背景样式
  const getBackgroundStyle = () => {
    if (value <= 20) {
      // 深灰色 - 风暴
      return {
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%)',
        weather: 'storm',
      }
    } else if (value <= 60) {
      // 忧郁蓝色 - 雨天
      return {
        background: 'linear-gradient(135deg, #3a4a6b 0%, #4a5f8f 50%, #2c3e5f 100%)',
        weather: 'rain',
      }
    } else {
      // 日落橙/黄色 - 晴天
      return {
        background: 'linear-gradient(135deg, #ff9a56 0%, #ffb366 50%, #ffd700 100%)',
        weather: 'sunny',
      }
    }
  }

  const backgroundStyle = getBackgroundStyle()

  // 根据滑块值获取文字
  const getApologyText = () => {
    if (value <= 10) return '真的好抱歉'
    if (value <= 20) return '我错了'
    if (value <= 30) return '希望你能原谅我'
    if (value <= 40) return '我会改正'
    if (value <= 50) return '想好好陪你'
    if (value <= 60) return '让我弥补吧'
    if (value <= 70) return '你值得最好的'
    if (value <= 80) return '想带你去吹风'
    if (value <= 90) return '想带你去吃好吃的'
    return '永远爱你 ❤️'
  }

  // 自动播放背景音乐
  useEffect(() => {
    if (backgroundStyle.weather === 'sunny' && audioRef.current) {
      audioRef.current.play().catch(() => {
        // 浏览器可能阻止自动播放
      })
    } else if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [backgroundStyle.weather])

  return (
    <div
      className="w-full h-screen relative overflow-hidden transition-all duration-700"
      style={{ background: backgroundStyle.background }}
    >
      {/* 背景音乐 */}
      <BackgroundAudio ref={audioRef} />

      {/* 粒子效果 */}
      <ParticleEffects weather={backgroundStyle.weather} value={value} />

      {/* 主容器 */}
      <div className="w-full h-full flex flex-col items-center justify-center relative">
        {/* 顶部标题 */}
        <div className="absolute top-8 text-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            {value <= 60 ? '🌧️ 很抱歉' : '☀️ 感谢有你'}
          </h1>
          <p className="text-white/70 mt-2">
            {value <= 60 ? '滑动来表达我的歉意' : '阳光下的承诺'}
          </p>
        </div>

        {/* 中央滑块 */}
        <div className="relative flex flex-col items-center justify-center gap-8">
          <Slider value={value} onChange={setValue} />

          {/* 浮动文字 */}
          <FloatingText text={getApologyText()} />

          {/* 数值显示 */}
          <div className="text-center mt-8">
            <div className="text-6xl font-bold text-white/80 drop-shadow-lg">
              {value}%
            </div>
            <div className="text-white/60 mt-2">
              {value <= 20 && '风暴中的道歉'}
              {value > 20 && value <= 60 && '雨中的悔意'}
              {value > 60 && '阳光下的诺言'}
            </div>
          </div>
        </div>

        {/* 底部求和按钮 */}
        <div className="absolute bottom-8 flex gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-semibold backdrop-blur-lg border border-white/30 transition-all duration-300 hover:scale-105"
          >
            💌 求和
          </button>
          <button
            className="px-8 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-semibold backdrop-blur-lg border border-white/30 transition-all duration-300 hover:scale-105"
            onClick={() => setValue(Math.floor(Math.random() * 101))}
          >
            🎲 随机
          </button>
        </div>
      </div>

      {/* 模态框 */}
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          value={value}
        />
      )}
    </div>
  )
}
