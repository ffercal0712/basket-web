import { useParams, Link } from 'react-router-dom';
import equipos from '../../data/TeamData.jsx';

function TeamDetail() {
    const { equipo } = useParams();
    const tSlug = equipo;
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

    const { equipo: nombre } = foundTeam;

    return (
        <>
            <div className="detail-hero team-detail-hero">
                <div className="team-detail-glow"></div>
                <div className="detail-hero-content">
                    <Link to="/equipos" className="detail-breadcrumb">← Equipos</Link>

                    <div className="detail-hero-main detail-hero-main--simple">
                        <div className="detail-hero-info">
                            <h1 className="detail-hero-title">{nombre}</h1>
                            <p className="detail-hero-copy">
                                La web pública solo muestra los equipos inscritos y los horarios oficiales del torneo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="detail-body">
                <div className="detail-message-card">
                    <h2 className="detail-section-title">Información del equipo</h2>
                    <p className="detail-message-text">
                        La plantilla de jugadores y otros datos internos no se publican en esta versión.
                    </p>
                </div>
            </div>
        </>
    );
}

export default TeamDetail;
