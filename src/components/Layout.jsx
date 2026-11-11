import { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiCalendar,
  FiLogIn,
  FiUsers,
  FiEdit3,
  FiLogOut,
  FiMenu,
  FiArrowLeft,
} from "react-icons/fi";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import { useAuth } from "../auth/AuthProvider";
import { WHATSAPP } from "../lib/domain";
import { Notice } from "./Shared";
export default function Layout() {
  const [open, setOpen] = useState(false),
    [collapsed, setCollapsed] = useState(false),
    [mobile, setMobile] = useState(
      () => matchMedia("(max-width: 760px)").matches,
    ),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const auth = useAuth(),
    location = useLocation(),
    drawer = useRef(),
    toggle = useRef(),
    main = useRef();
  useEffect(() => {
    const m = matchMedia("(max-width: 760px)");
    const fn = () => {
      setMobile(m.matches);
      setOpen(false);
    };
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, []);
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
    document.title = `${{ "/": "Início", "/servicos": "Serviços", "/grade": "Grade Horária", "/entrar": "Entrar", "/admin/professores": "Editar Professores", "/admin/classes": "Editar Classes" }[location.pathname] || "Página não encontrada"} | Precepta Educação`;
    main.current?.focus();
  }, [location.pathname]);
  useEffect(() => {
    if (!open || !mobile) return;
    const previous = document.activeElement;
    drawer.current.querySelector("button")?.focus();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handler = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const els = drawer.current.querySelectorAll("a,button:not(:disabled)");
        const first = els[0],
          last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", handler);
      previous?.focus();
    };
  }, [open, mobile]);
  const links = [
    ["/", "Início", FiHome],
    ["/servicos", "Serviços", FiGrid],
    ["/grade", "Grade Horária", FiCalendar],
    ...(!auth.user ? [["/entrar", "Entrar", FiLogIn]] : []),
    ...(auth.admin
      ? [
          ["/admin/professores", "Editar Professores", FiUsers],
          ["/admin/classes", "Editar Classes", FiEdit3],
        ]
      : []),
  ];
  async function logout() {
    setBusy(true);
    setError("");
    try {
      await auth.logout();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className={`app ${collapsed ? "collapsed" : ""}`}>
      <a href="#main" className="skip">
        Pular para o conteúdo
      </a>
      {mobile && (
        <button
          className="mobile-toggle"
          ref={toggle}
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="sidebar"
        >
          <FiMenu />
        </button>
      )}
      {open && mobile && (
        <div className="backdrop" onClick={() => setOpen(false)} />
      )}
      <aside
        id="sidebar"
        ref={drawer}
        className={`sidebar ${open ? "open" : ""}`}
        inert={mobile && !open ? true : undefined}
        role={mobile && open ? "dialog" : undefined}
        aria-modal={mobile && open ? true : undefined}
        aria-label="Menu de navegação"
      >
        <button
          className="collapse-toggle"
          onClick={() => (mobile ? setOpen(false) : setCollapsed(!collapsed))}
          aria-label={
            mobile
              ? "Fechar menu"
              : collapsed
                ? "Expandir menu"
                : "Recolher menu"
          }
          aria-expanded={mobile ? open : !collapsed}
        >
          <FiArrowLeft />
        </button>
        <NavLink className="brand" to="/" aria-label="Precepta — Início">
          <img src="/assets/logo.png" alt="Precepta Educação" />
        </NavLink>
        <div className="nav-label">EXPLORE SEU POTENCIAL</div>
        <nav aria-label="Navegação principal">
          {links.map(([path, label, Icon]) => (
            <NavLink end={path === "/"} key={path} to={path} title={label}>
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
          {auth.user && (
            <button onClick={logout} disabled={busy} title="Sair">
              <FiLogOut />
              <span>{busy ? "Saindo…" : "Sair"}</span>
            </button>
          )}
        </nav>
        <div className="sidebar-bottom">
          <p>
            O conhecimento
            <br />
            transforma caminhos.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="sidebar-contact"
            title="WhatsApp"
          >
            <FaWhatsapp />
            <span>Vamos conversar</span>
          </a>
          <small>Educação · Cultura · Arte</small>
        </div>
      </aside>
      <div className="main-wrap" inert={mobile && open ? true : undefined}>
        <main id="main" ref={main} tabIndex="-1">
          {error && <Notice error>{error}</Notice>}
          <Outlet />
        </main>
        <footer>
          <div>
            <strong>Precepta Educação</strong>
            <p>
              Educação, cultura e arte.
              <br />
              Conhecimento para novas possibilidades.
            </p>
          </div>
          <div className="footer-contact">
            <a href="tel:+5511991723096">Telefone: (11) 99172-3096</a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer">
              <FaWhatsapp /> WhatsApp: (11) 99172-3096
            </a>
            <div className="socials">
              {[
                [
                  FaInstagram,
                  "Instagram",
                  "https://www.instagram.com/preceptaeduca/",
                ],
                [
                  FaFacebookF,
                  "Facebook",
                  "https://www.facebook.com/preceptaeduca/",
                ],
                [
                  FaYoutube,
                  "YouTube",
                  "https://www.youtube.com/@preceptaeduca",
                ],
              ].map(([Icon, name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${name}: preceptaeduca`}
                  title={`${name}: preceptaeduca`}
                >
                  <Icon />
                </a>
              ))}
              <span>@preceptaeduca</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
