import React, { SVGProps } from 'react'

const Moon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 256 256"
      {...props}
    >
      <g
        style={{
          stroke: 'none',
          strokeWidth: 0,
          strokeDasharray: 'none',
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter',
          strokeMiterlimit: 10,
          fill: 'none',
          fillRule: 'nonzero',
          opacity: 1,
        }}
      >
        <path
          d="M69.491 71.08c-18.67 3.414-36.573-8.953-39.988-27.623S38.456 6.884 57.126 3.469c1.777-.325 3.541-.463 5.292-.511A44.785 44.785 0 0 0 38.282.742C13.839 5.212-2.353 28.651 2.117 53.094s27.909 40.634 52.352 36.164c16.252-2.972 28.847-14.334 34.155-28.798-4.885 5.343-11.463 9.217-19.133 10.62z"
          style={{
            stroke: 'none',
            strokeWidth: 1,
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 10,
            fill: '#f7d77f',
            fillRule: 'nonzero',
            opacity: 1,
          }}
          transform="matrix(2.81 0 0 2.81 1.407 1.407)"
        />
      </g>
    </svg>
  )
}

export default Moon
