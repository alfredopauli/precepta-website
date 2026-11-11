import { Link } from "react-router-dom";
import Orbit from "../components/Orbit";
import Copy from "../components/Copy";
import content from "../data/content.json";
import { WHATSAPP } from "../lib/domain";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <img
            className="hero-logo"
            src="/assets/logo-horizontal.svg"
            alt="Precepta — Educação, Cultura e Arte"
          />
          <span className="eyebrow">CONHECIMENTO QUE ABRE CAMINHOS</span>
          <h1>
            Aprender é descobrir
            <br />
            novas <em>possibilidades.</em>
          </h1>
          <p>
            Aulas online e apoio pedagógico para acompanhar cada etapa da sua
            jornada.
          </p>
          <div className="actions">
            <Link className="button primary" to="/servicos">
              Conheça os serviços <span>↗</span>
            </Link>
            <Link className="text-link" to="/grade">
              Ver horários →
            </Link>
          </div>
        </div>
        <Orbit />
      </section>
      <div className="fact-strip">
        <span>
          <b>Desde 2019</b>Compartilhando conhecimento
        </span>
        <span>
          <b>Mais de 1.000 h</b>De aulas ministradas
        </span>
        <span>
          <b>Ensino online</b>Do Fundamental ao Superior
        </span>
      </div>
      <section className="editorial">
        <div>
          <span className="eyebrow">01 / QUEM SOMOS</span>
          <h2>
            O seu próximo passo
            <br />
            começa com <em>apoio.</em>
          </h2>
        </div>
        <div>
          <Copy text={content.who} />
          <Link className="text-link" to="/servicos">
            Encontre o apoio que você precisa ↗
          </Link>
        </div>
      </section>
      <section className="editorial history">
        <div>
          <span className="eyebrow">02 / NOSSA HISTÓRIA</span>
          <h2>
            Uma escola que nasce
            <br />
            do amor por <em>ensinar.</em>
          </h2>
          <span className="year">
            2019<span>O início da nossa história</span>
          </span>
        </div>
        <div>
          {content.history.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>
      <section className="contact-band">
        <div>
          <span className="eyebrow">VAMOS CONVERSAR?</span>
          <h2>
            Há um caminho para
            <br />
            cada jeito de aprender.
          </h2>
        </div>
        <a
          className="button primary"
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
        >
          Fale com a Precepta ↗
        </a>
      </section>
    </>
  );
}
