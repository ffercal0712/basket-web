import { Link } from "react-router-dom";

/**
 * Tarjeta resumen de un equipo.
 * Muestra nombre, capitán (si existe), y contador de jugadores.
 *
 * @param {{ slug: string, equipo: string, capitan: string|null, jugadores: Array }} equipo
 * @param accentColor
 * @returns {React.JSX.Element}
 */
function TeamCard({ equipo, accentColor = "accent" }) {
    const { slug, equipo: nombre, capitan, jugadores, escudo } = equipo;
    const numJugadores = jugadores.length;

    return (
        <Link to={`/equipos/${slug}`} className="card-link">
            <div className="team-card">
                <div className={`team-card-accent team-card-accent--top team-card-accent--${accentColor}`}></div>
                {/*<div className={`team-card-accent team-card-accent--bottom team-card-accent--${accentColor === "accent" ? "soft" : "accent"}`}></div>*/}

                {escudo && (
                    <div
                        className="team-card-escudo"
                        style={{ backgroundImage: `url(${escudo})` }}
                    ></div>
                )}

                <div className="team-card-header">
                    <h2 className="team-card-name">{nombre}</h2>
                </div>

                <div className="team-card-info">
                    <span className="team-card-stat">
                        <span className="team-card-stat-value">{numJugadores}</span>
                        <span className="team-card-stat-label">jugadores</span>
                    </span>

                    {capitan ? (
                        <span className="team-card-stat">
                            <span className="team-card-stat-value">{capitan}</span>
                            <span className="team-card-stat-label">capitán</span>
                        </span>
                    ) : (
                        <span className="team-card-stat team-card-stat--pending">
                            <span className="team-card-stat-value">—</span>
                            <span className="team-card-stat-label">capitán por confirmar</span>
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default TeamCard;