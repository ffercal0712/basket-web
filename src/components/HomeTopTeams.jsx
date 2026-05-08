import {useState} from 'react';
import {useReveal} from '../hooks/useReveal.js';

const RANK_COLORS = ['accent', 'soft', 'accent-muted', 'soft-muted', 'white', 'white', 'white', 'white'];
const RANK_LABELS = ['1º', '2º', '3º', '4º', '5º', '6º', '7º', '8º'];

function TopTeamCard({ rank, equipo, points }) {
    const accentColor = RANK_COLORS[rank - 1];

    return (
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
                    <img src={equipo.escudo} alt={equipo.equipo} className="team-card-shield"/>
                </div>
            )}
        </article>
    );
}

function HomeTopTeams({ topTeamsByResult, topTeamsByPoints }) {
    const [sortMode, setSortMode] = useState('result');
    const headerRef = useReveal();
    const gridRef = useReveal('-40px 0px');

    const topTeams = sortMode === 'result' ? topTeamsByResult : topTeamsByPoints;

    if (!topTeams || topTeams.length === 0) return null;

    return (
        <section className="home-top-teams">
            <div ref={headerRef} className="home-next-matches-header reveal">
                <p className="home-next-matches-label">Clasificación final</p>
                <h2 className="home-next-matches-title">Mejores equipos</h2>
                <div className="ranking-sort-toggle">
                    <button
                        type="button"
                        className={`ranking-sort-btn ${sortMode === 'result' ? 'ranking-sort-btn--active' : ''}`}
                        onClick={() => setSortMode('result')}
                    >
                        Ganadores
                    </button>
                    <button
                        type="button"
                        className={`ranking-sort-btn ${sortMode === 'points' ? 'ranking-sort-btn--active' : ''}`}
                        onClick={() => setSortMode('points')}
                    >
                        Puntuación
                    </button>
                </div>
            </div>
            <div ref={gridRef} className="cards-grid cards-grid--ranking stagger-grid">
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
