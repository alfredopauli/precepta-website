import { useState } from "react";
import useData from "../lib/useData";
import { DAYS, timeRange, isAvailable, inquiryUrl } from "../lib/domain";
import { PageHeading, Notice } from "../components/Shared";
export default function Timetable() {
  const { teachers, classes, loading, error, reload } = useData(true);
  const [day, setDay] = useState("0");
  const items = classes.filter(isAvailable);
  const hours = [...new Set(items.map((c) => c.hour))].sort((a, b) => a - b);
  const card = (item) => {
    const teacher = teachers.find(
      (t) => String(t.id) === String(item.teacher_id),
    );
    if (!teacher)
      return (
        <Notice error key={item.id}>
          Professor não encontrado para este horário.
        </Notice>
      );
    return (
      <a
        className="class-card"
        key={item.id}
        style={{
          borderLeftColor: CSS.supports("color", teacher.color)
            ? teacher.color
            : "#3a589e",
        }}
        href={inquiryUrl(item, teacher)}
        target="_blank"
        rel="noreferrer"
      >
        <span className="class-time">
          {timeRange(item.hour)} <span>↗</span>
        </span>
        <strong>{teacher.name}</strong>
        <span>{teacher.desc}</span>
        <small>{DAYS[item.weekday]} · Consultar pelo WhatsApp</small>
      </a>
    );
  };
  return (
    <>
      <PageHeading eyebrow="UM TEMPO PARA APRENDER" title="Grade horária.">
        Encontre um horário para sua próxima aula avulsa.
      </PageHeading>
      <Notice>
        As aulas têm 50 minutos. Clique em um horário disponível para consultar
        a escola pelo WhatsApp. O agendamento precisa ser combinado com a
        Precepta: o clique não reserva a aula nem altera sua disponibilidade.
      </Notice>
      {loading ? (
        <Notice>Carregando horários…</Notice>
      ) : error ? (
        <>
          <Notice error>{error}</Notice>
          <button onClick={reload}>Tentar novamente</button>
        </>
      ) : !items.length ? (
        <Notice>
          Nenhuma aula disponível no momento. Fale com a escola para consultar
          novos horários.
        </Notice>
      ) : (
        <>
          <div className="mobile-schedule">
            <label htmlFor="day">Dia da semana</label>
            <select
              id="day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            >
              {DAYS.map((d, i) => (
                <option key={d} value={i}>
                  {d}
                </option>
              ))}
            </select>
            <div className="day-cards">
              {items.filter((c) => String(c.weekday) === day).length ? (
                items.filter((c) => String(c.weekday) === day).map(card)
              ) : (
                <Notice>Nenhuma aula disponível neste dia.</Notice>
              )}
            </div>
          </div>
          <div
            className="schedule-scroll"
            tabIndex="0"
            role="region"
            aria-label="Grade semanal, role horizontalmente para ver todos os dias"
          >
            <table className="schedule">
              <thead>
                <tr>
                  <th scope="col">Hora</th>
                  {DAYS.map((d) => (
                    <th scope="col" key={d}>
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hours.map((h) => (
                  <tr key={h}>
                    <th scope="row">{String(h).padStart(2, "0")}h</th>
                    {DAYS.map((d, i) => (
                      <td key={d}>
                        {items
                          .filter((c) => c.hour === h && c.weekday === i)
                          .map(card)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
