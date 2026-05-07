import { useReveal } from "../../hooks/useReveal.js";
import normativaPdf from "../../assets/ficheros/normativa.pdf";

const reglas = [
    {
        id: 1,
        icon: "🏆",
        titulo: "Competición",
        puntos: [
            "Cada equipo disputará 2 partidos en total, uno cada día del torneo.",
            "Tras los resultados de la primera jornada, los equipos jugarán los partidos finales correspondientes.",
            "Los equipos deberán presentarse en la instalación al menos 15 minutos antes de la hora fijada para su partido.",
        ],
    },
    {
        id: 2,
        icon: "⏱️",
        titulo: "Tiempo de juego",
        puntos: [
            "Cada partido se jugará en 4 periodos de 12 minutos.",
            "En cada periodo, los 2 últimos minutos se jugarán a reloj parado.",
            "Se aplicará además control de posesión de 24 segundos.",
            "En caso de empate, se disputará una prórroga de 5 minutos a reloj corrido, excepto el último minuto, que se jugará a reloj parado.",
        ],
    },
];

function ReglaCard({ regla }) {
    return (
        <div className="normativa-card">
            <div className="normativa-card-icon">{regla.icon}</div>
            <h3 className="normativa-card-title">{regla.titulo}</h3>
            <ul className="normativa-card-list">
                {regla.puntos.map((p, i) => (
                    <li key={i}>{p}</li>
                ))}
            </ul>
        </div>
    );
}

function NormativaSection() {
    const headerRef = useReveal();
    const gridRef = useReveal('-40px 0px');

    return (
        <section className="normativa-section">
            <div ref={headerRef} className="normativa-header reveal">
                <p className="page-header-label">Reglamento</p>
                <h2 className="normativa-section-title">Normativa del torneo</h2>
                <p className="normativa-section-subtitle">
                    Resumen de las normas principales. Consulta el reglamento completo en la organización.
                </p>
            </div>
            <div ref={gridRef} className="normativa-grid stagger-grid">
                {reglas.map(r => (
                    <ReglaCard key={r.id} regla={r} />
                ))}
            </div>
            <div className="normativa-pdf-link-wrap">
                <a
                    href={normativaPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="normativa-pdf-link"
                >
                    Ver reglamento completo en PDF →
                </a>
            </div>
        </section>
    );
}

export default NormativaSection;
