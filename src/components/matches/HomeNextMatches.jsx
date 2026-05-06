import { Link } from "react-router-dom";
import MatchCard from "./MatchCard.jsx";
import { useReveal } from "../../hooks/useReveal.js";

function HomeNextMatches({ nextMatches, lastMatches = [] }) {
    const MAX_TO_SHOW = 4;
    const hasUpcoming = nextMatches.length > 0;
    const matchesToShow = hasUpcoming
        ? nextMatches.slice(0, MAX_TO_SHOW)
        : lastMatches;
    const headerRef = useReveal();
    const listRef = useReveal('-40px 0px');

    if (matchesToShow.length === 0) return null;

    return (
        <section className="home-next-matches">
            <div ref={headerRef} className="home-next-matches-header reveal">
                <p className="home-next-matches-label">
                    {hasUpcoming ? "Calendario" : "Resultados"}
                </p>
                <h2 className="home-next-matches-title">
                    {hasUpcoming ? "Próximos partidos" : "Últimos resultados"}
                </h2>
            </div>

            <div ref={listRef} className="cards-list stagger-grid">
                {matchesToShow.map((partido) => (
                    <MatchCard key={partido.id} partido={partido} />
                ))}
            </div>

            {hasUpcoming && nextMatches.length > MAX_TO_SHOW && (
                <div className="home-next-matches-footer">
                    <Link to="/partidos" className="home-next-matches-link">
                        Ver todos los partidos →
                    </Link>
                    <Link to="/equipos" className="home-next-matches-link home-next-matches-link--secondary">
                        Ver los equipos →
                    </Link>
                </div>
            )}

            {!hasUpcoming && (
                <div className="home-next-matches-footer">
                    <Link to="/partidos" className="home-next-matches-link">
                        Ver todos los resultados →
                    </Link>
                </div>
            )}
        </section>
    );
}

export default HomeNextMatches;