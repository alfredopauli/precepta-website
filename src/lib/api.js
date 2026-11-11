import { supabase, configurationError } from "./supabase";
export async function getData(availableOnly = false) {
  if (!supabase) throw new Error(configurationError);
  let query = supabase
    .from("classes")
    .select("id,teacher_id,hour,weekday,status")
    .order("hour");
  if (availableOnly) query = query.eq("status", false);
  const [teachers, classes] = await Promise.all([
    supabase.from("teachers").select("id,name,desc,color").order("name"),
    query,
  ]);
  if (teachers.error || classes.error)
    throw new Error(
      "Não foi possível carregar os dados. Verifique sua conexão e tente novamente.",
    );
  return { teachers: teachers.data, classes: classes.data };
}
// Verify admin membership again before mutations; existing RLS enforces permissions.
export async function requireAdmin() {
  if (!supabase) throw new Error(configurationError);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) throw new Error("Sua sessão expirou. Entre novamente.");
  const result = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (result.error || !result.data)
    throw new Error(
      "Acesso negado. Não foi possível confirmar sua permissão de administrador.",
    );
}
export async function mutate(table, operation, payload, id) {
  await requireAdmin();
  let query = supabase.from(table);
  if (operation === "delete") query = query.delete().eq("id", id);
  else if (operation === "update") query = query.update(payload).eq("id", id);
  else query = query.insert(payload);
  const { data, error } = await query.select("id");
  if (error || !data?.length)
    throw new Error(
      "A alteração não foi concluída. Verifique sua permissão e os dados e tente novamente.",
    );
}
