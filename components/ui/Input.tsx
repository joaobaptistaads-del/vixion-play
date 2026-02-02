"use client"

import React from 'react'
import clsx from 'clsx'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  addon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, Props>(({ className, addon, ...props }, ref) => {
  return (
    <div className={clsx('flex items-center bg-white/5 rounded-md', className)}>
      <input ref={ref} {...props} className="px-3 py-2 bg-transparent outline-none w-full placeholder:text-slate-400 text-sm" />
      {addon && <div className="px-3">{addon}</div>}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
