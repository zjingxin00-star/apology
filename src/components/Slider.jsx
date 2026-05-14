import React from 'react'

export default function Slider({ value, onChange }) {
  return (
    <div className="circular-slider">
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: '300px',
          height: '300px',
          borderRadius: '50%',
        }}
      />
    </div>
  )
}
