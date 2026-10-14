import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin, Mail, MapPin, GraduationCap, Code2, Layers3, Sparkles, ExternalLink, Download, CheckCircle2, Clock3, Terminal, MonitorSmartphone, Braces, Send, Palette, Home, UserRound, FolderKanban, Menu } from 'lucide-react';
import Navbar from './components/Navbar';
import Scene3D from './components/Scene3D';
import GitHubSection from './components/GitHubSection';
import { projects } from './data/projects';

const PROFILE = {
  name: 'Piyush Gujor', email: 'piyushgujor666@gmail.com', phone: '+91 9998091751',
  github: 'https://github.com/piyushgujor666-glitch',
  linkedin: 'https://www.linkedin.com/in/piyush-gujor-241712383/',
  leetcode: 'https://leetcode.com/u/PiyushGujor/',
  location: 'Palanpur, Gujarat, India'
};
const skills = [
  {title:'Programming', icon: Braces, items:['C++','C','Python','JavaScript'], note:'Building programming fundamentals'},
  {title:'Frontend', icon: MonitorSmartphone, items:['HTML5','CSS3','React.js','Tailwind CSS','Responsive design'], note:'Interfaces that work across screens'},
  {title:'Developer tools', icon: Terminal, items:['Git','GitHub','VS Code','Netlify','Vercel'], note:'Version control and deployment'},
  {title:'CS foundations', icon: Layers3, items:['Data Structures & Algorithms','OOP','Operating Systems'], note:'Continuous practice and learning'}
];
const experience = [
  {company:'VaultOfCodes', role:'Frontend Development Intern', date:'Jun 2026 — Aug 2026', bullets:['Developed responsive web pages using HTML, CSS, and JavaScript.','Built reusable interface components and refined layouts for different screen sizes.','Debugged frontend issues and iterated on implementations based on feedback.']},
  {company:'AI Tech Gen Technologies', role:'Frontend Development Intern', date:'Aug 2026 — Sep 2026', bullets:['Developed responsive frontend interfaces using React.js, HTML, CSS, and JavaScript.','Built reusable UI components and worked on frontend implementation and debugging.']},
  {company:'Infotact Solutions', role:'Web Developer Intern', date:'Oct 2026 — Present', bullets:['Working on web development projects using React.js, JavaScript, HTML5, and CSS3.','Learning backend concepts, Node.js, database integration, and frontend-backend communication.']}
];
const education = [
  {place:'SRM Institute of Science and Technology', detail:'B.Tech — Computer Science and Engineering', date:'2025 — 2029', result:'CGPA 8.40 / 10'},
  {place:'Shree Gayatri Vidhyalaya, GSEB', detail:'Class XII — Science', date:'2025', result:'60.50%'},
  {place:'Shree Ram Vidhyalaya, GSEB', detail:'Class X', date:'2023', result:'84.60%'}
];
const certifications = [
  ['Commonwealth Bank','Introduction to Software Engineering Job Simulation · Forage','September 2026'],
  ['Adobe University Hackathon 2026','Round 1 Online Assessment · Unstop','August 2026'],
  ['Oracle Cloud Infrastructure','2025 Certified AI Foundations Associate','Completed'],
  ['IIT Patna','Artificial Intelligence and Machine Learning','In progress'],
  ['Google','Introduction to AI','Completed'],
  ['University of Michigan','Python Programming Fundamentals','Completed']
];
function SectionTitle({kicker,title,accent,copy}) { return <div className="section-head"><div><span className="eyebrow">{kicker}</span><h2>{title} <em>{accent}</em></h2></div>{copy&&<p>{copy}</p>}</div>; }
function ProjectCard({project,index}) {
  const Icon = index === 0 ? Layers3 : index === 1 ? MonitorSmartphone : Code2;
  return <motion.article className={`project-card project-${project.accent}`} initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{delay:index*.08,duration:.5}} whileHover={{y:-7,rotateX:1,rotateY:-1}}>
    <div className="project-art"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="project-symbol">{project.mark}</div><span className="project-index">0{index+1} / 03</span><span className="project-art-icon"><Icon size={18}/></span></div>
    <div className="project-content"><div className="project-topline"><span className="eyebrow">{project.eyebrow}</span><span className="project-status"><i/> {project.status}</span></div><h3>{project.name}</h3><p>{project.description}</p><div className="tag-list">{project.stack.map(tag=><span key={tag}>{tag}</span>)}</div>
    <div className="project-actions">{project.live ? <a className="btn btn-primary btn-small" href={project.live} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={15}/></a> : <span className="btn btn-disabled btn-small" aria-disabled="true"><Clock3 size={14}/> Coming soon</span>}
    {project.repo ? <a className="btn btn-quiet btn-small" href={project.repo} target="_blank" rel="noopener noreferrer">Source code <Github size={14}/></a> : <span className="source-pending">Source link not verified</span>}</div></div>
  </motion.article>;
}
const THEMES = [{id:'dark',label:'Midnight'},{id:'light',label:'Pearl'},{id:'aurora',label:'Aurora'},{id:'sunset',label:'Sunset'}];
function MobileDock({ active, themeLabel, cycleTheme }) {
  const [moreOpen,setMoreOpen] = React.useState(false);
  const items = [{id:'home',label:'Home',Icon:Home},{id:'about',label:'About',Icon:UserRound},{id:'projects',label:'Projects',Icon:FolderKanban},{id:'github',label:'GitHub',Icon:Github},{id:'contact',label:'Contact',Icon:Mail}];
  const more = [['Skills','skills'],['Experience','experience'],['Education','education'],['Certifications','certifications'],['LeetCode','coding']];
  const go = id => { setMoreOpen(false); document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'}); };
  return <><div className={`dock-more-menu ${moreOpen?'dock-more-open':''}`}>{more.map(([label,id])=><button key={id} onClick={()=>go(id)}>{label}<ArrowUpRight size={14}/></button>)}<button onClick={cycleTheme}><Palette size={14}/> Theme: {themeLabel}</button></div><nav className="mobile-dock" aria-label="Mobile bottom navigation">{items.map(({id,label,Icon})=><button key={id} className={active===id?'dock-item dock-active':'dock-item'} onClick={()=>go(id)} aria-label={label}><Icon size={18}/><span>{label}</span></button>)}<button className={moreOpen?'dock-item dock-active':'dock-item'} onClick={()=>setMoreOpen(v=>!v)} aria-expanded={moreOpen} aria-label="More navigation"><Menu size={18}/><span>More</span></button></nav></>;
}
export default function App() {
  const [theme,setTheme] = React.useState(() => localStorage.getItem('pg-theme') || 'dark');
  const [activeDock,setActiveDock] = React.useState('home');
  const themeIndex = Math.max(0, THEMES.findIndex(t=>t.id===theme));
  const themeLabel = THEMES[themeIndex].label;
  const cycleTheme = () => setTheme(THEMES[(themeIndex+1)%THEMES.length].id);
  const [form,setForm] = React.useState({name:'',email:'',subject:'',message:''});
  const [formError,setFormError] = React.useState('');
  const [sent,setSent] = React.useState(false);
  const reduceMotion = useReducedMotion();
  React.useEffect(()=>{document.documentElement.dataset.theme=theme;localStorage.setItem('pg-theme',theme);},[theme]);
  React.useEffect(()=>{ const ids=['home','about','projects','github','contact']; const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)setActiveDock(entry.target.id)}),{rootMargin:'-35% 0px -55% 0px',threshold:0}); ids.forEach(id=>{const el=document.getElementById(id);if(el)observer.observe(el)}); return ()=>observer.disconnect(); },[]);
  const reveal = reduceMotion ? {} : {initial:{opacity:0,y:22},whileInView:{opacity:1,y:0},viewport:{once:true,amount:.12},transition:{duration:.55}};
  const handleContact = e => {
    e.preventDefault(); setFormError(''); setSent(false);
    if(!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || !form.subject.trim() || !form.message.trim()) { setFormError('Please complete every field and enter a valid email address.'); return; }
    const body = `Name: ${form.name}\\nEmail: ${form.email}\\n\\n${form.message}`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  return <div className="app">
    <Navbar theme={theme} cycleTheme={cycleTheme} themeLabel={themeLabel}/>
    <main>
      <section className="hero section" id="home"><div className="hero-grid container"><div className="hero-copy">
        <motion.div className="availability" {...reveal}><span className="live-dot"/> CSE STUDENT · FRONTEND DEVELOPER</motion.div>
        <motion.h1 {...reveal}>Making the web<br/>feel <span className="gradient-text">more human.</span></motion.h1>
        <motion.p className="hero-intro" {...reveal}>Hi, I'm <strong>Piyush Gujor</strong> — a Computer Science student building thoughtful, responsive web experiences with React, JavaScript, and creative frontend engineering.</motion.p>
        <motion.div className="hero-actions" {...reveal}><button className="btn btn-primary" onClick={()=>document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})}>Explore my work <ArrowRight size={16}/></button><a className="btn btn-outline" href="/resume.html" target="_blank" rel="noreferrer"><Download size={16}/> Open resume</a></motion.div>
        <motion.div className="hero-socials" {...reveal}><a href={PROFILE.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub <ArrowUpRight size={13}/></a><a href={PROFILE.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn <ArrowUpRight size={13}/></a><a href={PROFILE.leetcode} target="_blank" rel="noreferrer"><Code2 size={17}/> LeetCode <ArrowUpRight size={13}/></a><a href={`mailto:${PROFILE.email}`}><Mail size={17}/> Email <ArrowUpRight size={13}/></a></motion.div>
      </div><div className="hero-visual"><Scene3D/><div className="floating-chip chip-top"><span className="chip-icon"><Code2 size={16}/></span><div><strong>React + JavaScript</strong><small>Building for the web</small></div></div><div className="floating-chip chip-bottom"><span className="chip-icon teal"><Sparkles size={16}/></span><div><strong>Curious by default</strong><small>Learn · Build · Improve</small></div></div></div></div>
      <div className="hero-bottom container"><span><MapPin size={14}/> {PROFILE.location}</span><span className="scroll-prompt">SCROLL TO EXPLORE <ArrowDown size={14}/></span><span>AVAILABLE FOR LEARNING & OPPORTUNITIES</span></div></section>
      <section className="section about-section" id="about"><div className="container"><SectionTitle kicker="A LITTLE ABOUT ME" title="Curiosity into" accent="craft." copy="I like turning ideas into clear, useful interfaces — and learning the engineering behind them."/>
        <div className="about-layout"><motion.div className="about-feature glass-panel" {...reveal}><div className="about-feature-icon"><GraduationCap size={24}/></div><span className="eyebrow">THE SHORT VERSION</span><h3>Student mindset.<br/><em>Builder energy.</em></h3><p>I'm pursuing a B.Tech in Computer Science and Engineering at SRMIST. My current focus is frontend development, reusable React components, responsive UI, and consistent DSA practice with C++.</p><div className="about-location"><MapPin size={15}/>{PROFILE.location}</div><div className="feature-lines"><span/><span/><span/><span/><span/><span/><span/></div></motion.div>
        <div className="about-points"><motion.div className="about-point" {...reveal}><span className="point-number">01</span><div><h3>Build with intention</h3><p>Responsive layouts and reusable components that make interfaces easier to use and maintain.</p></div><Code2/></motion.div><motion.div className="about-point" {...reveal}><span className="point-number">02</span><div><h3>Keep learning</h3><p>Growing my foundation in algorithms, computer science, and modern frontend workflows.</p></div><Layers3/></motion.div><motion.div className="about-point" {...reveal}><span className="point-number">03</span><div><h3>Think full-stack</h3><p>Moving toward backend fundamentals, APIs, and database-backed applications step by step.</p></div><Sparkles/></motion.div></div></div></div></section>
      <section className="section skills-section" id="skills"><div className="container"><SectionTitle kicker="MY TOOLKIT" title="Tools for the" accent="next idea." copy="A practical set of technologies I'm using and strengthening as I build."/><div className="skills-grid">{skills.map((skill,i)=><motion.article className="skill-card" key={skill.title} {...reveal} transition={{delay:i*.06,duration:.5}}><div className="skill-card-head"><span className="skill-icon"><skill.icon size={19}/></span><span className="skill-no">0{i+1}</span></div><h3>{skill.title}</h3><p>{skill.note}</p><div className="skill-tags">{skill.items.map(item=><span key={item}>{item}</span>)}</div></motion.article>)}</div></div></section>
      <section className="section experience-section" id="experience"><div className="container"><SectionTitle kicker="THE JOURNEY SO FAR" title="Learning through" accent="real work." copy="Internship experiences and ongoing practice. Details reflect the information supplied for this portfolio."/><div className="timeline">{experience.map((item,i)=><motion.article className="timeline-item" key={item.company} {...reveal}><div className="timeline-marker">{String(i+1).padStart(2,'0')}</div><div className="timeline-card"><div className="timeline-meta"><span className="eyebrow">{item.date}</span><span className="timeline-type"><i/> {i===2?'Current':'Internship'}</span></div><h3>{item.company}</h3><h4>{item.role}</h4><ul>{item.bullets.map(b=><li key={b}>{b}</li>)}</ul></div></motion.article>)}</div></div></section>
      <section className="section projects-section" id="projects"><div className="container"><SectionTitle kicker="SELECTED PROJECTS" title="Small steps, real" accent="interfaces." copy="A selection of frontend work. Only verified live destinations are clickable; unavailable links are clearly marked."/><div className="projects-grid">{projects.map((project,i)=><ProjectCard key={project.name} project={project} index={i}/>)}</div></div></section>
      <GitHubSection/>
      <section className="section coding-section" id="coding"><div className="container"><div className="coding-profile glass-panel"><div className="coding-orb"><div className="coding-orb-inner">LC<span>.</span></div></div><div className="coding-copy"><span className="eyebrow">PROBLEM SOLVING / DSA</span><h2>One problem at a time.</h2><p>Practicing Data Structures and Algorithms in C++ and building consistency through coding challenges.</p><div className="coding-tags"><span>C++</span><span>Arrays</span><span>Data Structures</span><span>Algorithms</span></div></div><a className="btn btn-primary" href={PROFILE.leetcode} target="_blank" rel="noreferrer">Open LeetCode <ArrowUpRight size={16}/></a></div></div></section>
      <section className="section education-section" id="education"><div className="container"><SectionTitle kicker="EDUCATION" title="The foundation" accent="I'm building on."/><div className="education-grid">{education.map((item,i)=><motion.article className="education-card" key={item.place} {...reveal}><div className="education-icon"><GraduationCap size={20}/></div><span className="eyebrow">{item.date}</span><h3>{item.place}</h3><p>{item.detail}</p><div className="education-result">{item.result}</div><span className="education-index">0{i+1}</span></motion.article>)}</div></div></section>
      <section className="section certifications-section" id="certifications"><div className="container"><SectionTitle kicker="CERTIFICATIONS & LEARNING" title="Learning doesn't" accent="stand still." copy="Completed credentials and in-progress learning are labelled separately."/><div className="cert-list">{certifications.map((c,i)=><motion.article className="cert-row" key={c[0]} {...reveal}><div className="cert-number">0{i+1}</div><div className="cert-main"><h3>{c[0]}</h3><p>{c[1]}</p></div><span className={`cert-status ${c[2]==='In progress'?'in-progress':''}`}>{c[2]==='In progress'?<Clock3 size={14}/>:<CheckCircle2 size={14}/>} {c[2]}</span></motion.article>)}</div></div></section>
      <section className="section contact-section" id="contact"><div className="container"><div className="contact-panel"><div className="contact-copy"><span className="eyebrow">HAVE A GOOD IDEA?</span><h2>Let's make<br/><em>something useful.</em></h2><p>Open to connecting about frontend development, projects, internships, and opportunities to learn from other builders.</p><a className="contact-email" href={`mailto:${PROFILE.email}`}><Mail size={17}/>{PROFILE.email}<ArrowUpRight size={15}/></a><div className="contact-links"><a href={PROFILE.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub</a><a href={PROFILE.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn</a></div></div>
        <form className="contact-form" onSubmit={handleContact} noValidate><div className="form-heading"><Send size={18}/><div><h3>Send a message</h3><p>Opens your default email app — no backend is connected.</p></div></div><div className="form-two"><label>Your name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" autoComplete="name"/></label><label>Your email<input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} type="email" placeholder="you@example.com" autoComplete="email"/></label></div><label>Subject<input value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} placeholder="What would you like to discuss?"/></label><label>Message<textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows="4" placeholder="A little context goes a long way…"/></label>{formError&&<p className="form-message error">{formError}</p>}{sent&&<p className="form-message success">Your email app should open with this message prepared. Send it there to complete delivery.</p>}<button className="btn btn-primary form-submit" type="submit">Prepare email <ArrowUpRight size={16}/></button></form>
      </div></div></section>
    </main>
    <MobileDock active={activeDock} themeLabel={themeLabel} cycleTheme={cycleTheme}/><footer className="footer"><div className="container footer-main"><button className="brand footer-brand" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}><span className="brand-mark">PG<span>.</span></span><span className="brand-caption">BUILT WITH CURIOSITY</span></button><p>Thoughtfully made, one iteration at a time.</p><div className="footer-links"><a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a><a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a><a href={`mailto:${PROFILE.email}`} aria-label="Email"><Mail/></a><button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} aria-label="Back to top"><ArrowUpRight/></button></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Piyush Gujor</span><span>React · JavaScript · A lot of curiosity</span><span className="footer-location"><MapPin size={13}/>{PROFILE.location}</span></div></footer>
  </div>;
}