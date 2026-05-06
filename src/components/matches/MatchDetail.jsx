import { useParams, Link } from "react-router-dom";
import partidos, { formatearFechaCorta, estadoPartido } from "../../data/MatchData.jsx";

function MatchDetail() {
    const { partido } = useParams();
    const pId = Number(partido);
    const foundMatch = partidos.find((p) => p.id === pId);

    if (!foundMatch) {
        return (
            <div className="detail-not-found">
                <span className="detail-not-found-icon">🏀</span>
                <h1>Partido no encontrado</h1>
                <p>El partido que buscas no existe o ha sido eliminado.</p>
                <Link to="/partidos" className="detail-back-btn">← Volver a partidos</Link>
            </div>
        );
    }

    const { fecha, hora, horaFin, equipos } = foundMatch;
    const [equipo1, equipo2] = equipos;
    const estado = estadoPartido(foundMatch);
    const esEnJuego = estado === "en-juego";
    const esFinalizados = estado === "finalizado";

    const ganadorId = esFinalizados
        ? equipo1.puntuacion > equipo2.puntuacion
            ? equipo1.id
            : equipo2.puntuacion > equipo1.puntuacion
                ? equipo2.id
                : null
        : null;

    function cornerColor(equipoId) {
        if (esEnJuego) return "soft";
        if (estado === "proximo") return "white";
        if (ganadorId === null) return "soft";
        return ganadorId === equipoId ? "accent" : "soft";
    }

    return (
        <>
            <div className="detail-hero match-detail-hero">
                <div className={`match-corner match-corner--left match-corner--${cornerColor(equipo1.id)}`}></div>
                <div className={`match-corner match-corner--right match-corner--${cornerColor(equipo2.id)}`}></div>

                <div className="detail-hero-content">
                    <Link to="/partidos" className="detail-breadcrumb">← Partidos</Link>

                    <div className="match-detail-meta">
                        <span className="match-detail-date">{formatearFechaCorta(fecha)}</span>
                        <span className="match-detail-separator">·</span>
                        <span className="match-detail-time">{hora} - {horaFin}</span>
                    </div>

                    <div className="match-detail-scoreboard">
                        <div className={`match-detail-team ${ganadorId === equipo1.id ? "match-detail-team--winner" : ""}`}>
                            {equipo1.escudo && (
                                <div
                                    className="match-detail-escudo match-detail-escudo--left"
                                    style={{ backgroundImage: `url(${equipo1.escudo})` }}
                                ></div>
                            )}
                            <Link to={`/equipos/${equipo1.slug}`} className="match-detail-team-link">
                                {equipo1.equipo}
                            </Link>
                            {esFinalizados && (
                                <span className="match-detail-score">{equipo1.puntuacion}</span>
                            )}
                        </div>

                        <div className="match-detail-vs">
                            {esEnJuego && (
                                <span className="match-detail-result-badge match-detail-result-badge--live">En juego</span>
                            )}
                            {estado === "proximo" && (
                                <span className="match-detail-result-badge match-detail-result-badge--upcoming">Próximamente</span>
                            )}
                            {esFinalizados && (
                                ganadorId === null
                                    ? <span className="match-detail-result-badge match-detail-result-badge--draw">Empate</span>
                                    : <span className="match-detail-result-badge match-detail-result-badge--final">Final</span>
                            )}
                        </div>

                        <div className={`match-detail-team match-detail-team--right ${ganadorId === equipo2.id ? "match-detail-team--winner" : ""}`}>
                            {equipo2.escudo && (
                                <div
                                    className="match-detail-escudo match-detail-escudo--right"
                                    style={{ backgroundImage: `url(${equipo2.escudo})` }}
                                ></div>
                            )}
                            <Link to={`/equipos/${equipo2.slug}`} className="match-detail-team-link">
                                {equipo2.equipo}
                            </Link>
                            {esFinalizados && (
                                <span className="match-detail-score">{equipo2.puntuacion}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="detail-body">
                <div className="match-detail-teams-info">
                    <div className="match-detail-team-block">
                        <h2 className="detail-section-title">
                            <Link to={`/equipos/${equipo1.slug}`}>{equipo1.equipo}</Link>
                        </h2>
                        <div className="players-grid">
                            {equipo1.jugadores.map((j) => (
                                <div key={j.id} className="player-card">
                                    <span className="player-number">#{j.numero}</span>
                                    <span className="player-name">{j.jugador}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="match-detail-team-block">
                        <h2 className="detail-section-title">
                            <Link to={`/equipos/${equipo2.slug}`}>{equipo2.equipo}</Link>
                        </h2>
                        <div className="players-grid">
                            {equipo2.jugadores.map((j) => (
                                <div key={j.id} className="player-card">
                                    <span className="player-number">#{j.numero}</span>
                                    <span className="player-name">{j.jugador}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MatchDetail;