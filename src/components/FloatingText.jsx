import React, { useState, useEffect } from 'react'

export default function FloatingText({ text }) {
  const [key, setKey] = useState(0)

  useEffect(() => {
    setKey((prev) => prev + 1)
  }, [text])

  return (
    <div className="floating-text text-white font-semibold text-2xl drop-shadow-lg" key={key}>
      {text}
    </div>
  )
}
