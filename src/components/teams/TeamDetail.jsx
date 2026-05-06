import { useParams, Link } from "react-router-dom";
import equipos from "../../data/TeamData.jsx";

function TeamDetail() {
    const { equipo } = useParams();
    //const tId = Number(equipo); // <--- Si se utiliza el id
    const tSlug = equipo; // <--- Si se utiliza el slug
    const foundTeam = equipos.find((e) => e.slug === tSlug);

    if (!foundTeam) {
        return (
            <div className="detail-not-found">
                <span className="detail-not-found-icon">🏀</span>
                <h1>Equipo no encontrado</h1>
                <p>El equipo que buscas no existe o ha sido eliminado.</p>
                <Link to="/equipos" className="detail-back-btn">← Volver a equipos</Link>
            </div>
        );
    }

    const { equipo: nombre, capitan, jugadores, escudo } = foundTeam;

    return (
        <>
            <div className="detail-hero">
                <div className="team-detail-glow"></div>
                <div className="detail-hero-content">
                    <Link to="/equipos" className="detail-breadcrumb">← Equipos</Link>

                    <div className="detail-hero-main">
                        <div className="detail-hero-info">
                            <h1 className="detail-hero-title">{nombre}</h1>
                            <div className="detail-hero-stats">
                                <div className="detail-stat">
                                    <span className="detail-stat-value">{jugadores.length}</span>
                                    <span className="detail-stat-label">Jugadores</span>
                                </div>
                                <div className="detail-stat">
                                    <span className="detail-stat-value">{capitan ?? "—"}</span>
                                    <span className="detail-stat-label">Capitán</span>
                                </div>
                            </div>
                        </div>

                        {escudo && (
                            <img
                                src={escudo}
                                alt={`Escudo de ${nombre}`}
                                className="detail-hero-escudo"
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="detail-body">
                <h2 className="detail-section-title">
                    <span>🏀</span> Plantilla
                </h2>
                <div className="players-grid">
                    {jugadores.map((jugador) => (
                        <div key={jugador.id} className="player-card">
                            <span className="player-number">#{jugador.numero}</span>
                            <span className="player-name">{jugador.jugador}</span>
                            {capitan === jugador.jugador && (
                                <span className="player-captain-badge">C</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default TeamDetail;