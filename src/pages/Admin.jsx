import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import useData from "../lib/useData";
import { mutate } from "../lib/api";
import { DAYS, timeRange, classPayload, filterClasses } from "../lib/domain";
import { Notice, PageHeading, ConfirmDialog } from "../components/Shared";
export function Protected({ children }) {
  const auth = useAuth();
  if (auth.loading) return <Notice>Verificando acesso administrativo…</Notice>;
  if (!auth.user) return <Navigate to="/entrar" replace />;
  if (!auth.admin)
    return (
      <Notice error>
        {auth.error ||
          "Acesso negado. Sua conta não tem permissão de administrador."}
      </Notice>
    );
  return children;
}
const emptyTeacher = { name: "", desc: "", color: "#3a589e" };
const emptyClass = {
  teacher_id: "",
  weekday: "0",
  hour: "14",
  status: "false",
};
const emptyFilters = { teacher_id: "", weekday: "", hour: "" };
export default function Admin({ kind }) {
  const isTeachers = kind === "teachers";
  const { teachers, classes, loading, error, reload } = useData();
  const [form, setForm] = useState(null),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState(""),
    [failure, setFailure] = useState(""),
    [deleting, setDeleting] = useState(null),
    [filters, setFilters] = useState(emptyFilters);
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const open = (item) => {
    setFailure("");
    setMessage("");
    setForm(
      item
        ? { ...item, ...(!isTeachers && { status: String(item.status) }) }
        : { ...(isTeachers ? emptyTeacher : emptyClass) },
    );
    requestAnimationFrame(() =>
      document.getElementById("editor")?.scrollIntoView({ block: "start" }),
    );
  };
  async function save(e) {
    e.preventDefault();
    setFailure("");
    setMessage("");
    let payload;
    try {
      if (isTeachers) {
        if (
          !form.name.trim() ||
          !form.desc.trim() ||
          !form.color.trim() ||
          !CSS.supports("color", form.color.trim())
        )
          throw new Error("Preencha nome, descrição e uma cor CSS válida.");
        payload = {
          name: form.name.trim(),
          desc: form.desc.trim(),
          color: form.color.trim(),
        };
      } else {
        payload = classPayload(form);
        if (!teachers.some((t) => String(t.id) === String(payload.teacher_id)))
          throw new Error("Selecione um professor existente.");
      }
    } catch (e) {
      setFailure(e.message);
      return;
    }
    setBusy(true);
    try {
      await mutate(
        kind,
        form.id != null ? "update" : "insert",
        payload,
        form.id,
      );
      setMessage("Alteração salva com sucesso.");
      setForm(null);
      await reload();
    } catch (e) {
      setFailure(e.message);
    } finally {
      setBusy(false);
    }
  }
  async function remove() {
    setBusy(true);
    setFailure("");
    setMessage("");
    try {
      await mutate(kind, "delete", null, deleting.id);
      setMessage("Exclusão concluída com sucesso.");
      if (form?.id === deleting.id) setForm(null);
      setDeleting(null);
      await reload();
    } catch (e) {
      setFailure(e.message);
      setDeleting(null);
    } finally {
      setBusy(false);
    }
  }
  const list = isTeachers ? teachers : filterClasses(classes, filters);
  return (
    <>
      <PageHeading
        eyebrow="ADMINISTRAÇÃO"
        title={isTeachers ? "Editar Professores" : "Editar Classes"}
      >
        {isTeachers
          ? "Gerencie os professores e suas informações."
          : "Gerencie todos os horários e sua disponibilidade."}
      </PageHeading>
      <div className="actions">
        <button className="primary" disabled={busy} onClick={() => open()}>
          {isTeachers ? "Adicionar professor" : "Adicionar classe"} +
        </button>
      </div>
      {message && <Notice>{message}</Notice>}
      {failure && <Notice error>{failure}</Notice>}
      {form && (
        <form id="editor" className="form-panel" onSubmit={save}>
          <h2>
            {form.id != null ? "Editar" : "Adicionar"}{" "}
            {isTeachers ? "professor" : "classe"}
          </h2>
          <fieldset disabled={busy}>
            {isTeachers ? (
              <>
                <label htmlFor="name">Nome</label>
                <input
                  autoFocus
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={update}
                />
                <label htmlFor="desc">Descrição</label>
                <textarea
                  id="desc"
                  name="desc"
                  required
                  rows="4"
                  value={form.desc}
                  onChange={update}
                />
                <label htmlFor="color">Cor</label>
                <input
                  id="color"
                  name="color"
                  type="color"
                  required
                  value={form.color}
                  onChange={update}
                  aria-describedby="color-help"
                />
              </>
            ) : (
              <>
                <label htmlFor="teacher">Professor</label>
                <select
                  autoFocus
                  id="teacher"
                  name="teacher_id"
                  required
                  value={form.teacher_id}
                  onChange={update}
                >
                  <option value="">Selecione um professor</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                {!teachers.length && (
                  <Notice>
                    Cadastre um professor antes de adicionar uma classe.
                  </Notice>
                )}
                <label htmlFor="weekday">Dia da semana</label>
                <select
                  id="weekday"
                  name="weekday"
                  value={form.weekday}
                  onChange={update}
                >
                  {DAYS.map((d, i) => (
                    <option key={d} value={i}>
                      {d}
                    </option>
                  ))}
                </select>
                <label htmlFor="hour">Hora de início (0–23)</label>
                <input
                  id="hour"
                  name="hour"
                  type="number"
                  min="0"
                  max="23"
                  step="1"
                  required
                  value={form.hour}
                  onChange={update}
                />
                <small>
                  Horário:{" "}
                  {form.hour !== "" ? timeRange(form.hour) : "Selecione a hora"}{" "}
                  · duração de 50 minutos
                </small>
                <label htmlFor="status">Disponibilidade</label>
                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={update}
                >
                  <option value="false">Disponível</option>
                  <option value="true">Indisponível</option>
                </select>
              </>
            )}
            <div className="actions">
              <button className="primary" type="submit">
                {busy ? "Salvando…" : "Salvar"}
              </button>
              <button type="button" onClick={() => setForm(null)}>
                Cancelar
              </button>
            </div>
          </fieldset>
        </form>
      )}
      {!isTeachers && (
        <div className="filters">
          <label>
            Professor
            <select
              value={filters.teacher_id}
              onChange={(e) =>
                setFilters({ ...filters, teacher_id: e.target.value })
              }
            >
              <option value="">Todos</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Dia da semana
            <select
              value={filters.weekday}
              onChange={(e) =>
                setFilters({ ...filters, weekday: e.target.value })
              }
            >
              <option value="">Todos</option>
              {DAYS.map((d, i) => (
                <option key={d} value={i}>
                  {d}
                </option>
              ))}
            </select>
          </label>
          <label>
            Hora
            <select
              value={filters.hour}
              onChange={(e) => setFilters({ ...filters, hour: e.target.value })}
            >
              <option value="">Todas</option>
              {Array.from({ length: 24 }, (_, h) => (
                <option key={h} value={h}>
                  {timeRange(h)}
                </option>
              ))}
            </select>
          </label>
          <button onClick={() => setFilters(emptyFilters)}>
            Limpar filtros
          </button>
        </div>
      )}
      {loading ? (
        <Notice>Carregando dados…</Notice>
      ) : error ? (
        <>
          <Notice error>{error}</Notice>
          <button onClick={reload}>Tentar novamente</button>
        </>
      ) : !list.length ? (
        <Notice>
          {isTeachers
            ? "Nenhum professor cadastrado."
            : classes.length
              ? "Nenhuma classe corresponde aos filtros."
              : "Nenhuma classe cadastrada."}
        </Notice>
      ) : (
        <div className="admin-list">
          {list.map((item) => (
            <article className="admin-row" key={item.id}>
              <div>
                {isTeachers ? (
                  <>
                    <h3>
                      <span
                        className="dot"
                        style={{
                          background: CSS.supports("color", item.color)
                            ? item.color
                            : "#3a589e",
                        }}
                      />
                      {item.name}
                    </h3>
                    <p>{item.desc}</p>
                    <small>{item.color}</small>
                  </>
                ) : (
                  <>
                    <h3>
                      {teachers.find(
                        (t) => String(t.id) === String(item.teacher_id),
                      )?.name || "Professor não encontrado"}
                    </h3>
                    <p>
                      {DAYS[item.weekday]} · {timeRange(item.hour)}
                    </p>
                    <span
                      className={`badge ${item.status ? "unavailable" : ""}`}
                    >
                      {item.status ? "Indisponível" : "Disponível"}
                    </span>
                  </>
                )}
              </div>
              <div className="actions">
                <button
                  disabled={busy}
                  onClick={() => open(item)}
                  aria-label={`Editar ${isTeachers ? item.name : timeRange(item.hour)}`}
                >
                  Editar
                </button>
                <button
                  className="delete"
                  disabled={busy}
                  onClick={() => setDeleting(item)}
                  aria-label={`Excluir ${isTeachers ? item.name : timeRange(item.hour)}`}
                >
                  Excluir
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      {deleting && (
        <ConfirmDialog
          title={isTeachers ? "Excluir professor?" : "Excluir classe?"}
          busy={busy}
          onCancel={() => setDeleting(null)}
          onConfirm={remove}
        >
          {isTeachers
            ? `Ao excluir ${deleting.name}, todas as classes relacionadas também serão excluídas. Esta ação não pode ser desfeita.`
            : "Esta classe será excluída. Esta ação não pode ser desfeita."}
        </ConfirmDialog>
      )}
    </>
  );
}
