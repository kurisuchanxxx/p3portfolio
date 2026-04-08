import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PROJECTS = [
  {
    title: "CTRL STUDIO",
    type: "Web & Digital Agency",
    status: "ACTIVE",
    desc: "Realtà ibrida tra comunicazione, web e soluzioni digitali.",
    link: "https://www.ctrlstudio.it/",
    color: "#00e5ff"
  },
  {
    title: "PORTFOLIO",
    type: "Personal Website",
    status: "v1.0",
    desc: "Costruzione di un portfolio personale con forte identità visuale (ispirato a P3).",
    link: "https://christianlantieri.com",
    color: "#ff0055"
  },
  {
    title: "CLIENT PROJECTS",
    type: "Web Development",
    status: "VARIOUS",
    desc: "Siti, landing page e presenza digitale pensati per essere realmente utili ai clienti.",
    link: "#",
    color: "#ffdd00"
  },
  {
    title: "AUTOMATIONS",
    type: "Internal Systems",
    status: "BUILDING",
    desc: "Sperimentazione su processi interni, automazioni e organizzazione del flusso operativo.",
    link: "#",
    color: "#bd00ff"
  }
];

export default function VideoPage({ src }) {
  const navigate = useNavigate()
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowUp') setActive(i => Math.max(0, i - 1));
      if (e.key === 'ArrowDown') setActive(i => Math.min(PROJECTS.length - 1, i + 1));
      if (e.key === 'Enter') {
        const link = PROJECTS[active].link;
        if (link && link !== "#") window.open(link, "_blank");
      }
      if (e.key === 'ArrowLeft' || e.key === 'Escape' || e.key === 'Backspace') navigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, active])

  return (
    <div id="menu-screen">
      <video src={src} autoPlay loop muted playsInline preload="auto" />
      <div className="vp-overlay">
        
        <div className={`vp-header ${mounted ? "mounted" : ""}`}>
          <div className="vp-title">ARCHIVIO PROGETTI</div>
          <div className="vp-subtitle">SELEZIONA UN PROGETTO PER VISUALIZZARE I DETTAGLI</div>
        </div>

        <div className="vp-list">
          {PROJECTS.map((proj, idx) => (
            <div
              key={idx}
              className={`vp-item ${active === idx ? "active" : ""} ${mounted ? "mounted" : ""}`}
              style={{ transitionDelay: mounted ? `${idx * 60}ms` : "0ms" }}
              onMouseEnter={() => {
                if (active !== idx) setActive(idx);
              }}
              onClick={() => {
                if (active === idx && proj.link && proj.link !== "#") {
                  window.open(proj.link, "_blank");
                } else {
                  setActive(idx);
                }
              }}
            >
              <div className="vp-item-bg" style={{ backgroundColor: proj.color }} />
              <div className="vp-item-content">
                <div className="vp-item-title">{proj.title}</div>
                <div className="vp-item-type">{proj.type}</div>
              </div>
              <div className="vp-item-right">
                <div className="vp-item-status">{proj.status}</div>
                {proj.link && proj.link !== "#" && (
                  <div className="vp-item-chevron">▸</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={`vp-details ${mounted ? "mounted" : ""}`}>
          <div className="vp-detail-title">{PROJECTS[active].title}</div>
          <div className="vp-detail-desc">{PROJECTS[active].desc}</div>
          {PROJECTS[active].link && PROJECTS[active].link !== "#" && (
            <div className="vp-detail-link">PREMI INVIO O CLICCA PER APRIRE IL LINK</div>
          )}
        </div>

      </div>

      <div
        className="back-button"
        onClick={() => navigate(-1)}
      >
        <span className="back-arrow">◄</span> INDIETRO
      </div>

      <div className={`vp-footer ${mounted ? "mounted" : ""}`}>
        <div className="vp-footer-row"><span className="vp-footer-key">↑↓</span><span>SELEZIONA</span></div>
        <div className="vp-footer-row"><span className="vp-footer-key">↵</span><span>APRI LINK</span></div>
        <div className="vp-footer-row"><span className="vp-footer-key">ESC</span><span>INDIETRO</span></div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Montserrat:wght@400;700&display=swap');

        .vp-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          background: linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6vw;
        }

        .vp-header {
          position: absolute;
          top: 8vh;
          left: 6vw;
          opacity: 0;
          transform: translateY(-20px);
          transition: all 0.5s ease;
        }
        .vp-header.mounted {
          opacity: 1;
          transform: translateY(0);
        }
        .vp-title {
          font-family: 'Anton', sans-serif;
          font-size: 64px;
          color: #fff;
          letter-spacing: 2px;
          line-height: 1;
          text-shadow: 4px 4px 0 #c4001a;
        }
        .vp-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          color: rgba(255,255,255,0.7);
          letter-spacing: 2px;
          margin-top: 8px;
        }

        .vp-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 40vw;
          max-width: 500px;
        }

        .vp-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          background: rgba(20, 20, 25, 0.9);
          border: 2px solid rgba(255,255,255,0.1);
          clip-path: polygon(0 0, 100% 0, calc(100% - 15px) 100%, 0 100%);
          cursor: pointer;
          opacity: 0;
          transform: translateX(-40px);
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .vp-item.mounted {
          opacity: 1;
          transform: translateX(0);
        }
        .vp-item.active {
          background: #fff;
          transform: scale(1.05) translateX(10px);
          border-color: transparent;
          box-shadow: 8px 8px 0 rgba(0,0,0,0.5);
          z-index: 2;
        }

        .vp-item-bg {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }
        .vp-item.active .vp-item-bg {
          opacity: 0.15;
        }

        .vp-item-content {
          position: relative;
          z-index: 1;
        }
        .vp-item-title {
          font-family: 'Anton', sans-serif;
          font-size: 32px;
          color: #fff;
          line-height: 1;
          transition: color 0.3s ease;
        }
        .vp-item.active .vp-item-title {
          color: #000;
        }
        .vp-item-type {
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: rgba(255,255,255,0.5);
          margin-top: 4px;
          transition: color 0.3s ease;
        }
        .vp-item.active .vp-item-type {
          color: rgba(0,0,0,0.6);
        }

        .vp-item-status {
          position: relative;
          z-index: 1;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 1px;
          padding: 4px 12px;
          background: rgba(255,255,255,0.1);
          color: #fff;
          clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          transition: all 0.3s ease;
        }
        .vp-item.active .vp-item-status {
          background: #000;
          color: #fff;
        }
 
         .vp-item-right {
           position: relative;
           z-index: 1;
           display: flex;
           align-items: center;
           gap: 10px;
           flex-shrink: 0;
         }
 
         .vp-item-chevron {
           font-family: 'Bebas Neue', sans-serif;
           font-size: 28px;
           line-height: 1;
           color: rgba(255,255,255,0.55);
           transform: translateX(0);
           transition: color 0.3s ease, transform 0.3s ease;
           user-select: none;
         }
         .vp-item.active .vp-item-chevron {
           color: #c4001a;
           transform: translateX(6px);
         }

        .vp-details {
          width: 35vw;
          max-width: 450px;
          padding: 40px;
          background: rgba(10, 10, 15, 0.95);
          border-left: 4px solid #c4001a;
          box-shadow: 12px 12px 0 rgba(0,0,0,0.6);
          opacity: 0;
          transform: translateX(40px);
          transition: all 0.4s ease;
        }
        .vp-details.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .vp-detail-title {
          font-family: 'Anton', sans-serif;
          font-size: 48px;
          color: #fff;
          line-height: 1;
          margin-bottom: 16px;
        }
        .vp-detail-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 18px;
          line-height: 1.6;
          color: rgba(255,255,255,0.8);
          margin-bottom: 24px;
        }
        .vp-detail-link {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 1px;
          color: #00e5ff;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* back button */
        .back-button {
          position: absolute;
          top: 32px;
          left: 32px;
          z-index: 50;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: color 0.2s ease, transform 0.2s ease;
          pointer-events: auto;
          user-select: none;
        }
        .back-button:hover {
          color: #fff;
          transform: translateX(-4px);
        }
        .back-arrow {
          font-size: 18px;
          color: #c4001a;
        }

        .vp-footer {
          position: absolute;
          bottom: 24px;
          right: 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          font-family: 'Bebas Neue', sans-serif;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .vp-footer.mounted {
          opacity: 1;
        }
        .vp-footer-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.3);
        }
        .vp-footer-key {
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 3px;
          padding: 2px 6px;
          font-size: 12px;
        }
      `}</style>
    </div>
  )
}
