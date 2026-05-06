import { Link } from "react-router-dom";
import { formatearFechaCorta, estadoPartido } from "../../data/MatchData.jsx";

function MatchCard({ partido }) {
    const { id, fecha, hora, horaFin, equipos } = partido;
    const [equipo1, equipo2] = equipos;

    const estado = estadoPartido(partido);
    const esEnJuego = estado === "en-juego";
    const esFinalizados = estado === "finalizado";

    const ganador = esFinalizados
        ? equipo1.puntuacion > equipo2.puntuacion
            ? equipo1.id
            : equipo2.puntuacion > equipo1.puntuacion
                ? equipo2.id
                : null
        : null;

    function cornerColor(equipoId) {
        if (esEnJuego) return "soft"; // Azul neutro mientras está en juego
        if (estado === "proximo") return "white";
        if (ganador === null) return "soft"; // Empate
        return ganador === equipoId ? "accent" : "soft";
    }

    return (
        <Link to={`/partidos/${id}`} className="card-link">
            <div className="match-card">
                <div className={`match-card-corner match-card-corner--top match-card-corner--${cornerColor(equipo1.id)}`}></div>
                <div className={`match-card-corner match-card-corner--bottom match-card-corner--${cornerColor(equipo2.id)}`}></div>

                {equipo1.escudo && (
                    <div
                        className="match-card-escudo match-card-escudo--left"
                        style={{ backgroundImage: `url(${equipo1.escudo})` }}
                    ></div>
                )}
                {equipo2.escudo && (
                    <div
                        className="match-card-escudo match-card-escudo--right"
                        style={{ backgroundImage: `url(${equipo2.escudo})` }}
                    ></div>
                )}

                <div className="match-card-meta">
                    <span className="match-card-date">{formatearFechaCorta(fecha)}</span>
                    <span className="match-card-separator">·</span>
                    <span className="match-card-time">{hora} - {horaFin}</span>
                </div>

                {esEnJuego ? (
                    <>
                        <div className="match-card-teams">
                            <span className={`match-card-team ${ganador === equipo1.id ? "match-card-team--winner" : ""}`}>
                                {equipo1.equipo}
                            </span>
                                <span className="match-card-score">
                                {esFinalizados ? `${equipo1.puntuacion} — ${equipo2.puntuacion}` : "vs"}
                            </span>
                                <span className={`match-card-team ${ganador === equipo2.id ? "match-card-team--winner" : ""}`}>
                                {equipo2.equipo}
                            </span>
                        </div>
                        <div className="match-card-live">
                            <span className="match-card-badge match-card-badge--live">En juego</span>
                        </div>
                    </>
                ) : (
                    <div className="match-card-teams">
                        <span className={`match-card-team ${ganador === equipo1.id ? "match-card-team--winner" : ""}`}>
                            {equipo1.equipo}
                        </span>
                        <span className="match-card-score">
                            {esFinalizados ? `${equipo1.puntuacion} — ${equipo2.puntuacion}` : "vs"}
                        </span>
                        <span className={`match-card-team ${ganador === equipo2.id ? "match-card-team--winner" : ""}`}>
                            {equipo2.equipo}
                        </span>
                    </div>
                )}

                {esFinalizados && ganador === null && (
                    <span className="match-card-badge match-card-badge--draw">Empate</span>
                )}
                {estado === "proximo" && (
                    <span className="match-card-badge match-card-badge--upcoming">Próximamente</span>
                )}
            </div>
        </Link>
    );
}

export default MatchCard;