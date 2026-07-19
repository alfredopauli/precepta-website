import students from '../assets/students-2.png';
import logo from '../assets/precepta-logo.png';
import RevealOnScroll from './RevealOnScroll';
import '../style/HomeContent.css';
import '../style/RevealOnScroll.css';


const HomeContent = () => {
  return (
    <div className="content-wrapper">
      <div className="background-image">
        <img src={students} />
      </div>
      <RevealOnScroll>
        <div className="pannel">
          <div className="top">
            <h1> 
              Venha ser PRECEPTA também! 
            </h1>
            <div className="image-wrapper">
              <img src={logo} />
            </div>
          </div>
          <h3> 
            Escolha um professor da maior escola online de reforço de São Paulo e comece agora 
            suas monitorias particulares.
          </h3>
        </div>
      </RevealOnScroll>
    </div>
  );
}


export default HomeContent;

