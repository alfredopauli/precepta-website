import { ArrowUpRight } from 'lucide-react';
export function ExternalLink({ href, children, className = '' }) { return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={17} aria-hidden="true"/><span className="sr-only"> (abre em nova aba)</span></a>; }
export function Blocks({ blocks }) { return blocks.map((block, i) => block.startsWith('- ') ? <ul className="ruled-list" key={i}>{block.split('\n').map(line => <li key={line}>{line.replace(/^- /, '')}</li>)}</ul> : <p key={i}>{block}</p>); }
export function Heading({ eyebrow, title, children }) { return <header className="page-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{children && <p>{children}</p>}</header>; }
export function Feedback({ loading, error, success }) { return <>{loading && <p role="status">Carregando…</p>}{error && <p className="notice" role="alert">{error}</p>}{success && <p className="success" role="status">{success}</p>}</>; }
