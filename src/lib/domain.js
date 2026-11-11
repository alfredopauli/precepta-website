export const DAYS = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];
export const WHATSAPP = "https://wa.me/5511991723096";
export const timeRange = (hour) =>
  `${String(hour).padStart(2, "0")}h00–${String(hour).padStart(2, "0")}h50`;
// In this existing schema, false means AVAILABLE. Never invert this mapping.
export const isAvailable = (item) => item.status === false;
export const inquiryUrl = (item, teacher) =>
  `${WHATSAPP}?text=${encodeURIComponent(`Olá! Tenho interesse na aula com ${teacher.name}, às ${timeRange(item.hour)}, na ${DAYS[item.weekday]}. Poderiam confirmar a disponibilidade e me orientar sobre o agendamento?`)}`;
export const filterClasses = (items, filters) =>
  items.filter((item) =>
    ["teacher_id", "weekday", "hour"].every(
      (key) =>
        filters[key] === "" || String(item[key]) === String(filters[key]),
    ),
  );
export function classPayload(form) {
  if (
    !form.teacher_id ||
    form.hour === "" ||
    form.weekday === "" ||
    !Number.isInteger(Number(form.hour)) ||
    Number(form.hour) < 0 ||
    Number(form.hour) > 23 ||
    !Number.isInteger(Number(form.weekday)) ||
    Number(form.weekday) < 0 ||
    Number(form.weekday) > 5
  )
    throw new Error(
      "Selecione um professor, um dia válido e uma hora inteira entre 0 e 23.",
    );
  return {
    teacher_id: form.teacher_id,
    hour: Number(form.hour),
    weekday: Number(form.weekday),
    status: form.status === "true",
  };
}
