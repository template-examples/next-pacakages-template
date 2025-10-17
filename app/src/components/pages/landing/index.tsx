import React from 'react'
import '@/styles/MainLayout/index.scss'
import Footer from '../../footer/Footer' // <- путь к Footer.tsx относительно MainLayout

const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="main__layout no-select">
      {children} {/* Основной контент страницы */}
      <Footer /> {/* Футер */}
    </div>
  )
}

export default React.memo(MainLayout)
