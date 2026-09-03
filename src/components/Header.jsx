import '../style/Header.css';

import preceptaIcon from '../assets/precepta-icon.png';
import menuIcon from '../assets/menu-icon-black.png';

import { useState } from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
  const [ menuOpen, setMenuOpen ] = useState();

  return (
    <header>
      <Link to='/'>
        <img src={preceptaIcon} />
      </Link>
      
      <button 
        className='menu-button btn-reset'
        onClick={() => (setMenuOpen(!menuOpen))}
      >
        <img src={menuIcon} /> 
      </button>

      <nav className={menuOpen ? 'open' : 'closed'}>
        <ul>
          <li>Grade horária</li>
          <li>Planos</li>
        </ul>
      </nav>
    </header>
  )
};


export default Header;


