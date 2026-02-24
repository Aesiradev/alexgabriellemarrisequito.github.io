import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const BASE = import.meta.env.BASE_URL;

const projects = [
  {
    previews: [
      `${BASE}assets/images/wastelogin.png`,
      `${BASE}assets/images/Wastedashboard.png`,
      `${BASE}assets/images/wastemonitoring.png`,
    ],
    number: "01",
    title: "Waste Monitoring System",
    tag: "IoT + Dashboard",
    status: "Completed",
    description: "ESP32-based smart bin monitoring with dashboard analytics.",
    tech: ["React.js", "ESP32", "IoT", "Laravel", "Docker"],
    github: "#",
    live: null,
  },
  {
    previews: [
      `${BASE}assets/images/Emailing.png`,
      `${BASE}assets/images/Dashboard.png`,
    ],
    number: "02",
    title: "Bulk Emailer",
    tag: "Backend and Frontend",
    status: "Completed",
    description: "Bulk emailing through excel upload.",
    tech: ["Laravel", "Docker", "React.js"],
    github: "#",
    live: null,
  },
  {
    previews: [
      `${BASE}assets/images/WHDashboard.png`,
      `${BASE}assets/images/WHAdd.png`,
      `${BASE}assets/images/WHLogin.png`,
    ],
    number: "03",
    title: "FEFO Inventory System",
    tag: "Web App",
    status: "In Progress",
    description: "FEFO-based expiry tracking inventory for Employees and Admin access.",
    tech: ["Python", "MySQL", "Bootstrap"],
    github: "#",
    live: null,
  },
];

const THUMB_H = 90;
const THUMB_W = 150;
const SPACING = 60;

const positions = [
  { top: `30px` },
  { top: `${30 + THUMB_H + SPACING}px` },
  { top: `${30 + (THUMB_H + SPACING) * 2}px` },
];

function Lightbox({ src, onClose, onPrev, onNext, hasMultiple, dots, activeSlide, setSlide }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
      if (e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.92)",
        backdropFilter: "blur(8px)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "fixed", top: "20px", right: "20px",
          width: "40px", height: "40px",
          background: "rgba(0,0,0,0.7)",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "50%", color: "white",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", zIndex: 100000, fontSize: "18px",
        }}
      >✕</button>

      {/* Image */}
      <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}>
        <img
          src={src}
          alt="Preview"
          style={{
            display: "block",
            maxWidth: "90vw",
            maxHeight: "85vh",
            width: "auto",
            height: "auto",
            borderRadius: "12px",
            boxShadow: "0 0 60px rgba(199,178,239,0.3)",
          }}
        />

        {/* Arrows */}
        {hasMultiple && (
          <>
            <button onClick={(e) => { e.stopPropagation(); onPrev(); }} style={{
              position: "absolute", left: "-56px", top: "50%", transform: "translateY(-50%)",
              width: "40px", height: "40px", borderRadius: "50%",
              background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.2)",
              color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            }}>‹</button>
            <button onClick={(e) => { e.stopPropagation(); onNext(); }} style={{
              position: "absolute", right: "-56px", top: "50%", transform: "translateY(-50%)",
              width: "40px", height: "40px", borderRadius: "50%",
              background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.2)",
              color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            }}>›</button>
          </>
        )}

        {/* Dots */}
        {hasMultiple && (
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "12px" }}>
            {dots.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setSlide(i); }} style={{
                width: "8px", height: "8px", borderRadius: "50%", border: "none", cursor: "pointer", padding: 0,
                background: i === activeSlide ? "#c7b2ef" : "rgba(255,255,255,0.25)",
              }} />
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

function PreviewCarousel({ previews }) {
  const [slide, setSlide] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => { setSlide(0); setExpanded(false); }, [previews]);

  useEffect(() => {
    if (expanded || previews.length <= 1) return;
    timerRef.current = setInterval(() => setSlide((s) => (s + 1) % previews.length), 3000);
    return () => clearInterval(timerRef.current);
  }, [previews, expanded]);

  const prev = (e) => { e?.stopPropagation(); clearInterval(timerRef.current); setSlide((s) => (s - 1 + previews.length) % previews.length); };
  const next = (e) => { e?.stopPropagation(); clearInterval(timerRef.current); setSlide((s) => (s + 1) % previews.length); };

  return (
    <>
      <div className="mini-carousel">
        <div className="mini-slide" onClick={() => setExpanded(true)} title="Click to expand">
          <img src={previews[slide]} alt={`Preview ${slide + 1}`} className="mini-img" />
          <div className="mini-expand-hint">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
              <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
            </svg>
          </div>
          {previews.length > 1 && (
            <>
              <button className="mini-arrow arrow-left" onClick={prev}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button className="mini-arrow arrow-right" onClick={next}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </>
          )}
        </div>
        {previews.length > 1 && (
          <div className="mini-dots">
            {previews.map((_, i) => (
              <button key={i} className={`mini-dot ${i === slide ? "active" : ""}`} onClick={() => setSlide(i)} />
            ))}
          </div>
        )}
      </div>

      {expanded && (
        <Lightbox
          src={previews[slide]}
          onClose={() => setExpanded(false)}
          onPrev={prev}
          onNext={next}
          hasMultiple={previews.length > 1}
          dots={previews}
          activeSlide={slide}
          setSlide={setSlide}
        />
      )}
    </>
  );
}

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [connectorStyle, setConnectorStyle] = useState({});
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add("fade-in-visible"); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const calc = () => {
      if (!containerRef.current || !contentRef.current) return;
      const container = containerRef.current.getBoundingClientRect();
      const textBox = contentRef.current.getBoundingClientRect();
      const thumbCenterX = container.width * 0.50;
      const thumbCenterY = parseInt(positions[activeIndex].top) + THUMB_H / 2;
      const scaledHalfW = (THUMB_W * 1.4) / 2;
      const startX = thumbCenterX + scaledHalfW + 6;
      const startY = thumbCenterY;
      const endX = textBox.left - container.left;
      const endY = textBox.top + textBox.height / 2 - container.top;
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      setConnectorStyle({ width: `${length}px`, transform: `rotate(${angle}deg)`, top: `${startY}px`, left: `${startX}px` });
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [activeIndex]);

  const handleSelect = (i) => {
    if (i === activeIndex) return;
    setAnimating(true);
    setTimeout(() => { setActiveIndex(i); setAnimating(false); }, 220);
  };

  const p = projects[activeIndex];

  return (
    <section id="portfolio" className="section portfolio-section fade-in-section" ref={sectionRef}>
      <div className="container">
        <div className="text-center mb-5">
          <span className="portfolio-eyebrow d-block">SELECTED WORKS</span>
          <h2 className="portfolio-title">Portfolio</h2>
        </div>

        <div className="row align-items-center">
          <div className="col-lg-4 d-none d-lg-flex align-items-center justify-content-center position-relative" ref={containerRef} style={{ height: "420px" }}>
            {projects.map((proj, i) => (
              <div key={i} onClick={() => handleSelect(i)} style={{
                position: "absolute", top: positions[i].top,
                left: "50%", transform: "translateX(-50%)",
                zIndex: i === activeIndex ? 2 : 1, cursor: "pointer",
              }}>
                <div className={`portfolio-thumb-placeholder ${i === activeIndex ? "active" : ""}`}>
                  <span className="thumb-number">{proj.number}</span>
                  <span className="thumb-label">{proj.title.split(" ")[0]}</span>
                </div>
              </div>
            ))}
            <div className="portfolio-connector" style={connectorStyle}>
              <span className="cdot cdot--lg" />
              <span className="cdot cdot--md" />
              <span className="cdot cdot--sm" />
            </div>
          </div>

          <div className="col-lg-7 d-flex align-items-center">
            <div ref={contentRef} style={{ width: "100%" }}>
              <div className={`portfolio-quote-wrapper ${animating ? "content-exit" : "content-enter"}`}>
                <span className="card-bg-number">{p.number}</span>
                <div className="card-inner-row">
                  <div className="card-text-col">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="card-tag">{p.tag}</span>
                      <span className={`card-status ${p.status === "In Progress" ? "status-wip" : "status-done"}`}>{p.status}</span>
                    </div>
                    <h5 className="card-title-text">{p.title}</h5>
                    <p className="card-desc">{p.description}</p>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {p.tech.map((t) => <span className="pill" key={t}>{t}</span>)}
                    </div>
                    <div className="d-flex align-items-center gap-3 flex-wrap">
                      {p.github && (
                        <a href={p.github} className="btn-portfolio btn-github" target="_blank" rel="noreferrer">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "6px" }}>
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02.005 2.045.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                          GitHub
                        </a>
                      )}
                      {p.live && (
                        <a href={p.live} className="btn-portfolio btn-live" target="_blank" rel="noreferrer">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: "6px" }}>
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                          Live Demo
                        </a>
                      )}
                    </div>
                    <div className="line-indicators mt-3">
                      {projects.map((_, idx) => (
                        <span key={idx} className={idx === activeIndex ? "active" : ""} onClick={() => handleSelect(idx)} />
                      ))}
                    </div>
                  </div>
                  <div className="card-carousel-col">
                    <PreviewCarousel previews={p.previews} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}