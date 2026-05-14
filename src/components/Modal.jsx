import React, { useState } from 'react'

export default function Modal({ onClose, value }) {
  const heartSpeech = `亲爱的你，

我想认真地对你说：

如果我的任何一句话、一个举动伤害了你，那是我最大的遗憾。
你对我来说意味着一切，而让你难过是我所害怕的事。

我想用行动证明我的悔意——
- 我会更细心地听你说话
- 我会在你需要的时候陪在你身边
- 我会记住你喜欢的每一个小细节
- 我会用全部的耐心和温柔对待你

如果可能，我想：
💫 带你去看最美的日出日落
🍽️ 一起去尝遍你想吃的美食
🎵 坐在你身边，听你说任何话题
🌙 在月光下，告诉你我有多在乎你

最重要的是，我想在你身边，一起经历生活的每个瞬间。

无论发生什么，我对你的爱都是坚定的、永不改变的。

永远爱你，
你的 ${value === 100 ? '最爱的人' : '很遗憾的人'}
`

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">💌 真心话</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
          {heartSpeech}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-orange-400 to-red-400 text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            💕 我原谅你了
          </button>
          <button
            onClick={() => {
              // 复制到剪贴板
              navigator.clipboard.writeText(heartSpeech)
              alert('已复制到剪贴板！')
            }}
            className="flex-1 px-4 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition-all duration-300"
          >
            📋 复制
          </button>
        </div>
      </div>
    </div>
  )
}
