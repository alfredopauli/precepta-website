import '../style/HomeContent.css';
import preceptaLogo from '../assets/precepta-logo.png';
import students from '../assets/students.png';


const HomeContent = () => {
  return (
    <>
      <div className='announce-wrapper'>
        <h1>Bem-vindo a Precepta!</h1>
        <p>A maior escola online de reforço de São Paulo.</p>
        <div className='announce' style={{'--announce-color': 'rgb(0, 127, 255)'}}>
          <h2>Conheça os nossos planos</h2>
          <button>
            Clique aqui
          </button>
        </div>
        <div className='announce' style={{'--announce-color': 'rgb(0, 255, 127)'}}>
          <h2>Já é aluno? Veja a nossa grade horária</h2>
          <button>
            Clique aqui
          </button>
        </div>
      </div>

      <div className='moreabout-wrapper'>
        <div className='image-wrapper'>
          <div className='background'></div>
          <img src={students} />
          <div className='fade-in'></div>
        </div>
        <div className='content'>
          <h1>Quem somos nós?</h1>
          <p>A Precepta Educação é uma escola de aperfeiçoamento e apoio pedagógico que atende estudantes dos Anos Iniciais ao Ensino Superior, concursos e exames de ingresso. Com mais de 1000 h de aulas ministradas, nossos professores vêm das principais universidades públicas do país. Oferecemos aulas, na modalidade remota, para:</p>
          <ul>
            <li>Ensino Fundamental e Médio (exatas, humanas e biológicas)</li>
            <li>Ensino Superior (exatas, humanas e biológicas)</li>
            <li>Revisão de provas para reconsideração de notas</li>
            <li>Redação e Produção Textual</li>
            <li>Exames de ingresso SAT e ACT</li>
          </ul>
          <p>Precisa de ajuda para organizar os estudos? A Precepta conta com planejamento de estudos e apoio psicopedagógico.</p>
          <h1>Nossa história</h1>
          <p>Fundada em 2019 pelo Físico prof. Mauro Lucas, a Precepta Educação é a consolidação do seu amor pelo conhecimento. Primeiro de três irmãos, é filho de uma Cientista Social e um Administrador de Empresas. Apaixonado pelo estudo, formou-se em escola pública, premiado como um dos melhores alunos do estado. Formado Técnico em Informática pelo SENAC - SP, aperfeiçoou seu olhar tecnológico e empreendedor. Desde o ingresso na graduação em Física da USP - onde formou-se -, participou de projetos de Iniciação em Docência e Residência Pedagógica, adquirindo vasta experiência em diversas escolas de São Paulo. O amor por ensinar estendeu seus estudos em Neurociência aplicada à Educação pela Faculdade de Filosofia e Letras - USP. Atuou no Ensino de Física no Instituto de Física - USP e Ensino de Matemática na Faculdade de Educação - USP. Foi tutor da turma de Física Médica, do Instituto de Física - USP e Faculdade de Medicina – USP. Hoje integra a pós-graduação da USP.</p>
        </div>
      </div>
    </>
  );
};


export default HomeContent;
