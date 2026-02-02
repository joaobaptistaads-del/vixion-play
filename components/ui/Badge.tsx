"use client"

import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function Badge({ children }: Props) {
  return (
    <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold bg-white/10 text-white">
      {children}
    </span>
  )
}

