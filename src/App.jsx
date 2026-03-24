import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Moon, Sun, ExternalLink, Github, Linkedin, MessageCircle, Mail, X, Play, Menu, ChevronRight } from "lucide-react";
import { PROJECTS, CATEGORIES, SKILLS, EXPERIENCE, CERTS } from "./data";

const R = ({children, d=0}) => { const r=useRef(null); const v=useInView(r,{once:true,margin:"-30px"}); return <motion.div ref={r} initial={{opacity:0,y:20}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.45,delay:d,ease:[.16,1,.3,1]}}>{children}</motion.div>; };
const gl = {background:"var(--glass)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid var(--glass-b)",borderRadius:"var(--r)"};

/* ── Mini Flow Animation (per project in modal) ── */
function FlowDiagram({ steps, color }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:0,overflowX:"auto",padding:"16px 0",WebkitOverflowScrolling:"touch"}}>
      {steps.map((s, i) => (
        <div key={i} style={{display:"flex",alignItems:"center",flexShrink:0}}>
          <motion.div initial={{opacity:0,scale:0.7}} animate={{opacity:1,scale:1}} transition={{delay:i*0.12,duration:0.3,ease:[.16,1,.3,1]}}
            style={{background:color+"12",border:`1.5px solid ${color}40`,borderRadius:10,padding:"8px 12px",textAlign:"center",minWidth:80}}>
            <div style={{fontSize:10,fontWeight:600,color:color,lineHeight:1.3}}>{s}</div>
          </motion.div>
          {i < steps.length - 1 && (
            <motion.div initial={{opacity:0,x:-5}} animate={{opacity:1,x:0}} transition={{delay:i*0.12+0.1,duration:0.2}}>
              <ChevronRight size={14} style={{color:color+"80",flexShrink:0,margin:"0 2px"}} />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Project Card ── */
function Card({p,i,onClick}){
  return <R d={i*0.04}><motion.div onClick={()=>onClick(p)} whileHover={{y:-4}} transition={{duration:0.2}}
    style={{...gl,padding:"20px 18px",cursor:"pointer",position:"relative",overflow:"hidden",height:"100%"}}>
    <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${p.color},transparent)`}}/>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
      <span style={{fontSize:26}}>{p.emoji}</span>
      <span style={{fontSize:9.5,color:p.color,background:p.color+"14",padding:"3px 9px",borderRadius:10,fontWeight:600}}>{p.cat}</span>
    </div>
    <h3 style={{fontSize:15,fontWeight:700,marginBottom:3}}>{p.title}</h3>
    <p style={{fontSize:10.5,color:"var(--muted)",fontWeight:500,marginBottom:8}}>{p.client} · {p.year}</p>
    <p style={{fontSize:12,color:"var(--text2)",lineHeight:1.6,marginBottom:12}}>{p.desc.length>120?p.desc.slice(0,120)+"…":p.desc}</p>
    <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
      {p.tags.slice(0,3).map(t=><span key={t} style={{fontSize:9,color:"var(--muted)",background:"var(--surface)",padding:"2px 7px",borderRadius:5,fontWeight:500}}>{t}</span>)}
      {p.tags.length>3&&<span style={{fontSize:9,color:"var(--muted)"}}>+{p.tags.length-3}</span>}
    </div>
    {(p.demo||p.repo)&&<div style={{display:"flex",gap:5,marginTop:10}}>
      {p.demo&&<span onClick={e=>{e.stopPropagation();window.open(p.demo,"_blank")}} style={{fontSize:9,color:"#FFF",background:p.color,padding:"3px 9px",borderRadius:5,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:2}}><Play size={9}/> Try It</span>}
      {p.repo&&<span onClick={e=>{e.stopPropagation();window.open(p.repo,"_blank")}} style={{fontSize:9,color:"var(--text2)",background:"var(--surface)",padding:"3px 9px",borderRadius:5,fontWeight:600,cursor:"pointer"}}>Repo ↗</span>}
    </div>}
  </motion.div></R>;
}

/* ── Skill ── */
function Sk({name,level,d}){const r=useRef(null);const v=useInView(r,{once:true});return<motion.div ref={r} initial={{opacity:0}} animate={v?{opacity:1}:{}} transition={{delay:d}} style={{...gl,padding:"11px 13px"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span style={{fontSize:12,fontWeight:600}}>{name}</span><span style={{fontSize:10,color:"var(--muted)"}}>{level}%</span></div><div style={{height:3,background:"var(--surface)",borderRadius:2,overflow:"hidden"}}><motion.div initial={{width:0}} animate={v?{width:level+"%"}:{}} transition={{duration:1,ease:[.16,1,.3,1],delay:d+.2}} style={{height:"100%",borderRadius:2,background:"linear-gradient(90deg,var(--accent),var(--accent2))"}}/></div></motion.div>;}

/* ── Modal ── */
function Modal({p,onClose}){
  if(!p)return null;
  return <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}
    style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(0,0,0,.6)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:12}}>
    <motion.div initial={{opacity:0,y:20,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20}}
      transition={{duration:.3,ease:[.16,1,.3,1]}} onClick={e=>e.stopPropagation()}
      style={{background:"var(--bg2)",border:"1px solid var(--glass-b)",borderRadius:18,maxWidth:580,width:"100%",maxHeight:"85vh",overflow:"auto",padding:"24px 20px",position:"relative"}}>
      <button onClick={onClose} style={{position:"absolute",top:10,right:10,background:"var(--glass)",border:"1px solid var(--glass-b)",borderRadius:"50%",width:28,height:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--muted)"}}><X size={14}/></button>
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${p.color},transparent)`,borderRadius:"18px 18px 0 0"}}/>
      <span style={{fontSize:34,display:"block",marginBottom:6}}>{p.emoji}</span>
      <span style={{fontSize:10,color:p.color,background:p.color+"14",padding:"3px 10px",borderRadius:10,fontWeight:600}}>{p.cat}</span>
      <h2 style={{fontSize:20,fontWeight:800,margin:"8px 0 3px"}}>{p.title}</h2>
      <p style={{fontSize:11,color:"var(--muted)",fontWeight:500,marginBottom:6}}>{p.client} · {p.year}</p>
      {(p.demo||p.repo)&&<div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
        {p.demo&&<a href={p.demo} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:"#FFF",background:p.color,padding:"6px 14px",borderRadius:8,fontWeight:700,display:"flex",alignItems:"center",gap:4}}><Play size={12}/> Live Demo</a>}
        {p.repo&&<a href={p.repo} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:"var(--text2)",background:"var(--glass)",padding:"6px 14px",borderRadius:8,fontWeight:600,border:"1px solid var(--glass-b)"}}>View Repo ↗</a>}
      </div>}
      <p style={{fontSize:13,color:"var(--text2)",lineHeight:1.7,marginBottom:12}}>{p.desc}</p>

      {/* Animated workflow */}
      <p style={{fontSize:10,color:"var(--muted)",textTransform:"uppercase",letterSpacing:1.2,fontWeight:700,marginBottom:4}}>Workflow</p>
      <FlowDiagram steps={p.flow} color={p.color}/>

      <p style={{fontSize:10,color:"var(--muted)",textTransform:"uppercase",letterSpacing:1.2,fontWeight:700,marginTop:8,marginBottom:6}}>Metrics</p>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {Object.entries(p.metrics).map(([k,v])=><div key={k} style={{...gl,padding:"10px 12px",flex:1,minWidth:80}}><div style={{fontSize:16,fontWeight:800,color:p.color}}>{v}</div><div style={{fontSize:9,color:"var(--muted)",marginTop:1}}>{k}</div></div>)}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:12}}>
        {p.tags.map(t=><span key={t} style={{fontSize:9,color:"var(--muted)",background:"var(--surface)",padding:"2px 7px",borderRadius:5,fontWeight:500}}>{t}</span>)}
      </div>
    </motion.div>
  </motion.div>;
}

/* ── MAIN ── */
export default function App(){
  const[dark,setDark]=useState(true);
  const[cat,setCat]=useState(0);
  const[sel,setSel]=useState(null);
  const[scrolled,setScrolled]=useState(false);
  const[menuOpen,setMenuOpen]=useState(false);

  useEffect(()=>{const h=()=>setScrolled(scrollY>40);addEventListener("scroll",h,{passive:true});return()=>removeEventListener("scroll",h);},[]);
  useEffect(()=>{document.body.className=dark?"":"light"},[dark]);

  const filtered=cat===0?PROJECTS:PROJECTS.filter(p=>p.cat===CATEGORIES[cat]);
  const go=id=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setMenuOpen(false);};
  const navs=["projects","skills","experience","contact"];

  return <>
    {/* ── NAV ── */}
    <motion.nav initial={{y:-50}} animate={{y:0}} transition={{duration:.4}}
      style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"10px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all .3s",
        ...(scrolled?{background:dark?"rgba(11,14,20,.92)":"rgba(247,248,250,.92)",backdropFilter:"blur(14px)",borderBottom:"1px solid var(--glass-b)"}:{})}}>
      <div style={{fontWeight:800,fontSize:16}}>eyad<span style={{color:"var(--accent)"}}>.</span><span style={{color:"var(--muted)"}}>dev</span></div>

      {/* Desktop */}
      <div className="dn" style={{display:"flex",gap:6,alignItems:"center"}}>
        {navs.map(s=><span key={s} onClick={()=>go(s)} style={{fontSize:12.5,color:"var(--text2)",cursor:"pointer",padding:"5px 10px",borderRadius:7,fontWeight:500}}>{s[0].toUpperCase()+s.slice(1)}</span>)}
        <button onClick={()=>setDark(!dark)} style={{width:32,height:32,borderRadius:8,border:"1px solid var(--glass-b)",background:"var(--glass)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text2)"}}>{dark?<Sun size={14}/>:<Moon size={14}/>}</button>
        <a href="https://wa.me/201210280648" target="_blank" rel="noopener noreferrer"><button style={{background:"var(--accent)",color:"#FFF",fontWeight:700,fontSize:11.5,padding:"7px 14px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"inherit"}}>Let's Talk</button></a>
      </div>

      {/* Mobile */}
      <div className="mn" style={{display:"none",gap:6,alignItems:"center"}}>
        <button onClick={()=>setDark(!dark)} style={{width:32,height:32,borderRadius:8,border:"1px solid var(--glass-b)",background:"var(--glass)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text2)"}}>{dark?<Sun size={14}/>:<Moon size={14}/>}</button>
        <button onClick={()=>setMenuOpen(!menuOpen)} style={{width:32,height:32,borderRadius:8,border:"1px solid var(--glass-b)",background:"var(--glass)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--text2)"}}>{menuOpen?<X size={15}/>:<Menu size={15}/>}</button>
      </div>
    </motion.nav>

    {/* Mobile menu */}
    <AnimatePresence>{menuOpen&&<motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
      style={{position:"fixed",top:52,left:0,right:0,zIndex:99,background:dark?"rgba(11,14,20,.96)":"rgba(247,248,250,.96)",backdropFilter:"blur(14px)",borderBottom:"1px solid var(--glass-b)",padding:"12px 16px",display:"flex",flexDirection:"column",gap:2}}>
      {navs.map(s=><span key={s} onClick={()=>go(s)} style={{fontSize:14,color:"var(--text)",padding:"10px 0",cursor:"pointer",fontWeight:600,borderBottom:"1px solid var(--glass-b)"}}>{s[0].toUpperCase()+s.slice(1)}</span>)}
      <a href="https://wa.me/201210280648" target="_blank" rel="noopener noreferrer" style={{marginTop:8}}><button style={{background:"var(--accent)",color:"#FFF",fontWeight:700,fontSize:13,padding:"10px 0",borderRadius:9,border:"none",cursor:"pointer",fontFamily:"inherit",width:"100%"}}>Let's Talk</button></a>
    </motion.div>}</AnimatePresence>

    {/* ── HERO ── */}
    <section style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"80px 16px 40px",position:"relative"}}>
      <div style={{position:"absolute",top:"12%",left:"50%",transform:"translateX(-50%)",width:400,height:400,background:`radial-gradient(circle,${dark?"rgba(52,211,153,.04)":"rgba(5,150,105,.03)"} 0%,transparent 70%)`,pointerEvents:"none"}}/>
      <div style={{maxWidth:600,position:"relative",zIndex:1}}>
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.45}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:5,background:"var(--glow)",border:`1px solid ${dark?"rgba(52,211,153,.18)":"rgba(5,150,105,.13)"}`,borderRadius:16,padding:"3px 12px",marginBottom:18}}>
            <span style={{width:5,height:5,borderRadius:"50%",background:"var(--accent)"}}/>
            <span style={{fontSize:10.5,color:"var(--accent)",fontWeight:600}}>Botpress Certified Partner</span>
          </div>
        </motion.div>
        <motion.h1 initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.45,delay:.06}}
          style={{fontSize:"clamp(30px,7vw,56px)",fontWeight:800,letterSpacing:"-1.2px",lineHeight:1.05,marginBottom:10}}>
          Eyad <span style={{background:"linear-gradient(135deg,var(--accent),var(--accent2))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Sofian</span>
        </motion.h1>
        <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.45,delay:.12}}
          style={{fontSize:"clamp(13px,2vw,17px)",color:"var(--text2)",fontWeight:500,marginBottom:6}}>AI Product & Technology Specialist</motion.p>
        <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.45,delay:.18}}
          style={{fontSize:"clamp(11.5px,1.2vw,13.5px)",color:"var(--muted)",lineHeight:1.65,maxWidth:460,margin:"0 auto 24px"}}>
          I build production chatbots, automation workflows, LLM fine-tuning pipelines, and system integrations — serving clients across Egypt, Saudi Arabia, and the Gulf.
        </motion.p>
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.45,delay:.24}}
          style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>go("projects")} style={{background:"var(--accent)",color:"#FFF",padding:"9px 20px",borderRadius:9,fontSize:12.5,fontWeight:700,border:"none",cursor:"pointer",fontFamily:"inherit"}}>View Projects</button>
          {[["GitHub","https://github.com/EyadSofian",Github],["LinkedIn","https://www.linkedin.com/in/eyad-sofian-16b753238",Linkedin]].map(([l,u,I])=>
            <a key={l} href={u} target="_blank" rel="noopener noreferrer" style={{...gl,padding:"7px 16px",display:"flex",alignItems:"center",gap:4,fontSize:12,fontWeight:600,color:"var(--text2)"}}><I size={13}/>{l}</a>)}
        </motion.div>
      </div>
    </section>

    {/* ── STATS ── */}
    <div style={{maxWidth:960,margin:"0 auto",padding:"0 16px 50px",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:8}}>
      {[["🚀","15+","Projects"],["⚡","22","n8n Workflows"],["🤖","8+","Bots Live"],["🤝","10+","Clients"],["🧠","3+","LLMs Trained"]].map(([ic,val,lb],i)=>
        <R key={i} d={i*.05}><motion.div whileHover={{y:-2}} style={{...gl,padding:16,textAlign:"center"}}>
          <div style={{fontSize:20,marginBottom:3}}>{ic}</div>
          <div style={{fontSize:24,fontWeight:800,letterSpacing:"-.5px"}}>{val}</div>
          <div style={{fontSize:9.5,color:"var(--muted)",fontWeight:500,marginTop:1}}>{lb}</div>
        </motion.div></R>)}
    </div>

    {/* ── PROJECTS ── */}
    <section id="projects" style={{maxWidth:960,margin:"0 auto",padding:"50px 16px"}}>
      <R><p style={{fontSize:10.5,color:"var(--accent)",fontWeight:700,letterSpacing:1.3,textTransform:"uppercase",marginBottom:4}}>Portfolio</p>
        <h2 style={{fontSize:24,fontWeight:800,letterSpacing:"-.4px"}}>Featured Projects</h2>
        <p style={{fontSize:12.5,color:"var(--muted)",marginTop:3,marginBottom:20}}>Real production systems — not demos. Click any card for details + animated workflow.</p></R>
      <div style={{display:"flex",flexWrap:"nowrap",gap:5,marginBottom:20,overflowX:"auto",paddingBottom:4,WebkitOverflowScrolling:"touch"}}>
        {CATEGORIES.map((c,i)=><motion.button key={c} whileTap={{scale:.95}} onClick={()=>setCat(i)}
          style={{...gl,padding:"5px 12px",borderRadius:16,cursor:"pointer",fontSize:10.5,fontWeight:600,fontFamily:"inherit",whiteSpace:"nowrap",flexShrink:0,
            color:cat===i?"#FFF":"var(--text2)",background:cat===i?"var(--accent)":"var(--glass)",borderColor:cat===i?"var(--accent)":"var(--glass-b)"}}>{c}</motion.button>)}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={cat} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.15}}
          style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>
          {filtered.map((p,i)=><Card key={p.id} p={p} i={i} onClick={setSel}/>)}
        </motion.div>
      </AnimatePresence>
    </section>

    {/* ── SKILLS ── */}
    <section id="skills" style={{maxWidth:960,margin:"0 auto",padding:"50px 16px"}}>
      <R><p style={{fontSize:10.5,color:"var(--accent2)",fontWeight:700,letterSpacing:1.3,textTransform:"uppercase",marginBottom:4}}>Tech Stack</p>
        <h2 style={{fontSize:24,fontWeight:800,letterSpacing:"-.4px",marginBottom:20}}>Tools & Technologies</h2></R>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:7}}>
        {SKILLS.map(([n,l],i)=><Sk key={n} name={n} level={l} d={i*.02}/>)}
      </div>
    </section>

    {/* ── EXPERIENCE (with bullets) ── */}
    <section id="experience" style={{maxWidth:960,margin:"0 auto",padding:"50px 16px"}}>
      <R><p style={{fontSize:10.5,color:"#F87171",fontWeight:700,letterSpacing:1.3,textTransform:"uppercase",marginBottom:4}}>Career</p>
        <h2 style={{fontSize:24,fontWeight:800,letterSpacing:"-.4px",marginBottom:20}}>Experience</h2></R>
      <div style={{display:"flex",flexDirection:"column"}}>
        {EXPERIENCE.map((e,i)=><R key={i} d={i*.05}>
          <div style={{display:"flex",gap:14}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",flexShrink:0}}>
              <motion.div animate={e.current?{scale:[1,1.2,1]}:{}} transition={{repeat:Infinity,duration:2,ease:"easeInOut"}}
                style={{width:9,height:9,borderRadius:"50%",background:e.current?"var(--accent)":"var(--glass-b)",border:e.current?"none":"2px solid var(--glass-b)"}}/>
              {i<EXPERIENCE.length-1&&<div style={{width:1,background:"var(--glass-b)",flex:1,minHeight:40}}/>}
            </div>
            <div style={{paddingBottom:20,flex:1}}>
              <div style={{fontSize:14,fontWeight:700}}>{e.role}</div>
              <div style={{fontSize:11,color:"var(--muted)",fontWeight:500}}>
                <span style={{color:"var(--accent)",fontWeight:600}}>{e.co}</span> · {e.period}
              </div>
              <span style={{fontSize:9,color:"var(--muted)",background:"var(--glass)",padding:"1px 6px",borderRadius:3,fontWeight:500,display:"inline-block",marginTop:3,border:"1px solid var(--glass-b)"}}>{e.type}</span>
              {/* Bullet points */}
              <ul style={{margin:"8px 0 0 0",padding:"0 0 0 14px",listStyle:"none"}}>
                {e.bullets.map((b,j)=><li key={j} style={{fontSize:11.5,color:"var(--text2)",lineHeight:1.55,marginBottom:4,position:"relative",paddingLeft:10}}>
                  <span style={{position:"absolute",left:0,top:6,width:4,height:4,borderRadius:"50%",background:e.current?"var(--accent)":"var(--glass-b)"}}/>
                  {b}
                </li>)}
              </ul>
            </div>
          </div>
        </R>)}
      </div>
    </section>

    {/* ── CERTS ── */}
    <div style={{maxWidth:960,margin:"0 auto",padding:"0 16px 50px"}}>
      <R><h2 style={{fontSize:18,fontWeight:800,marginBottom:14}}>Certifications</h2>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {CERTS.map((c,i)=><motion.div key={i} whileHover={{y:-1}} style={{background:c.color+"0A",border:`1px solid ${c.color}20`,borderRadius:10,padding:"9px 14px",display:"flex",alignItems:"center",gap:6}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:c.color,flexShrink:0}}/>
            <span style={{fontSize:11,color:"var(--text2)",fontWeight:500}}>{c.name}</span>
            {c.link&&<a href={c.link} target="_blank" rel="noopener noreferrer" style={{color:c.color,display:"flex"}}><ExternalLink size={10}/></a>}
          </motion.div>)}
        </div>
      </R>
    </div>

    {/* ── CONTACT ── */}
    <section id="contact" style={{maxWidth:560,margin:"0 auto",padding:"50px 16px 70px",textAlign:"center"}}>
      <R><p style={{fontSize:10.5,color:"#FBBF24",fontWeight:700,letterSpacing:1.3,textTransform:"uppercase",marginBottom:4}}>Get in Touch</p>
        <h2 style={{fontSize:24,fontWeight:800,letterSpacing:"-.4px",marginBottom:8}}>Let's Build Something</h2>
        <p style={{fontSize:12.5,color:"var(--muted)",marginBottom:22,lineHeight:1.6}}>Open to AI automation, chatbot development, LLM fine-tuning, and system integration projects.</p>
        <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
          <a href="https://wa.me/201210280648" target="_blank" rel="noopener noreferrer">
            <motion.button whileHover={{y:-2}} style={{background:"#25D366",color:"#FFF",padding:"9px 20px",borderRadius:9,fontSize:12.5,fontWeight:700,border:"none",cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:5}}>
              <MessageCircle size={14}/> WhatsApp</motion.button></a>
          <a href="mailto:eyadsofian862@gmail.com" style={{...gl,padding:"9px 20px",display:"flex",alignItems:"center",gap:5,fontSize:12.5,fontWeight:600,color:"var(--text2)"}}><Mail size={14}/> Email</a>
        </div>
      </R>
    </section>

    <footer style={{borderTop:"1px solid var(--glass-b)",padding:"14px 16px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
      <span style={{fontSize:10,color:"var(--muted)"}}>© 2026 Eyad Sofian · Cairo, Egypt</span>
      <span style={{fontSize:10,color:"var(--muted)"}}>React + Framer Motion</span>
    </footer>

    <AnimatePresence>{sel&&<Modal p={sel} onClose={()=>setSel(null)}/>}</AnimatePresence>

    <style>{`
      @media(min-width:769px){.mn{display:none!important}}
      @media(max-width:768px){.dn{display:none!important}.mn{display:flex!important}}
    `}</style>
  </>;
}
