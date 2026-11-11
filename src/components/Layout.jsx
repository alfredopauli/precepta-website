import { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, BookOpen, CalendarDays, LogIn, Users, SlidersHorizontal, PanelLeftClose, Menu, X, LogOut, ArrowUpRight, Instagram, Facebook, Youtube } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import { whatsapp } from '../lib/domain';
import { ExternalLink } from './UI';
export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const sidebar = useRef(null), trigger = useRef(null);
  const location = useLocation();
  const auth = useAuth();
  useEffect(() => { setOpen(false); document.getElementById('main')?.focus(); window.scrollTo(0, 0); }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    const focusables = () => [...sidebar.current.querySelectorAll('a,button')].filter(el => el.getClientRects().length);
    focusables()[0]?.focus();
    const keydown = e => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab') { const nodes = focusables(), first = nodes[0], last = nodes.at(-1); if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } }
    };
    document.addEventListener('keydown', keydown); document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', keydown); document.body.style.overflow = ''; if (previous?.isConnected) previous.focus(); };
  }, [open]);
  const links = [['/', 'Início', Home], ['/servicos', 'Serviços', BookOpen], ['/grade-horaria', 'Grade Horária', CalendarDays], ['/entrar', 'Entrar', LogIn]];
  if (auth.admin && !auth.loading) links.push(['/admin/professores', 'Editar Professores', Users], ['/admin/classes', 'Editar Classes', SlidersHorizontal]);
  return <div className={`layout ${collapsed ? 'collapsed' : ''}`}>
    <a href="#main" className="skip">Pular para o conteúdo</a>
    <button ref={trigger} className="mobile-trigger icon-button" onClick={() => setOpen(true)} aria-label="Abrir menu" aria-expanded={open} aria-controls="sidebar"><Menu/></button>
    {open && <div className="backdrop" onClick={() => setOpen(false)} aria-hidden="true"/>}
    <aside ref={sidebar} id="sidebar" className={`sidebar ${open ? 'open' : ''}`} role={open ? 'dialog' : undefined} aria-modal={open || undefined} aria-label="Menu principal">
      <div className="brand"><img src={collapsed ? '/assets/logo.png' : '/assets/logo-horizontal.svg'} alt="Precepta — Educação, Cultura e Arte"/></div>
      <button className="mobile-close icon-button" onClick={() => setOpen(false)} aria-label="Fechar menu"><X/></button>
      <span className="nav-caption">APRENDER TRANSFORMA</span>
      <nav aria-label="Navegação principal">{links.map(([to, label, Icon]) => <NavLink key={to} to={to} end={to === '/'} title={collapsed ? label : undefined}><Icon size={20} aria-hidden="true"/><span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-bottom"><div className="sidebar-note"><span className="tiny-dot"/> Conhecimento que aproxima.<p>Online, com você.<br/>Em cada descoberta.</p><ExternalLink href={whatsapp()}>Vamos conversar</ExternalLink></div>
      {auth.user && <button className="nav-action" onClick={auth.logout}><LogOut size={19}/><span>Sair</span></button>}
      <button className="collapse-button nav-action" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}><PanelLeftClose size={19}/><span>Recolher menu</span></button></div>
    </aside>
    <div className="main-wrap" inert={open ? true : undefined}><main id="main" tabIndex={-1}>{auth.error && <p className="notice" role="alert">{auth.error}</p>}<Outlet/></main>
    <footer><div><img src="/assets/logo-horizontal.svg" alt="Precepta Educação"/><p>Educação, cultura e arte.<br/>Novas possibilidades começam aqui.</p></div><div><strong>Vamos conversar?</strong><a href="tel:+5511991723096">(11) 99172-3096</a><ExternalLink href={whatsapp()}>Fale pelo WhatsApp</ExternalLink></div><div><strong>Acompanhe a Precepta</strong><div className="social"><ExternalLink href="https://www.instagram.com/preceptaeduca/"><Instagram aria-hidden="true"/><span className="sr-only">Instagram</span></ExternalLink><ExternalLink href="https://www.facebook.com/preceptaeduca/"><Facebook aria-hidden="true"/><span className="sr-only">Facebook</span></ExternalLink><ExternalLink href="https://www.youtube.com/@preceptaeduca"><Youtube aria-hidden="true"/><span className="sr-only">YouTube</span></ExternalLink></div></div><small>© {new Date().getFullYear()} Precepta Educação</small></footer></div>
  </div>;
}
