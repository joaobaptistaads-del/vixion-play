"use client"

import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode
}

export default function IconButton({ children, className = '', ...rest }: Props) {
  return (
    <button
      {...rest}
      className={
        'inline-flex items-center justify-center rounded-full bg-black/40 p-2 text-white hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ' +
        className
      }
    >
      {children}
    </button>
  )
}

