import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/bgm.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.35;
    audioRef.current = audio;
    setReady(true);

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("p3_music");
    if (saved === "on") {
      const tryStart = async () => {
        try {
          await audioRef.current?.play();
        } catch {
          setPlaying(false);
        }
      };
      tryStart();
    }
  }, [ready]);

  useEffect(() => {
    const onFirstGesture = async () => {
      const saved = localStorage.getItem("p3_music");
      if (saved !== "on") return;
      try {
        await audioRef.current?.play();
      } catch {
        setPlaying(false);
      }
    };

    window.addEventListener("pointerdown", onFirstGesture, { once: true });
    window.addEventListener("keydown", onFirstGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
    };
  }, [ready]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      localStorage.setItem("p3_music", "off");
      return;
    }

    localStorage.setItem("p3_music", "on");
    try {
      await audio.play();
    } catch {
      setPlaying(false);
    }
  };

  return (
    <>
      <style>{`
        .music-btn {
          position: fixed;
          left: 32px;
          bottom: 28px;
          z-index: 80;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.62);
          background: rgba(0, 0, 0, 0.28);
          border: 1px solid rgba(255, 255, 255, 0.18);
          clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          cursor: pointer;
          pointer-events: auto;
          user-select: none;
          transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
        }
        .music-btn:hover {
          color: rgba(255, 255, 255, 0.92);
          border-color: rgba(255, 255, 255, 0.32);
          background: rgba(0, 0, 0, 0.36);
          transform: translateY(-2px);
        }
        .music-dot {
          width: 9px;
          height: 9px;
          border-radius: 999px;
          background: rgba(196, 0, 26, 0.9);
          box-shadow: 0 0 0 2px rgba(0,0,0,0.35);
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 0.18s ease, transform 0.18s ease;
        }
        .music-btn.on .music-dot {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
      <button
        type="button"
        className={`music-btn ${playing ? "on" : ""}`}
        onClick={toggle}
        aria-label={playing ? "Disattiva musica" : "Attiva musica"}
      >
        <span className="music-dot" />
        <span>{playing ? "MUSIC ON" : "MUSIC OFF"}</span>
      </button>
    </>
  );
}

