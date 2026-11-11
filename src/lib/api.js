import { supabase } from './supabase';
async function result(query) { const { data, error } = await query; if (error) throw error; return data; }
export const getTeachers = () => result(supabase.from('teachers').select('id,name,desc,color').order('name'));
export const getClasses = (publicOnly = false) => {
  let query = supabase.from('classes').select('id,teacher_id,hour,weekday,status,teachers(id,name,desc,color)');
  if (publicOnly) query = query.eq('status', false);
  return result(query.order('hour').order('weekday'));
};
export async function saveRecord(table, id, values) {
  // select() confirms that RLS allowed a row to be affected; no silent zero-row success.
  const query = id == null ? supabase.from(table).insert(values) : supabase.from(table).update(values).eq('id', id);
  const rows = await result(query.select('id'));
  if (!rows?.length) throw new Error('Nenhum registro foi alterado. Verifique sua permissão.');
}
export async function deleteRecord(table, id) {
  const rows = await result(supabase.from(table).delete().eq('id', id).select('id'));
  if (!rows?.length) throw new Error('Nenhum registro foi excluído.');
}
