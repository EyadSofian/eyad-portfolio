import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Moon, Sun, ExternalLink, Github, Linkedin, MessageCircle, Mail, X, Play, ChevronRight } from "lucide-react";
import { PROJECTS, CATEGORIES, SKILLS, EXPERIENCE, CERTS } from "./data";

// --- Animated section wrapper ---
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

// --- Glassmorphism card ---
const glass = {
  background: "var(--glass)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
  border: "1px solid var(--glass-b)", borderRadius: "var(--r)"
};

// --- Project Card ---
function ProjectCard({ p, i, onClick }) {
  return (
    <Reveal delay={i * 0.05}>
      <motion.div onClick={() => onClick(p)} whileHover={{ y: -4, transition: { duration: 0.2 } }}
        style={{ ...glass, padding: 24, cursor: "pointer", position: "relative", overflow: "hidden", height: "100%" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <span style={{ fontSize: 30 }}>{p.emoji}</span>
          <span style={{ fontSize: 10, color: p.color, background: p.color + "14", padding: "3px 10px", borderRadius: 12, fontWeight: 600 }}>{p.cat}</span>
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>{p.title}</h3>
        <p style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500, marginBottom: 12 }}>{p.client} · {p.year}</p>
        <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.65, marginBottom: 16 }}>
          {p.desc.length > 140 ? p.desc.slice(0, 140) + "…" : p.desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: (p.demo || p.repo || p.workflow) ? 14 : 0 }}>
          {p.tags.slice(0, 4).map(t => (
            <span key={t} style={{ fontSize: 10, color: "var(--muted)", background: "var(--surface)", padding: "3px 8px", borderRadius: 6, fontWeight: 500 }}>{t}</span>
          ))}
          {p.tags.length > 4 && <span style={{ fontSize: 10, color: "var(--muted)" }}>+{p.tags.length - 4}</span>}
        </div>
        {(p.demo || p.repo || p.workflow) && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {p.demo && <span onClick={e => { e.stopPropagation(); window.open(p.demo, "_blank") }}
              style={{ fontSize: 10, color: "#FFF", background: p.color, padding: "4px 10px", borderRadius: 6, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}>
              <Play size={10} /> Try It</span>}
            {p.repo && <span onClick={e => { e.stopPropagation(); window.open(p.repo, "_blank") }}
              style={{ fontSize: 10, color: "var(--text2)", background: "var(--surface)", padding: "4px 10px", borderRadius: 6, fontWeight: 600, cursor: "pointer" }}>Repo ↗</span>}
            {p.workflow && <span onClick={e => { e.stopPropagation(); window.open(p.workflow, "_blank") }}
              style={{ fontSize: 10, color: "var(--text2)", background: "var(--surface)", padding: "4px 10px", borderRadius: 6, fontWeight: 600, cursor: "pointer" }}>Workflow ↗</span>}
          </div>
        )}
      </motion.div>
    </Reveal>
  );
}

// --- Skill bar ---
function SkillBar({ name, level, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay }}
      style={{ ...glass, padding: "13px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{name}</span>
        <span style={{ fontSize: 11, color: "var(--muted)" }}>{level}%</span>
      </div>
      <div style={{ height: 4, background: "var(--surface)", borderRadius: 2, overflow: "hidden" }}>
        <motion.div initial={{ width: 0 }} animate={inView ? { width: level + "%" } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: delay + 0.2 }}
          style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg, var(--accent), var(--accent2))" }} />
      </div>
    </motion.div>
  );
}

// --- Modal ---
function Modal({ p, onClose }) {
  if (!p) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <motion.div initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} onClick={e => e.stopPropagation()}
        style={{ background: "var(--bg2)", border: "1px solid var(--glass-b)", borderRadius: 20, maxWidth: 620, width: "100%", maxHeight: "82vh", overflow: "auto", padding: 32, position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "var(--glass)", border: "1px solid var(--glass-b)", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}><X size={16} /></button>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${p.color}, transparent)`, borderRadius: "20px 20px 0 0" }} />
        <span style={{ fontSize: 40, display: "block", marginBottom: 10 }}>{p.emoji}</span>
        <span style={{ fontSize: 11, color: p.color, background: p.color + "14", padding: "3px 12px", borderRadius: 14, fontWeight: 600 }}>{p.cat}</span>
        <h2 style={{ fontSize: 24, fontWeight: 800, margin: "10px 0 4px", letterSpacing: "-0.3px" }}>{p.title}</h2>
        <p style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500, marginBottom: 16 }}>{p.client} · {p.year}</p>
        {(p.demo || p.repo || p.workflow) && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
            {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: "#FFF", background: p.color, padding: "8px 18px", borderRadius: 10, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}><Play size={14} /> Live Demo</a>}
            {p.repo && <a href={p.repo} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: "var(--text2)", background: "var(--glass)", padding: "8px 18px", borderRadius: 10, fontWeight: 600, border: "1px solid var(--glass-b)" }}>View Repo ↗</a>}
            {p.workflow && <a href={p.workflow} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: "var(--text2)", background: "var(--glass)", padding: "8px 18px", borderRadius: 10, fontWeight: 600, border: "1px solid var(--glass-b)" }}>View Workflow ↗</a>}
          </div>
        )}
        <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.75, marginBottom: 20 }}>{p.desc}</p>
        <p style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700, marginBottom: 8 }}>Metrics</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {Object.entries(p.metrics).map(([k, v]) => (
            <div key={k} style={{ ...glass, padding: "12px 16px", flex: "1", minWidth: 100 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: p.color }}>{v}</div>
              <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{k}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 16 }}>
          {p.tags.map(t => <span key={t} style={{ fontSize: 10, color: "var(--muted)", background: "var(--surface)", padding: "3px 9px", borderRadius: 6, fontWeight: 500 }}>{t}</span>)}
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- Main App ---
export default function App() {
  const [dark, setDark] = useState(true);
  const [cat, setCat] = useState(0);
  const [sel, setSel] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const h = e => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  useEffect(() => { document.body.className = dark ? "" : "light"; }, [dark]);

  const filtered = cat === 0 ? PROJECTS : PROJECTS.filter(p => p.cat === CATEGORIES[cat]);
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* Cursor glow */}
      <div style={{ position: "fixed", top: mouse.y - 300, left: mouse.x - 300, width: 600, height: 600,
        background: `radial-gradient(circle, ${dark ? "rgba(52,211,153,.04)" : "rgba(5,150,105,.03)"} 0%, transparent 70%)`,
        pointerEvents: "none", zIndex: 0, transition: "top .3s ease, left .3s ease" }} />

      {/* Nav */}
      <motion.nav initial={{ y: -60 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "14px 28px",
          display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all .3s",
          ...(scrolled ? { background: dark ? "rgba(11,14,20,.85)" : "rgba(247,248,250,.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--glass-b)" } : {}) }}>
        <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px" }}>
          eyad<span style={{ color: "var(--accent)" }}>.</span><span style={{ color: "var(--muted)" }}>dev</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {["projects", "skills", "experience", "contact"].map(s => (
            <span key={s} onClick={() => go(s)} style={{ fontSize: 13, color: "var(--text2)", cursor: "pointer", padding: "6px 12px", borderRadius: 8, fontWeight: 500, transition: "all .2s" }}
              onMouseEnter={e => { e.target.style.color = "var(--text)"; e.target.style.background = "var(--glow)" }}
              onMouseLeave={e => { e.target.style.color = "var(--text2)"; e.target.style.background = "transparent" }}>
              {s.charAt(0).toUpperCase() + s.slice(1)}</span>
          ))}
          <button onClick={() => setDark(!dark)} style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid var(--glass-b)",
            background: "var(--glass)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text2)", transition: "all .2s" }}>
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a href="https://wa.me/201210280648" target="_blank" rel="noopener noreferrer">
            <button style={{ background: "var(--accent)", color: "#FFF", fontWeight: 700, fontSize: 13, padding: "8px 18px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "inherit" }}>Let's Talk</button>
          </a>
        </div>
      </motion.nav>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "100px 24px 60px", position: "relative" }}>
        <div style={{ maxWidth: 700, position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--glow)", border: `1px solid ${dark ? "rgba(52,211,153,.2)" : "rgba(5,150,105,.15)"}`,
              borderRadius: 20, padding: "5px 14px", marginBottom: 26 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
              <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600 }}>Botpress Certified Partner</span>
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: "clamp(38px, 5.5vw, 66px)", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.05, marginBottom: 16 }}>
            Eyad <span style={{ background: "linear-gradient(135deg, var(--accent), var(--accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Sofian</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: "clamp(15px, 1.8vw, 20px)", color: "var(--text2)", fontWeight: 500, marginBottom: 10 }}>
            AI Product & Technology Specialist
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, maxWidth: 530, margin: "0 auto 34px" }}>
            I build production-grade chatbots, automation workflows, and system integrations — for clients across Egypt, Saudi Arabia, and the Gulf region.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => go("projects")} style={{ background: "var(--accent)", color: "#FFF", padding: "12px 28px", borderRadius: 12, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit",
              boxShadow: `0 0 30px ${dark ? "rgba(52,211,153,.15)" : "rgba(5,150,105,.1)"}` }}>View Projects</button>
            {[["GitHub", "https://github.com/EyadSofian", Github], ["LinkedIn", "https://www.linkedin.com/in/eyad-sofian-16b753238", Linkedin], ["Botpress", "https://botpress.com/experts/eyad-sofian", ExternalLink]].map(([l, u, Icon]) => (
              <a key={l} href={u} target="_blank" rel="noopener noreferrer" style={{ ...glass, padding: "10px 22px", display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--text2)" }}>
                <Icon size={14} /> {l}</a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 28px 72px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
        {[["🚀", "15+", "Projects"], ["⚡", "22", "n8n Workflows"], ["🤖", "8+", "Bots Live"], ["🤝", "10+", "Clients"]].map(([icon, val, label], i) => (
          <Reveal key={i} delay={i * 0.08}>
            <motion.div whileHover={{ y: -3, borderColor: "var(--accent)" }} style={{ ...glass, padding: 22, textAlign: "center", transition: "border-color .2s" }}>
              <div style={{ fontSize: 26, marginBottom: 5 }}>{icon}</div>
              <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-1px" }}>{val}</div>
              <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500, marginTop: 2 }}>{label}</div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      {/* Projects */}
      <section id="projects" style={{ maxWidth: 1060, margin: "0 auto", padding: "72px 28px" }}>
        <Reveal>
          <p style={{ fontSize: 11, color: "var(--accent)", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Portfolio</p>
          <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.5px" }}>Featured Projects</h2>
          <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 4, marginBottom: 28 }}>Real production systems solving real business problems.</p>
        </Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
          {CATEGORIES.map((c, i) => (
            <motion.button key={c} whileTap={{ scale: 0.95 }} onClick={() => setCat(i)}
              style={{ ...glass, padding: "7px 16px", borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 600,
                fontFamily: "inherit", color: cat === i ? "#FFF" : "var(--text2)",
                background: cat === i ? "var(--accent)" : "var(--glass)",
                borderColor: cat === i ? "var(--accent)" : "var(--glass-b)" }}>
              {c}
            </motion.button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={cat} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 16 }}>
            {filtered.map((p, i) => <ProjectCard key={p.id} p={p} i={i} onClick={setSel} />)}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Skills */}
      <section id="skills" style={{ maxWidth: 1060, margin: "0 auto", padding: "72px 28px" }}>
        <Reveal>
          <p style={{ fontSize: 11, color: "var(--accent2)", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Tech Stack</p>
          <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 28 }}>Tools & Technologies</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
          {SKILLS.map(([n, l], i) => <SkillBar key={n} name={n} level={l} delay={i * 0.03} />)}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" style={{ maxWidth: 1060, margin: "0 auto", padding: "72px 28px" }}>
        <Reveal>
          <p style={{ fontSize: 11, color: "#F87171", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Career</p>
          <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 28 }}>Experience</h2>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {EXPERIENCE.map((e, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ display: "flex", gap: 18 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: e.current ? "var(--accent)" : "var(--glass-b)",
                    border: e.current ? "none" : "2px solid var(--glass-b)" }} />
                  {i < EXPERIENCE.length - 1 && <div style={{ width: 1, background: "var(--glass-b)", flex: 1, minHeight: 55 }} />}
                </div>
                <div style={{ paddingBottom: 26 }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{e.role}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>{e.co}</span> · {e.period}
                  </div>
                  <span style={{ fontSize: 10, color: "var(--muted)", background: "var(--glass)", padding: "2px 8px", borderRadius: 4, fontWeight: 500, display: "inline-block", marginTop: 4 }}>{e.type}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Certs */}
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 28px 72px" }}>
        <Reveal>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 18 }}>Certifications</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {CERTS.map((c, i) => (
              <motion.div key={i} whileHover={{ y: -2 }}
                style={{ background: c.color + "0A", border: `1px solid ${c.color}20`, borderRadius: 12, padding: "12px 18px", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "var(--text2)", fontWeight: 500 }}>{c.name}</span>
                {c.link && <a href={c.link} target="_blank" rel="noopener noreferrer" style={{ color: c.color, display: "flex" }}><ExternalLink size={12} /></a>}
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Contact */}
      <section id="contact" style={{ maxWidth: 660, margin: "0 auto", padding: "72px 28px 90px", textAlign: "center" }}>
        <Reveal>
          <p style={{ fontSize: 11, color: "#FBBF24", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>Get in Touch</p>
          <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>Let's Build Something</h2>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 30, lineHeight: 1.65 }}>
            Open to AI automation, chatbot development, and system integration projects — especially for Arabic-speaking markets.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://wa.me/201210280648" target="_blank" rel="noopener noreferrer">
              <motion.button whileHover={{ y: -2 }} style={{ background: "#25D366", color: "#FFF", padding: "12px 26px", borderRadius: 12, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
                <MessageCircle size={16} /> WhatsApp
              </motion.button>
            </a>
            <a href="mailto:eyadsofian862@gmail.com" style={{ ...glass, padding: "12px 26px", display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: "var(--text2)" }}>
              <Mail size={16} /> Email
            </a>
            <a href="https://botpress.com/experts/eyad-sofian" target="_blank" rel="noopener noreferrer" style={{ ...glass, padding: "12px 26px", display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: "var(--text2)" }}>
              Hire on Botpress <ExternalLink size={14} />
            </a>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--glass-b)", padding: "18px 28px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, color: "var(--muted)" }}>© 2026 Eyad Sofian · Cairo, Egypt</span>
        <span style={{ fontSize: 11, color: "var(--muted)" }}>Built with React + Framer Motion</span>
      </footer>

      {/* Modal */}
      <AnimatePresence>{sel && <Modal p={sel} onClose={() => setSel(null)} />}</AnimatePresence>
    </>
  );
}
