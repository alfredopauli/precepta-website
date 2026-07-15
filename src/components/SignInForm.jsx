import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

import "../style/SignInForm.css";



const SignInForm = () => {
  const { session, setSession } = useContext(AuthContext);
  const navigate = useNavigate();

  const goToEdit = async (e) => {
    e.preventDefault();
    navigate('/editar');
    setSession({ name: "Mauro", authenticated: true });
  }

  return (
    <div className="authenticate-wrapper">
      <form>
        <div>Username</div>
        <input />
        <div>Senha</div>
        <input type="password"/>
        <button onClick={goToEdit}>
          Entrar
        </button>
      </form>
    </div>
  );
}


export default SignInForm;

