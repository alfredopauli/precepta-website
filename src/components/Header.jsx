import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";
import logo from '../assets/precepta-logo.jpg';
import authIcon from '../assets/auth-icon.png';
import "../style/Header.css";


const Header = () => {
  const { session, setSession } = useContext(AuthContext);

  return (
    <>
      <header>
        <nav className="header__nav">
          <Link to="/" className="logo">
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
    </>
  );
}

export default Header;

