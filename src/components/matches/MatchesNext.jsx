import MatchCard from "./MatchCard.jsx";
import { useReveal } from "../../hooks/useReveal.js";

function MatchesNext({ nextMatches }) {
    const gridRef = useReveal('-40px 0px');
    return (
        <section className="matches-section">
            <h2 className="matches-section-title">
                <span className="matches-section-dot matches-section-dot--upcoming"></span>
                Próximos partidos
            </h2>
            <div ref={gridRef} className="cards-grid stagger-grid">
                {nextMatches.map((partido) => (
                    <MatchCard key={partido.id} partido={partido} />
                ))}
            </div>
        </section>
    );
}

export default MatchesNext;