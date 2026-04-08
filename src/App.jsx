import { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import P3Menu from './P3Menu'
import VideoPage from './VideoPage'
import ResumePage from './ResumePage'
import PageTransition from './PageTransition'
import Socials from './Socials'
import AboutMe from './AboutMe'
import BackgroundMusic from './BackgroundMusic'
import './App.css'

const menuVideo = import.meta.env.VITE_MENU_VIDEO_URL || '/Mainn.mp4'
const resumeVideo = import.meta.env.VITE_RESUME_VIDEO_URL || '/main2.mp4'
const projectsVideo = import.meta.env.VITE_PROJECTS_VIDEO_URL || '/main3.mp4'
const aboutVideo = import.meta.env.VITE_ABOUT_VIDEO_URL || menuVideo || '/main1.mp4'
const socialsVideo = import.meta.env.VITE_SOCIALS_VIDEO_URL || projectsVideo || menuVideo || '/main3.mp4'

function MenuScreen() {
  const navigate = useNavigate()
  return (
    <div id="menu-screen">
      <video src={menuVideo} autoPlay loop muted playsInline preload="auto" />
      <P3Menu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/about" element={
          <PageTransition variant="about"><AboutMe /></PageTransition>
        } />
        <Route path="/resume" element={
          <PageTransition><ResumePage src={resumeVideo} /></PageTransition>
        } />
        <Route path="/socials" element={
          <PageTransition variant="socials"><Socials /></PageTransition>
        } />
        <Route path="/sideproj" element={
          <PageTransition><VideoPage src={projectsVideo} /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  useEffect(() => {
    const urls = [menuVideo, resumeVideo, projectsVideo, aboutVideo, socialsVideo].filter(Boolean)
    const unique = Array.from(new Set(urls))

    unique.forEach((href) => {
      try {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'video'
        link.href = href
        document.head.appendChild(link)
      } catch {
      }

      try {
        const v = document.createElement('video')
        v.preload = 'auto'
        v.muted = true
        v.src = href
        v.load()
      } catch {
      }
    })
  }, [])

  return (
    <>
      <AnimatedRoutes />
      <BackgroundMusic />
    </>
  )
}
