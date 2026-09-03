import RevealOnScroll from './RevealOnScroll';

// Import images
import students from '../assets/students.png';
import logo from '../assets/precepta-logo.png';

// Import styles.
import '../style/HomeContent.css';
import '../style/RevealOnScroll.css';


const HomeContent = () => {
  return (
    <div className="content-wrapper">
      <div className="background-image">
        <img src={students} />
      </div>

      <RevealOnScroll>
        <div className="welcome-message">
          <div className="top-text">
            <div className="left-text"> 
              Venha ser PRECEPTA também! 
            </div>
            <div className="image-wrapper">
              <img src={logo} />
            </div>
          </div>
          <div className="bottom-text">
            Escolha um professor da maior escola online de reforço de São Paulo e comece agora 
            suas monitorias particulares.
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}


export default HomeContent;

