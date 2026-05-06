import { Link } from "react-router-dom";
import MatchCard from "./MatchCard.jsx";
import { useReveal } from "../../hooks/useReveal.js";

function HomeNextMatches({ nextMatches }) {
    const MAX_TO_SHOW = 3;
    const matchesToShow = nextMatches.slice(0, MAX_TO_SHOW);
    const headerRef = useReveal();
    const listRef = useReveal('-40px 0px');

    if (matchesToShow.length === 0) return null;

    return (
        <section className="home-next-matches">
            <div ref={headerRef} className="home-next-matches-header reveal">
                <p className="home-next-matches-label">Calendario</p>
                <h2 className="home-next-matches-title">Próximos partidos</h2>
            </div>

            <div ref={listRef} className="cards-list stagger-grid">
                {matchesToShow.map((partido) => (
                    <MatchCard key={partido.id} partido={partido} />
                ))}
            </div>

            {nextMatches.length > MAX_TO_SHOW && (
                <div className="home-next-matches-footer">
                    <Link to="/partidos" className="home-next-matches-link">
                        Ver todos los partidos →
                    </Link>
                    <Link to="/equipos" className="home-next-matches-link home-next-matches-link--secondary">
                        Ver los equipos →
                    </Link>
                </div>
            )}
        </section>
    );
}

export default HomeNextMatches;