import React from 'react';
import { Menu, X, Sun, Moon, ArrowUpRight, Palette } from 'lucide-react';
const items = [['Home','home'],['About','about'],['Skills','skills'],['Experience','experience'],['Projects','projects'],['GitHub','github'],['LeetCode','coding'],['Education','education'],['Certifications','certifications'],['Contact','contact']];
export default function Navbar({ theme, cycleTheme, themeLabel }) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState('home');
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    }), { rootMargin: '-28% 0px -58% 0px', threshold: 0 });
    items.forEach(([, id]) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  const navigate = id => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  return <header className="nav-shell">
    <nav className="nav container" aria-label="Main navigation">
      <button className="brand" onClick={() => navigate('home')} aria-label="Go to home"><span className="brand-mark">PG<span>.</span></span><span className="brand-caption">DEVELOPER PORTFOLIO</span></button>
      <div className={`nav-links ${open ? 'nav-links-open' : ''}`}>
        {items.map(([label,id]) => <button key={id} className={active === id ? 'nav-link active' : 'nav-link'} onClick={() => navigate(id)}>{label}</button>)}
        <button className="mobile-theme" onClick={cycleTheme} aria-label={`Change theme. Current theme: ${themeLabel}`}><Palette size={17}/> Theme: {themeLabel}</button>
      </div>
      <div className="nav-actions"><button className="theme-toggle" onClick={cycleTheme} aria-label={`Change theme. Current theme: ${themeLabel}`} title={`Theme: ${themeLabel}`}><Palette size={17}/><span>{themeLabel}</span></button><button className="nav-contact" onClick={() => navigate('contact')}>Let's talk <ArrowUpRight size={15}/></button><button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}>{open ? <X/> : <Menu/>}</button></div>
    </nav>
  </header>;
}