import { Link } from 'react-router-dom';
import { formatearFechaCorta, estadoPartido, partidoTieneResultado } from '../../data/MatchData.jsx';

function MatchCard({ partido }) {
    const { id, fecha, hora, horaFin, equipos, titulo, nota } = partido;
    const [equipo1, equipo2] = equipos;
    const tieneCrucePendiente = equipo1.placeholder || equipo2.placeholder;
    const tieneResultado = partidoTieneResultado(partido);

    const estado = estadoPartido(partido);
    const esEnJuego = estado === 'en-juego';
    const esFinalizados = estado === 'finalizado';

    const ganador = esFinalizados && tieneResultado
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
        if (ganador === null) return 'soft';
        return ganador === equipoId ? 'accent' : 'soft';
    }

    function getScoreLabel() {
        if (tieneResultado) return `${equipo1.puntuacion} — ${equipo2.puntuacion}`;
        if (esFinalizados) return '—';
        return 'X';
    }

    return (
        <Link to={`/partidos/${id}`} className="card-link">
            <div className="match-card">
                <div className={`match-card-corner match-card-corner--top match-card-corner--${cornerColor(equipo1.id)}`}></div>
                <div className={`match-card-corner match-card-corner--bottom match-card-corner--${cornerColor(equipo2.id)}`}></div>

                <div className="match-card-meta">
                    <span className="match-card-date">{formatearFechaCorta(fecha)}</span>
                    <span className="match-card-separator">·</span>
                    <span className="match-card-time">{hora} - {horaFin}</span>
                </div>

                {titulo && (
                    <p className={`match-card-stage ${tieneCrucePendiente ? 'match-card-stage--pending' : ''}`}>
                        {titulo}
                    </p>
                )}

                {esEnJuego ? (
                    <>
                        <div className="match-card-teams">
                            <span className={`match-card-team ${ganador === equipo1.id ? 'match-card-team--winner' : ''} ${equipo1.placeholder ? 'match-card-team--placeholder' : ''}`}>
                                {equipo1.equipo}
                            </span>
                            <span className="match-card-score">
                                {getScoreLabel()}
                            </span>
                            <span className={`match-card-team ${ganador === equipo2.id ? 'match-card-team--winner' : ''} ${equipo2.placeholder ? 'match-card-team--placeholder' : ''}`}>
                                {equipo2.equipo}
                            </span>
                        </div>
                        <div className="match-card-live">
                            <span className="match-card-badge match-card-badge--live">En juego</span>
                        </div>
                    </>
                ) : (
                    <div className="match-card-teams">
                        <span className={`match-card-team ${ganador === equipo1.id ? 'match-card-team--winner' : ''} ${equipo1.placeholder ? 'match-card-team--placeholder' : ''}`}>
                            {equipo1.equipo}
                        </span>
                        <span className="match-card-score">
                            {getScoreLabel()}
                        </span>
                        <span className={`match-card-team ${ganador === equipo2.id ? 'match-card-team--winner' : ''} ${equipo2.placeholder ? 'match-card-team--placeholder' : ''}`}>
                            {equipo2.equipo}
                        </span>
                    </div>
                )}

                {nota && (
                    <p className="match-card-note">{nota}</p>
                )}

                {esFinalizados && ganador === null && (
                    tieneResultado
                        ? <span className="match-card-badge match-card-badge--draw">Empate</span>
                        : <span className="match-card-badge match-card-badge--pending-result">Resultado pendiente</span>
                )}
                {estado === 'proximo' && (
                    <span className="match-card-badge match-card-badge--upcoming">Próximamente</span>
                )}
            </div>
        </Link>
    );
}

export default MatchCard;
