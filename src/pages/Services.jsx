import content from "../data/content.json";
import Copy from "../components/Copy";
import { PageHeading } from "../components/Shared";
import { WHATSAPP } from "../lib/domain";
export default function Services() {
  return (
    <>
      <PageHeading eyebrow="APRENDER, DO SEU JEITO" title="Apoio para ir além.">
        Conheça nossos serviços e encontre o acompanhamento para o seu momento.
      </PageHeading>
      <div className="service-grid">
        {content.services.map((s, i) => (
          <article className={`service-card accent-${i % 4}`} key={s.title}>
            <span className="service-number">0{i + 1} / PRECEPTA</span>
            <h2>{s.title}</h2>
            <p className="price">{s.price}</p>
            <Copy text={s.body} />
            <a
              className="text-link"
              href={`${WHATSAPP}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre ${s.title}.`)}`}
              target="_blank"
              rel="noreferrer"
            >
              Consultar pelo WhatsApp ↗
            </a>
          </article>
        ))}
      </div>
    </>
  );
}
