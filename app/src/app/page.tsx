'use client'

import React, { useRef } from 'react'
import MainLayout from '@/components/pages/landing'
import '@/styles/Global/index.scss'

export default function Home() {
  const mainContentRef = useRef<HTMLDivElement>(null)

  return (
    <div style={{ height: '3000px' }}>
      <div ref={mainContentRef}>
        <MainLayout />
      </div>
    </div>
  )
}
