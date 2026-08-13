import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Lesson from './pages/Lesson'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <>
      <ScrollToTop />
      <div
        className={
          isHome
            ? 'grid min-h-dvh w-full place-items-center px-4 py-12 sm:px-6'
            : 'mx-auto mb-16 w-full max-w-[896px] px-4 sm:px-6'
        }
      >
        <div
          className={`frame frame-stack w-full ${
            isHome
              ? 'max-w-[640px] overflow-hidden rounded-xl border-t border-[var(--color-line)]'
              : ''
          }`}
        >
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/leccion/:lessonId" element={<Lesson />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}