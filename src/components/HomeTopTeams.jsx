import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal.js';

const RANK_COLORS = ['accent', 'soft', 'white'];
const RANK_LABELS = ['1º', '2º', '3º'];

function TopTeamCard({ rank, equipo, points }) {
    const accentColor = RANK_COLORS[rank - 1];

    const card = (
        <article className="team-card">
            <div className={`team-card-accent team-card-accent--top team-card-accent--${accentColor}`}></div>
            <div className="team-card-body">
                <div className="team-card-header">
                    <span className={`top-team-rank top-team-rank--${accentColor}`}>
                        {RANK_LABELS[rank - 1]}
                    </span>
                    <h3 className="team-card-name">{equipo.equipo}</h3>
                </div>
                <div className="team-card-info">
                    <span className="team-card-stat">
                        <span className="team-card-stat-value">{points}</span>
                        <span className="team-card-stat-label">puntos totales</span>
                    </span>
                </div>
            </div>
            {equipo.escudo && (
                <div className="team-card-shield-slot">
                    <img src={equipo.escudo} alt={equipo.equipo} className="team-card-shield" />
                </div>
            )}
        </article>
    );

    if (equipo.slug) {
        return <Link to={`/equipos/${equipo.slug}`} className="card-link">{card}</Link>;
    }
    return card;
}

function HomeTopTeams({ topTeams }) {
    const headerRef = useReveal();
    const gridRef = useReveal('-40px 0px');

    if (!topTeams || topTeams.length === 0) return null;

    return (
        <section className="home-top-teams">
            <div ref={headerRef} className="home-next-matches-header reveal">
                <p className="home-next-matches-label">Clasificación final</p>
                <h2 className="home-next-matches-title">Mejores equipos</h2>
            </div>
            <div ref={gridRef} className="cards-grid cards-grid--top3 stagger-grid">
                {topTeams.map(({ equipo, points }, index) => (
                    <TopTeamCard
                        key={equipo.id}
                        rank={index + 1}
                        equipo={equipo}
                        points={points}
                    />
                ))}
            </div>
        </section>
    );
}

export default HomeTopTeams;
