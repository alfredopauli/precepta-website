import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";

// Import images.
import logo from '../assets/precepta-icon.png';
import authIcon from '../assets/auth-icon.png';

// Import styles.
import '../style/Header.css';


const Header = () => {
  const { session, setSession, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    e.preventDefault();
    navigate("/");
    const { success, error } = await signOut();
    if (!success) {
      setError(error.message);
    }
  }

  return (
    <header>
      <nav>
        <Link to="/" className="home-wrapper">
            <img src={logo}/>
        </Link>
        <div className="links-wrapper">
          <Link to="/cronograma" className="link" >
            Cronograma
          </Link>
          {session && (
            <Link to="/editarAulas" className="link" >
              Editar
            </Link>
          )}
        </div>
        <div className="auth-wrapper"> 
          { session && (
            <>
              <p>Olá, {session?.user?.email}!</p>
              <button onClick={handleSignOut}>
                Sair
              </button>
            </>
          )}
          <Link to="/autenticar" className="auth-icon">
            <img src={authIcon} />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;

