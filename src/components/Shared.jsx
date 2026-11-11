import { useEffect, useRef } from "react";
export function Notice({ children, error = false }) {
  return (
    <div
      className={`notice ${error ? "error" : ""}`}
      role={error ? "alert" : "status"}
    >
      {children}
    </div>
  );
}
export function PageHeading({ eyebrow, title, children }) {
  return (
    <header className="page-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </header>
  );
}
export function ConfirmDialog({ title, children, busy, onCancel, onConfirm }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    el.showModal();
    return () => el.close();
  }, []);
  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        if (!busy) onCancel();
      }}
      aria-labelledby="dialog-title"
    >
      <h2 id="dialog-title">{title}</h2>
      <p>{children}</p>
      <div className="actions">
        <button disabled={busy} onClick={onCancel}>
          Cancelar
        </button>
        <button className="danger" disabled={busy} onClick={onConfirm}>
          {busy ? "Excluindo…" : "Confirmar exclusão"}
        </button>
      </div>
    </dialog>
  );
}
