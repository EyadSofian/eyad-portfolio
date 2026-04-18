import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Moon, Sun, ExternalLink, Github, Linkedin, MessageCircle,
  Mail, X, Play, Menu, ChevronRight, Send, CheckCircle,
  Zap, Bot, Settings, Code, Globe, MapPin, Clock, ArrowUpRight
} from "lucide-react";
import { PROJECTS, CATEGORIES, SKILL_GROUPS, EXPERIENCE, CERTS } from "./data";

/* ─── ANIMATION PRESETS ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }
});

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } }
};
const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

/* ─── SCROLL REVEAL WRAPPER ─── */
function R({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── FLOW DIAGRAM ─── */
function FlowDiagram({ steps, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", overflowX: "auto", padding: "12px 0", gap: 0, WebkitOverflowScrolling: "touch" }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: color + "14",
              border: `1.5px solid ${color}35`,
              borderRadius: 8,
              padding: "7px 11px",
              textAlign: "center",
              minWidth: 76
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 600, color, lineHeight: 1.3 }}>{s}</div>
          </motion.div>
          {i < steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 + 0.08 }}
            >
              <ChevronRight size={13} style={{ color: color + "60", flexShrink: 0, margin: "0 2px" }} />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── STATUS BADGE ─── */
function StatusBadge({ demo, repo }) {
  const hasLive = !!demo;
  return (
    <span className={hasLive ? "badge-live" : "badge-done"}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
      {hasLive ? "Live" : "Completed"}
    </span>
  );
}

/* ─── PROJECT CARD ─── */
function Card({ p, i, onClick, featured = false }) {
  return (
    <R delay={i * 0.04} style={{ height: "100%" }}>
      <motion.div
        onClick={() => onClick(p)}
        whileHover={{ y: -3, boxShadow: `0 12px 40px ${p.color}18` }}
        transition={{ duration: 0.2 }}
        className="glass"
        style={{
          padding: featured ? "22px 20px" : "18px 16px",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* top accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${p.color},transparent)` }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <span style={{ fontSize: featured ? 28 : 22 }}>{p.emoji}</span>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <StatusBadge demo={p.demo} repo={p.repo} />
          </div>
        </div>

        <span style={{ fontSize: "var(--t-xs)", color: p.color, background: p.color + "12", padding: "2px 8px", borderRadius: 10, fontWeight: 600, display: "inline-block", marginBottom: 6, width: "fit-content" }}>{p.cat}</span>
        <h3 style={{ fontSize: featured ? "var(--t-md)" : "var(--t-base)", fontWeight: 700, marginBottom: 3, lineHeight: 1.3 }}>{p.title}</h3>
        <p style={{ fontSize: "var(--t-xs)", color: "var(--muted)", fontWeight: 500, marginBottom: 8 }}>{p.client} · {p.year}</p>
        <p style={{ fontSize: "var(--t-sm)", color: "var(--text2)", lineHeight: 1.65, marginBottom: 12, flex: 1 }}>
          {featured ? p.desc : (p.desc.length > 110 ? p.desc.slice(0, 110) + "…" : p.desc)}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
          {p.tags.slice(0, 4).map(t => <span key={t} className="tech-tag">{t}</span>)}
          {p.tags.length > 4 && <span style={{ fontSize: 9, color: "var(--muted)" }}>+{p.tags.length - 4}</span>}
        </div>

        {(p.demo || p.repo) && (
          <div style={{ display: "flex", gap: 5 }}>
            {p.demo && (
              <button
                onClick={e => { e.stopPropagation(); window.open(p.demo, "_blank"); }}
                style={{ fontSize: 9, color: "#fff", background: p.color, padding: "3px 9px", borderRadius: 5, fontWeight: 700, display: "flex", alignItems: "center", gap: 3, border: "none" }}
              >
                <Play size={8} /> Try it
              </button>
            )}
            {p.repo && (
              <button
                onClick={e => { e.stopPropagation(); window.open(p.repo, "_blank"); }}
                style={{ fontSize: 9, color: "var(--text2)", background: "var(--surface2)", padding: "3px 9px", borderRadius: 5, fontWeight: 600, border: "1px solid var(--glass-b)" }}
              >
                Repo ↗
              </button>
            )}
          </div>
        )}
      </motion.div>
    </R>
  );
}

/* ─── PROJECT MODAL ─── */
function Modal({ p, onClose }) {
  useEffect(() => {
    const handler = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={p.title}
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,.65)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--bg2)",
          border: "1px solid var(--glass-b)",
          borderRadius: 18,
          maxWidth: 600,
          width: "100%",
          maxHeight: "88vh",
          overflow: "auto",
          padding: "28px 24px",
          position: "relative"
        }}
      >
        {/* accent top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${p.color},transparent)`, borderRadius: "18px 18px 0 0" }} />

        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{ position: "absolute", top: 12, right: 12, background: "var(--glass)", border: "1px solid var(--glass-b)", borderRadius: "50%", width: 30, height: 30, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}
        >
          <X size={14} />
        </button>

        <span style={{ fontSize: 36, display: "block", marginBottom: 8 }}>{p.emoji}</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", marginBottom: 8 }}>
          <span style={{ fontSize: "var(--t-xs)", color: p.color, background: p.color + "14", padding: "2px 9px", borderRadius: 10, fontWeight: 600 }}>{p.cat}</span>
          <StatusBadge demo={p.demo} repo={p.repo} />
        </div>

        <h2 style={{ fontSize: "var(--t-lg)", fontWeight: 800, lineHeight: 1.2, marginBottom: 4 }}>{p.title}</h2>
        <p style={{ fontSize: "var(--t-xs)", color: "var(--muted)", fontWeight: 500, marginBottom: 14 }}>{p.client} · {p.year}</p>

        {(p.demo || p.repo) && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "var(--t-sm)", color: "#fff", background: p.color, padding: "7px 16px", borderRadius: 8, fontWeight: 700, display: "flex", alignItems: "center", gap: 5 }}>
                <Play size={12} /> Live Demo
              </a>
            )}
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "var(--t-sm)", color: "var(--text2)", background: "var(--glass)", padding: "7px 16px", borderRadius: 8, fontWeight: 600, border: "1px solid var(--glass-b)", display: "flex", alignItems: "center", gap: 5 }}>
                <Github size={12} /> View Repo
              </a>
            )}
          </div>
        )}

        <p style={{ fontSize: "var(--t-base)", color: "var(--text2)", lineHeight: 1.7, marginBottom: 18 }}>{p.desc}</p>

        <p style={{ fontSize: "var(--t-xs)", color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 700, marginBottom: 6 }}>Workflow</p>
        <FlowDiagram steps={p.flow} color={p.color} />

        <p style={{ fontSize: "var(--t-xs)", color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 700, marginTop: 16, marginBottom: 10 }}>Key Metrics</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))", gap: 8, marginBottom: 16 }}>
          {Object.entries(p.metrics).map(([k, v]) => (
            <div key={k} className="glass" style={{ padding: "12px 10px", textAlign: "center" }}>
              <div style={{ fontSize: "var(--t-lg)", fontWeight: 800, color: p.color, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 9, color: "var(--muted)", marginTop: 4, fontWeight: 600 }}>{k}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {p.tags.map(t => <span key={t} className="tech-tag">{t}</span>)}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── SKILLS SECTION ─── */
const SKILL_ICONS = {
  "AI/ML & LLMs": <Zap size={13} />,
  "Automation": <Settings size={13} />,
  "Conversational AI": <Bot size={13} />,
  "Integration & APIs": <Globe size={13} />,
  "Dev & Infrastructure": <Code size={13} />
};

function SkillsSection() {
  const [activeGroup, setActiveGroup] = useState(null);
  return (
    <section id="skills" className="section">
      <div className="container">
        <R>
          <p className="section-label" style={{ color: "var(--accent2)" }}>Tech Stack</p>
          <h2 className="section-title">Tools &amp; Technologies</h2>
          <p className="section-sub">Grouped by domain · Hover a category to filter</p>
        </R>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {SKILL_GROUPS.map((group, gi) => (
            <R key={group.label} delay={gi * 0.06}>
              <motion.div
                className="glass"
                style={{ padding: "18px 20px" }}
                onHoverStart={() => setActiveGroup(gi)}
                onHoverEnd={() => setActiveGroup(null)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: group.color + "15",
                    border: `1px solid ${group.color}25`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: group.color, flexShrink: 0
                  }}>
                    {SKILL_ICONS[group.label]}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: "var(--t-base)" }}>{group.label}</span>
                  <span style={{ fontSize: "var(--t-xs)", color: "var(--muted)", marginLeft: "auto" }}>{group.exp}</span>
                </div>
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate={activeGroup === gi ? "show" : "hidden"}
                  style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
                >
                  {group.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      variants={staggerItem}
                      className="skill-tag"
                      style={{ borderColor: group.color + "30", color: "var(--text2)" }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
                {/* always visible compact list when not hovered */}
                {activeGroup !== gi && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {group.skills.map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                )}
              </motion.div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── EXPERIENCE SECTION ─── */
function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <R>
          <p className="section-label" style={{ color: "#F87171" }}>Career</p>
          <h2 className="section-title">Experience</h2>
        </R>
        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 8 }}>
          {EXPERIENCE.map((e, i) => (
            <R key={i} delay={i * 0.06}>
              <div style={{ display: "flex", gap: 16 }}>
                {/* Timeline spine */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 3 }}>
                  {e.current ? (
                    <motion.div
                      animate={{ scale: [1, 1.25, 1], boxShadow: ["0 0 0 3px rgba(52,211,153,0.15)", "0 0 0 6px rgba(52,211,153,0.05)", "0 0 0 3px rgba(52,211,153,0.15)"] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                      className="timeline-dot-active"
                    />
                  ) : (
                    <div className="timeline-dot" />
                  )}
                  {i < EXPERIENCE.length - 1 && <div className="timeline-line" />}
                </div>

                {/* Content */}
                <div style={{ paddingBottom: 28, flex: 1 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "baseline", marginBottom: 2 }}>
                    <span style={{ fontSize: "var(--t-base)", fontWeight: 700 }}>{e.role}</span>
                    {e.current && (
                      <span style={{ fontSize: "var(--t-xs)", color: "var(--accent)", background: "var(--glow)", padding: "1px 7px", borderRadius: 10, fontWeight: 600, border: "1px solid rgba(52,211,153,0.15)" }}>
                        Current
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "var(--t-sm)", color: "var(--muted)", fontWeight: 500, marginBottom: 4 }}>
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>{e.co}</span> · {e.period}
                  </div>
                  <span style={{ fontSize: 9, color: "var(--muted)", background: "var(--glass)", padding: "1px 7px", borderRadius: 4, fontWeight: 600, display: "inline-block", border: "1px solid var(--glass-b)" }}>{e.type}</span>

                  {/* Tech tags */}
                  {e.tech && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                      {e.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                    </div>
                  )}

                  <ul style={{ margin: "10px 0 0 0", padding: 0, listStyle: "none" }}>
                    {e.bullets.map((b, j) => (
                      <li key={j} style={{ fontSize: "var(--t-sm)", color: "var(--text2)", lineHeight: 1.6, marginBottom: 5, paddingLeft: 14, position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, top: 7, width: 4, height: 4, borderRadius: "50%", background: e.current ? "var(--accent)" : "var(--glass-b)", display: "block" }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT FORM ─── */
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "37492e85-55bb-4594-8018-2647115be762",
          subject: `Portfolio inquiry from ${form.name}`,
          from_name: form.name,
          ...form
        })
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container" style={{ maxWidth: 680 }}>
        <R>
          <p className="section-label" style={{ color: "var(--accent3)" }}>Get in Touch</p>
          <h2 className="section-title">Let's Build Something</h2>
          <p className="section-sub">Open to AI automation, chatbot development, LLM fine-tuning, and system integration projects. Usually respond within 24 hours.</p>
        </R>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Form */}
          <R delay={0.1} className="hide-mobile" style={{ gridColumn: "1" }}>
            <div className="glass" style={{ padding: "24px 22px" }}>
              {status === "success" ? (
                <motion.div {...fadeUp()} style={{ textAlign: "center", padding: "32px 0" }}>
                  <CheckCircle size={40} style={{ color: "var(--accent)", margin: "0 auto 12px" }} />
                  <h3 style={{ fontSize: "var(--t-md)", fontWeight: 700, marginBottom: 6 }}>Message sent!</h3>
                  <p style={{ fontSize: "var(--t-sm)", color: "var(--muted)" }}>I'll get back to you within 24 hours.</p>
                  <button onClick={() => setStatus("idle")} className="btn-ghost" style={{ marginTop: 16, fontSize: "var(--t-xs)" }}>Send another</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input id="name" name="name" className="form-input" placeholder="Your name" required value={form.name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" className="form-input" placeholder="you@company.com" required value={form.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="budget">Project Budget</label>
                    <select id="budget" name="budget" className="form-input form-select" value={form.budget} onChange={handleChange}>
                      <option value="">Select range…</option>
                      <option value="&lt;$500">&lt;$500</option>
                      <option value="$500–$2k">$500 – $2,000</option>
                      <option value="$2k–$5k">$2,000 – $5,000</option>
                      <option value="$5k+">$5,000+</option>
                      <option value="Retainer">Monthly Retainer</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Message</label>
                    <textarea id="message" name="message" className="form-textarea" placeholder="Describe your project or idea…" required value={form.message} onChange={handleChange} />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary"
                    style={{ justifyContent: "center", opacity: status === "sending" ? 0.7 : 1 }}
                  >
                    <Send size={13} />
                    {status === "sending" ? "Sending…" : "Send Message"}
                  </motion.button>
                  {status === "error" && (
                    <p style={{ fontSize: "var(--t-xs)", color: "#F87171", textAlign: "center" }}>Something went wrong. Try emailing me directly.</p>
                  )}
                </form>
              )}
            </div>
          </R>

          {/* Contact info panel */}
          <R delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: <MessageCircle size={14} />, label: "WhatsApp", value: "+20 121 028 0648", href: "https://wa.me/201210280648", color: "#25D366" },
                { icon: <Mail size={14} />, label: "Email", value: "eyadsofian862@gmail.com", href: "mailto:eyadsofian862@gmail.com", color: "var(--accent2)" },
                { icon: <Linkedin size={14} />, label: "LinkedIn", value: "eyad-sofian", href: "https://linkedin.com/in/eyad-sofian-16b753238", color: "#0A66C2" },
                { icon: <Github size={14} />, label: "GitHub", value: "EyadSofian", href: "https://github.com/EyadSofian", color: "var(--text2)" },
                { icon: <Bot size={14} />, label: "Botpress Expert", value: "View Profile", href: "https://botpress.com/experts/eyad-sofian", color: "#10B981" },
              ].map(({ icon, label, value, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="glass"
                  style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}
                >
                  <span style={{ width: 30, height: 30, borderRadius: 8, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: "var(--t-xs)", color: "var(--muted)", fontWeight: 600 }}>{label}</div>
                    <div style={{ fontSize: "var(--t-sm)", color: "var(--text2)", fontWeight: 500 }}>{value}</div>
                  </div>
                  <ArrowUpRight size={12} style={{ color: "var(--muted)", marginLeft: "auto" }} />
                </motion.a>
              ))}

              <div className="glass" style={{ padding: "12px 14px", marginTop: 4 }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
                  <Clock size={12} style={{ color: "var(--muted)" }} />
                  <span style={{ fontSize: "var(--t-xs)", color: "var(--muted)", fontWeight: 600 }}>Timezone &amp; Availability</span>
                </div>
                <p style={{ fontSize: "var(--t-sm)", color: "var(--text2)", lineHeight: 1.5 }}>
                  Cairo, Egypt (UTC+3) · Available for projects in EG, SA, UAE, KW, QA and remote globally
                </p>
              </div>
            </div>
          </R>

          {/* Form — shown on mobile below contact info */}
          <div className="show-mobile" style={{ display: "none", gridColumn: "1 / -1" }}>
            <div className="glass" style={{ padding: "20px 16px", width: "100%" }}>
              {status === "success" ? (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <CheckCircle size={36} style={{ color: "var(--accent)", margin: "0 auto 10px" }} />
                  <h3 style={{ fontSize: "var(--t-md)", fontWeight: 700, marginBottom: 6 }}>Message sent!</h3>
                  <p style={{ fontSize: "var(--t-sm)", color: "var(--muted)" }}>I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="name-m">Name</label>
                    <input id="name-m" name="name" className="form-input" placeholder="Your name" required value={form.name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email-m">Email</label>
                    <input id="email-m" name="email" type="email" className="form-input" placeholder="you@company.com" required value={form.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="message-m">Message</label>
                    <textarea id="message-m" name="message" className="form-textarea" placeholder="Describe your project…" required value={form.message} onChange={handleChange} style={{ minHeight: 90 }} />
                  </div>
                  <button type="submit" disabled={status === "sending"} className="btn-primary" style={{ justifyContent: "center" }}>
                    <Send size={13} />
                    {status === "sending" ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── MAIN APP ─── */
export default function App() {
  const [dark, setDark] = useState(true);
  const [cat, setCat] = useState(0);
  const [sel, setSel] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.className = dark ? "" : "light";
  }, [dark]);

  /* lock scroll when modal open */
  useEffect(() => {
    document.body.style.overflow = sel ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sel]);

  const filtered = cat === 0 ? PROJECTS : PROJECTS.filter(p => p.cat === CATEGORIES[cat]);
  const featured = PROJECTS.slice(0, 4);
  const rest = PROJECTS.slice(4);
  const filteredFeatured = cat === 0 ? featured : filtered.filter(p => featured.includes(p));
  const filteredRest = cat === 0 ? rest : filtered.filter(p => rest.includes(p));

  const go = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  const navs = ["projects", "skills", "experience", "contact"];

  return (
    <>
      {/* ── NAV ── */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "10px 20px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          transition: "background 0.3s, border-color 0.3s",
          ...(scrolled ? {
            background: dark ? "rgba(11,14,20,0.92)" : "rgba(244,246,250,0.92)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid var(--glass-b)"
          } : {})
        }}
      >
        <div style={{ fontWeight: 800, fontSize: "var(--t-md)", letterSpacing: "-0.3px" }}>
          eyad<span style={{ color: "var(--accent)" }}>.</span><span style={{ color: "var(--muted)" }}>dev</span>
        </div>

        {/* Desktop nav */}
        <div className="hide-mobile" style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {navs.map(s => (
            <button key={s} onClick={() => go(s)} className="nav-link">
              {s[0].toUpperCase() + s.slice(1)}
            </button>
          ))}
          <button
            onClick={() => setDark(!dark)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid var(--glass-b)", background: "var(--glass)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text2)" }}
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <a href="https://wa.me/201210280648" target="_blank" rel="noopener noreferrer">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ background: "var(--accent)", color: "#fff", fontWeight: 700, fontSize: "var(--t-sm)", padding: "7px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit" }}
            >
              Let's Talk
            </motion.button>
          </a>
        </div>

        {/* Mobile controls */}
        <div className="show-mobile" style={{ gap: 6, alignItems: "center" }}>
          <button
            onClick={() => setDark(!dark)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid var(--glass-b)", background: "var(--glass)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text2)" }}
          >
            {dark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid var(--glass-b)", background: "var(--glass)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text2)" }}
          >
            {menuOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed", top: 54, left: 0, right: 0, zIndex: 99,
              background: dark ? "rgba(11,14,20,0.97)" : "rgba(244,246,250,0.97)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid var(--glass-b)",
              padding: "12px 20px 16px"
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {navs.map(s => (
                <button
                  key={s}
                  onClick={() => go(s)}
                  style={{ fontSize: "var(--t-md)", color: "var(--text)", padding: "11px 0", cursor: "pointer", fontWeight: 600, borderBottom: "1px solid var(--glass-b)", background: "none", border: "none", borderBottom: "1px solid var(--glass-b)", textAlign: "left", fontFamily: "inherit" }}
                >
                  {s[0].toUpperCase() + s.slice(1)}
                </button>
              ))}
              <a href="https://wa.me/201210280648" target="_blank" rel="noopener noreferrer" style={{ marginTop: 10 }}>
                <button style={{ background: "var(--accent)", color: "#fff", fontWeight: 700, fontSize: "var(--t-base)", padding: "12px 0", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "inherit", width: "100%" }}>
                  Let's Talk
                </button>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex", alignItems: "center", justifyContent: "center",
          textAlign: "center",
          padding: "90px 20px 48px",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Grid background */}
        <div className="hero-grid" />
        <div className="hero-glow" />

        <div style={{ maxWidth: 640, position: "relative", zIndex: 1 }}>
          {/* Availability badge */}
          <motion.div {...fadeUp(0)}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--glow)", border: "1px solid rgba(52,211,153,0.20)", borderRadius: 20, padding: "4px 14px", marginBottom: 22 }}>
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }}
              />
              <span style={{ fontSize: "var(--t-xs)", color: "var(--accent)", fontWeight: 700 }}>
                Open to projects · Botpress Certified Partner
              </span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1 {...fadeUp(0.07)} style={{ fontSize: "var(--t-hero)", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.05, marginBottom: 14 }}>
            Eyad{" "}
            <span style={{ background: "linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Sofian
            </span>
          </motion.h1>

          {/* Role */}
          <motion.p {...fadeUp(0.13)} style={{ fontSize: "clamp(14px,2.2vw,18px)", color: "var(--text2)", fontWeight: 500, marginBottom: 10, letterSpacing: "-0.2px" }}>
            AI Product &amp; Technology Specialist
          </motion.p>

          {/* Tagline */}
          <motion.p {...fadeUp(0.19)} style={{ fontSize: "clamp(12px,1.4vw,14px)", color: "var(--muted)", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 10px" }}>
            I build production chatbots, automation workflows, LLM fine-tuning pipelines, and system integrations — serving clients across Egypt, Saudi Arabia, and the Gulf.
          </motion.p>

          {/* Location */}
          <motion.div {...fadeUp(0.22)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginBottom: 28 }}>
            <MapPin size={11} style={{ color: "var(--muted)" }} />
            <span style={{ fontSize: "var(--t-xs)", color: "var(--muted)", fontWeight: 500 }}>Cairo, Egypt · UTC+3</span>
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.26)} style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            <motion.button
              onClick={() => go("projects")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary"
            >
              View Projects
            </motion.button>
            {[
              ["GitHub", "https://github.com/EyadSofian", Github],
              ["LinkedIn", "https://www.linkedin.com/in/eyad-sofian-16b753238", Linkedin]
            ].map(([label, url, Icon]) => (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="glass btn-ghost"
                style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "8px 16px" }}
              >
                <Icon size={13} />{label}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="container" style={{ paddingBottom: "var(--sp-12)" }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8 }}
        >
          {[
            ["15+", "Projects"],
            ["22", "n8n Workflows"],
            ["8+", "Bots Live"],
            ["10+", "Clients"],
            ["3+", "LLMs Fine-tuned"]
          ].map(([val, lb]) => (
            <motion.div
              key={lb}
              variants={staggerItem}
              whileHover={{ y: -3 }}
              className="glass"
              style={{ padding: "16px 12px", textAlign: "center" }}
            >
              <div style={{ fontSize: "clamp(20px,4vw,28px)", fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)", lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: "var(--t-xs)", color: "var(--muted)", fontWeight: 500, marginTop: 4 }}>{lb}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section">
        <div className="container">
          <R>
            <p className="section-label" style={{ color: "var(--accent)" }}>Portfolio</p>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-sub">Real production systems — not demos. Click any card for details + animated workflow.</p>
          </R>

          {/* Category filters */}
          <div style={{ display: "flex", flexWrap: "nowrap", gap: 6, marginBottom: 24, overflowX: "auto", paddingBottom: 4, WebkitOverflowScrolling: "touch" }}>
            {CATEGORIES.map((c, i) => (
              <motion.button
                key={c}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCat(i)}
                className={`cat-btn${cat === i ? " active" : ""}`}
              >
                {c}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={cat} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              {/* Bento grid for featured (first 4 when showing All) */}
              {cat === 0 && (
                <>
                  <div className="bento-grid" style={{ marginBottom: 12 }}>
                    {featured.map((p, i) => {
                      let bentoClass = "";
                      if (i === 0) bentoClass = "bento-featured-1";
                      else if (i === 1) bentoClass = "bento-featured-2";
                      else if (i === 2) bentoClass = "bento-featured-3";
                      else if (i === 3) bentoClass = "bento-featured-4";
                      return (
                        <div key={p.id} className={bentoClass}>
                          <Card p={p} i={i} onClick={setSel} featured={i === 0 || i === 3} />
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
                    {rest.map((p, i) => <Card key={p.id} p={p} i={i + 4} onClick={setSel} />)}
                  </div>
                </>
              )}

              {/* Filtered view — uniform grid */}
              {cat !== 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
                  {filtered.map((p, i) => <Card key={p.id} p={p} i={i} onClick={setSel} />)}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <SkillsSection />
      <ExperienceSection />

      {/* ── CERTS ── */}
      <div className="container" style={{ paddingBottom: "var(--sp-12)" }}>
        <R>
          <h2 style={{ fontSize: "var(--t-lg)", fontWeight: 800, marginBottom: 14 }}>Certifications</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CERTS.map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                className="cert-badge glass"
                style={{ borderColor: c.color + "22", background: c.color + "08" }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                <span style={{ fontSize: "var(--t-sm)", color: "var(--text2)", fontWeight: 500 }}>{c.name}</span>
                {c.link && (
                  <a href={c.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${c.name} certificate`} style={{ color: c.color, display: "flex", marginLeft: 2 }}>
                    <ExternalLink size={11} />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </R>
      </div>

      <ContactSection />

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid var(--glass-b)", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
        <span style={{ fontSize: "var(--t-xs)", color: "var(--muted)" }}>© 2026 Eyad Sofian · Cairo, Egypt</span>
        <span style={{ fontSize: "var(--t-xs)", color: "var(--muted)" }}>React + Vite + Framer Motion</span>
      </footer>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {sel && <Modal p={sel} onClose={() => setSel(null)} />}
      </AnimatePresence>
    </>
  );
}
