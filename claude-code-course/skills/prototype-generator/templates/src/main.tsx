/** Entry: router, theme class sync, splash until store hydrates, global chrome. Fill in portal routes. */
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { useStore } from './lib/store'
import { DemoGuide, Toasts, Logo } from './components/chrome'
// import Landing from './pages/Landing' ... import AppPortal from './portals/app' ... etc.

function ThemeSync() {
  const theme = useStore((s) => s.theme), lang = useStore((s) => s.lang)
  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); document.documentElement.lang = lang }, [theme, lang])
  return null
}

function Splash({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(useStore.persist.hasHydrated())
  useEffect(() => useStore.persist.onFinishHydration(() => setReady(true)), [])
  if (!ready) return <div className="grid h-screen place-items-center bg-canvas"><Logo /></div>
  return <>{children}</>
}

const Todo = ({ name }: { name: string }) => <div className="p-10 font-display text-3xl">{name}</div>

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeSync />
      <Splash>
        <Routes>
          <Route path="/" element={<Todo name="Landing" />} />
          <Route path="/app" element={<Todo name="App (Presenter + PhoneFrame)" />} />
          <Route path="/{{biz}}/*" element={<Todo name="Business portal (DashboardShell)" />} />
          <Route path="/admin/*" element={<Todo name="Admin console" />} />
          <Route path="/{{partner}}/*" element={<Todo name="Partner portal" />} />
          <Route path="/live" element={<Todo name="Live side-by-side" />} />
          <Route path="/proposal" element={<Todo name="Proposal" />} />
          <Route path="/pricing" element={<Todo name="Pricing" />} />
          <Route path="/legal/:doc?" element={<Todo name="Legal drafts" />} />
          <Route path="*" element={<Todo name="404" />} />
        </Routes>
        <DemoGuide />
        <Toasts />
      </Splash>
    </BrowserRouter>
  </React.StrictMode>,
)
