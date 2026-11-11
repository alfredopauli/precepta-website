import test from 'node:test';
import assert from 'node:assert/strict';
import { DAYS, timeRange, classWhatsapp, availability, filterClasses } from '../src/lib/domain.js';
import { services } from '../src/data/content.js';
test('seis dias e aulas de cinquenta minutos, inclusive limites', () => {
 assert.equal(DAYS[0], 'Segunda-feira'); assert.equal(DAYS[5], 'Sábado'); assert.equal(DAYS.length, 6);
 assert.equal(timeRange(0), '00h00–00h50'); assert.equal(timeRange(16), '16h00–16h50'); assert.equal(timeRange(23), '23h00–23h50');
});
test('booleano de disponibilidade mantém a convenção do banco', () => { assert.equal(availability(false), 'Disponível'); assert.equal(availability(true), 'Indisponível'); });
test('WhatsApp preserva nome, caracteres especiais, dia e horário', () => {
 const row = { teachers: { name: 'João & Ana' }, weekday: 5, hour: 16 };
 const before = structuredClone(row); const url = new URL(classWhatsapp(row));
 assert.equal(url.hostname, 'wa.me'); assert.equal(url.pathname, '/5511991723096');
 assert.match(url.searchParams.get('text'), /João & Ana/); assert.match(url.searchParams.get('text'), /Sábado/); assert.match(url.searchParams.get('text'), /16h00–16h50/); assert.deepEqual(row, before);
});
test('filtros combinam dia zero, hora zero e professor sem eliminar sobreposição', () => {
 const rows = [{ id: 1, teacher_id: 2, weekday: 0, hour: 0 }, { id: 2, teacher_id: 2, weekday: 0, hour: 0 }, { id: 3, teacher_id: 3, weekday: 1, hour: 14 }];
 assert.equal(filterClasses(rows, { teacher_id: '', weekday: '', hour: '' }).length, 3);
 assert.deepEqual(filterClasses(rows, { teacher_id: '2', weekday: '0', hour: '0' }).map(r => r.id), [1, 2]);
 assert.equal(filterClasses(rows, { teacher_id: '3', weekday: '0', hour: '' }).length, 0);
});
test('catálogo contém oito serviços, preços e condições extensas', () => {
 assert.equal(services.length, 8); assert.ok(services.every(s => s.price.startsWith('R$') && s.blocks.length));
 assert.match(services[2].blocks.join(' '), /Não permite cancelamento de aulas/); assert.match(services[2].price, /1.038,80/); assert.match(services[3].blocks.join(' '), /90 minutos/); assert.match(services[6].blocks.join(' '), /No Calculator/);
});
