import partidos, { estadoPartido, partidoToDate } from "../../data/MatchData.jsx";
import MatchCard from "./MatchCard.jsx";
import MatchesNext from "./MatchesNext.jsx";
import { useReveal } from "../../hooks/useReveal.js";

function Matches() {
    const sinResultado = [...partidos]
        .filter(p => {
            const estado = estadoPartido(p);
            return estado === "proximo" || estado === "en-juego";
        })
        .sort((a, b) =>
            partidoToDate(a.fecha, a.hora) - partidoToDate(b.fecha, b.hora)
        );

    const conResultado = [...partidos]
        .filter(p => estadoPartido(p) === "finalizado")
        .sort((a, b) =>
            partidoToDate(b.fecha, b.hora) - partidoToDate(a.fecha, a.hora)
        );

    const resultsGridRef = useReveal('-40px 0px');

    return (
        <>
            <div className="page-header">
                <p className="page-header-label">Torneo</p>
                <h1 className="page-header-title">Partidos</h1>
                <p className="page-header-subtitle">
                    16 y 17 de mayo · Pabellón Elola, Fuengirola
                </p>
            </div>

            <MatchesNext nextMatches={sinResultado} />

            {conResultado.length > 0 && (
                <section className="matches-section">
                    <h2 className="matches-section-title">
                        <span className="matches-section-dot matches-section-dot--played"></span>
                        Resultados
                    </h2>
                    <div ref={resultsGridRef} className="cards-grid stagger-grid">
                        {conResultado.map((partido) => (
                            <MatchCard key={partido.id} partido={partido} />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}

export default Matches;