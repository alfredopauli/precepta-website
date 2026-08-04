import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";

// Import images.
import logo from '../assets/precepta-icon.png';
import authIcon from '../assets/auth-icon.png';

// Import styles.
import '../style/Header.css';


const Header = () => {
  const { session, setSession } = useContext(AuthContext);

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
            <Link to="/editar" className="link" >
              Editar
            </Link>
          )}
        </div>
        <div className="auth-wrapper">
          { session && (
            `Olá, ${session?.name}!`
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

