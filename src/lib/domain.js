export const DAYS = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
export const timeRange = hour => `${String(hour).padStart(2, '0')}h00–${String(hour).padStart(2, '0')}h50`;
export const whatsapp = (message = 'Olá! Gostaria de saber mais sobre a Precepta Educação.') => `https://wa.me/5511991723096?text=${encodeURIComponent(message)}`;
export const classWhatsapp = row => whatsapp(`Olá! Tenho interesse em uma aula com o professor(a) ${row.teachers.name}, às ${timeRange(row.hour)} de ${DAYS[row.weekday]}. Esse horário está disponível?`);
// Existing schema: false means AVAILABLE, true means UNAVAILABLE.
export const availability = status => status ? 'Indisponível' : 'Disponível';
export const filterClasses = (rows, filters) => rows.filter(row => ['teacher_id', 'weekday', 'hour'].every(key => filters[key] === '' || String(row[key]) === filters[key]));
