import student from '../assets/student.png'
import RevealOnScroll from './RevealOnScroll';
import '../style/HomeContent.css';
import '../style/RevealOnScroll.css';


const HomeContent = () => {
  return (
    <div className="advertisement-wrapper">
      <RevealOnScroll>
        <div className="text-wrapper">
          <div className="text">
            <h1> Venha ser PRECEPTA também! </h1>
            <h3> 
              Escolha um professor da maior escola online de reforço de São Paulo e comece agora 
              suas monitorias particulares.
            </h3>
          </div>
        </div>
      </RevealOnScroll>
      <RevealOnScroll>
        <div className="image">
          <img src={student} />
        </div>
      </RevealOnScroll>
    </div>
    //<div className="advertisement-wrapper">
    //  <RevealOnScroll>
    //    <div className="text-wrapper">
    //      <div className="text">
    //        <h1> Venha ser PRECEPTA também! </h1>
    //        <h3> 
    //          Escolha um professor da maior escola online de reforço de São Paulo e comece agora 
    //          suas monitorias particulares.
    //        </h3>
    //      </div>
    //    </div>
    //  </RevealOnScroll>
    //  <RevealOnScroll>
    //    <div className="image">
    //      <img src={student} />
    //    </div>
    //  </RevealOnScroll>
    //</div>
  );
}


export default HomeContent;

