import { useParams, Link } from 'react-router-dom';
import { formatearFechaCorta, estadoPartido, partidoTieneResultado } from '../../data/MatchData.jsx';
import { useMatches } from '../../hooks/useMatches.js';

function MatchDetail() {
    const { matches } = useMatches();
    const { partido } = useParams();
    const pId = Number(partido);
    const foundMatch = matches.find((p) => p.id === pId);

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

    const { fecha, hora, equipos, titulo } = foundMatch;
    const [equipo1, equipo2] = equipos;
    const estado = estadoPartido(foundMatch);
    const esEnJuego = estado === 'en-juego';
    const esFinalizados = estado === 'finalizado';
    const tieneCrucePendiente = equipo1.placeholder || equipo2.placeholder;
    const tieneResultado = partidoTieneResultado(foundMatch);

    const ganadorId = esFinalizados && tieneResultado
        ? equipo1.puntuacion > equipo2.puntuacion
            ? equipo1.id
            : equipo2.puntuacion > equipo1.puntuacion
                ? equipo2.id
                : null
        : null;

    function cornerColor(equipoId) {
        if (esEnJuego) return 'soft';
        if (estado === 'proximo') return 'white';
        if (!tieneResultado) return 'soft';
        if (ganadorId === null) return 'soft';
        return ganadorId === equipoId ? 'accent' : 'soft';
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
                        <span className="match-detail-time">{hora}</span>
                    </div>

                    {titulo && (
                        <p className={`match-detail-stage ${tieneCrucePendiente ? 'match-detail-stage--pending' : ''}`}>
                            {titulo}
                        </p>
                    )}

                    <div className="match-detail-scoreboard">
                        <div className={`match-detail-team ${ganadorId === equipo1.id ? 'match-detail-team--winner' : ''}`}>
                            <div className="match-detail-shield-slot">
                                {equipo1.escudo && (
                                    <span className="match-detail-shield-frame">
                                        <img src={equipo1.escudo} alt={equipo1.equipo} className="match-detail-shield" />
                                    </span>
                                )}
                            </div>
                            <span className={`match-detail-team-link ${equipo1.placeholder ? 'match-detail-team-link--placeholder' : ''}`}>
                                {equipo1.equipo}
                            </span>
                            {esFinalizados && tieneResultado && (
                                <span className="match-detail-score">{equipo1.puntuacion}</span>
                            )}
                        </div>

                        <div className="match-detail-vs">
                            {esEnJuego && (
                                <span className="match-detail-result-badge match-detail-result-badge--live">En juego</span>
                            )}
                            {estado === 'proximo' && (
                                <span className="match-detail-result-badge match-detail-result-badge--upcoming">Próximamente</span>
                            )}
                            {esFinalizados && (
                                !tieneResultado
                                    ? <span className="match-detail-result-badge match-detail-result-badge--pending">Resultado pendiente</span>
                                    : ganadorId === null
                                        ? <span className="match-detail-result-badge match-detail-result-badge--draw">Empate</span>
                                        : <span className="match-detail-result-badge match-detail-result-badge--final">Final</span>
                            )}
                        </div>

                        <div className={`match-detail-team match-detail-team--right ${ganadorId === equipo2.id ? 'match-detail-team--winner' : ''}`}>
                            <div className="match-detail-shield-slot">
                                {equipo2.escudo && (
                                    <span className="match-detail-shield-frame">
                                        <img src={equipo2.escudo} alt={equipo2.equipo} className="match-detail-shield" />
                                    </span>
                                )}
                            </div>
                            <span className={`match-detail-team-link ${equipo2.placeholder ? 'match-detail-team-link--placeholder' : ''}`}>
                                {equipo2.equipo}
                            </span>
                            {esFinalizados && tieneResultado && (
                                <span className="match-detail-score">{equipo2.puntuacion}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {(esFinalizados && !tieneResultado) || tieneCrucePendiente ? (
                <div className="detail-body">
                    <div className="detail-message-card">
                        {esFinalizados && !tieneResultado && (
                            <p className="detail-message-text detail-message-text--subtle">
                                El partido ha terminado, pero el resultado todavía no se ha cargado desde el panel de administración.
                            </p>
                        )}
                        {tieneCrucePendiente && (
                            <p className="detail-message-text detail-message-text--subtle">
                                Este cruce se actualizará automáticamente cuando quede cerrada la clasificación del sábado 16 de mayo de 2026.
                            </p>
                        )}
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default MatchDetail;
