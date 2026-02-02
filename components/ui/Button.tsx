"use client"

import clsx from 'clsx'
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline'
}

export default function Button({ variant = 'primary', className, children, ...rest }: Props) {
  const base = 'inline-flex items-center gap-2 rounded-md font-semibold transition '
  const variants: Record<string, string> = {
    primary: 'bg-vixion-500 hover:bg-vixion-700 text-white px-4 py-2',
    ghost: 'bg-white/5 hover:bg-white/10 text-white px-3 py-2',
    outline: 'border border-white/10 text-white px-3 py-2'
  }

  return (
    <button className={clsx(base, variants[variant], className)} {...rest}>
      {children}
    </button>
  )
}
