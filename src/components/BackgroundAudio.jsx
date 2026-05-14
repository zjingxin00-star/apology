import React, { forwardRef } from 'react'

// 简单的背景音乐组件 - 使用 Web Audio API 生成音乐或连接外部音频源
const BackgroundAudio = forwardRef(function BackgroundAudio(props, ref) {
  return (
    <>
      <audio
        ref={ref}
        loop
        volume={0.3}
        src="data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA=="
      />
      {/* 
        注意：这是一个空的 WAV 文件占位符。
        在实际应用中，你可以：
        1. 使用真实的音频文件 URL
        2. 使用 Web Audio API 生成音乐
        3. 使用 Tone.js 库来创建音乐
        
        示例：
        src="https://example.com/happy-music.mp3"
        
        或使用 Tone.js：
        import * as Tone from 'tone'
        
        const synth = new Tone.Synth().toDestination()
        synth.triggerAttackRelease("C4", "8n")
      */}
    </>
  )
})

export default BackgroundAudio
