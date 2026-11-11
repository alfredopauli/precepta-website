import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { supabase, configurationError } from "../lib/supabase";
import { useAuth } from "../auth/AuthProvider";
import { PageHeading, Notice } from "../components/Shared";
export default function Login() {
  const auth = useAuth();
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;
    } catch {
      setError(
        "Não foi possível entrar. Confira seu e-mail e senha e tente novamente.",
      );
    } finally {
      setBusy(false);
    }
  }
  if (auth.loading) return <Notice>Verificando acesso…</Notice>;
  if (auth.admin) return <Navigate to="/admin/professores" replace />;
  return (
    <>
      <PageHeading eyebrow="ÁREA ADMINISTRATIVA" title="Bom ter você por aqui.">
        Entre com seu e-mail e senha.
      </PageHeading>
      {configurationError ? (
        <Notice error>{configurationError}</Notice>
      ) : auth.user ? (
        <Notice error>
          {auth.error ||
            "Acesso negado. Sua conta não tem permissão de administrador."}{" "}
          Use “Sair” no menu para entrar com outra conta.
        </Notice>
      ) : (
        <form className="form-panel login-form" onSubmit={submit}>
          <h2>Entrar</h2>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {(error || auth.error) && (
            <Notice error>{error || auth.error}</Notice>
          )}
          <button className="primary" disabled={busy}>
            {busy ? "Entrando…" : "Entrar"}
          </button>
          <Link to="/">Voltar ao início</Link>
        </form>
      )}
    </>
  );
}
