import { useReveal } from "../../hooks/useReveal.js";

const reglas = [
    {
        id: 1,
        icon: "🏆",
        titulo: "Competición",
        puntos: [
            "Cada equipo disputa 2 partidos: uno por jornada.",
            "El día 2 se juegan las finales por puestos según resultados del día 1.",
            "Presentarse en pista al menos 15 minutos antes del partido.",
        ],
    },
    {
        id: 2,
        icon: "⏱️",
        titulo: "Tiempo de juego",
        puntos: [
            "4 períodos de 12 minutos corridos.",
            "Últimos 2 minutos de cada período: reloj parado.",
            "Posesión: 24 segundos. Prórroga: 5 min corridos, último minuto a reloj parado.",
        ],
    },
    {
        id: 3,
        icon: "📋",
        titulo: "Inscripción de jugadores",
        puntos: [
            "Jugadores con 45 años o más en el año en curso.",
            "Máximo 2 jugadores de entre 40 y 45 años por equipo.",
            "Entregar: nombre completo, número de dorsal y fecha de nacimiento.",
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
        </section>
    );
}

export default NormativaSection;
