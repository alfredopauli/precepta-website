import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { configurationError, supabase } from '../lib/supabase';
import { Feedback, Heading } from '../components/UI';
export default function Login() {
 const auth = useAuth(), [busy, setBusy] = useState(false), [error, setError] = useState('');
 if (auth.admin && !auth.loading) return <Navigate to="/admin/professores" replace/>;
 async function submit(e) { e.preventDefault(); if (busy) return; setBusy(true); setError(''); const form = new FormData(e.currentTarget); try { const { error } = await supabase.auth.signInWithPassword({ email: form.get('email').trim(), password: form.get('password') }); if (error) setError(error.code === 'invalid_credentials' ? 'E-mail ou senha incorretos.' : 'Não foi possível entrar. Confira seus dados e sua conexão e tente novamente.'); } catch { setError('Não foi possível conectar. Tente novamente.'); } finally { setBusy(false); } }
 return <><Heading eyebrow="ÁREA ADMINISTRATIVA" title="Bom ter você por aqui.">Entre com suas credenciais para administrar professores e aulas.</Heading><div className="form-panel login-panel"><Feedback loading={auth.loading} error={configurationError || error}/>{auth.user && !auth.loading ? <><p>Você está conectado. {auth.error || 'Sua conta não possui acesso de administrador.'}</p><button onClick={auth.logout}>Sair da conta</button></> : <form onSubmit={submit}><label>E-mail<input name="email" type="email" autoComplete="username" required disabled={busy || !!configurationError}/></label><label>Senha<input name="password" type="password" autoComplete="current-password" required disabled={busy || !!configurationError}/></label><button className="button" disabled={busy || auth.loading || !!configurationError}>{busy ? 'Entrando…' : 'Entrar'}</button></form>}</div></>;
}
