function TeamCard({ equipo, accentColor = 'accent' }) {
    const { equipo: nombre, escudo, logoVariant } = equipo;

    return (
        <article className="team-card">
            <div className={`team-card-accent team-card-accent--top team-card-accent--${accentColor}`}></div>

            <div className="team-card-header">
                <h2 className="team-card-name">{nombre}</h2>
                {escudo && (
                    <span className={`team-card-shield-frame ${logoVariant === 'wide' ? 'team-card-shield-frame--wide' : ''}`}>
                        <img
                            src={escudo}
                            alt={`Escudo ${nombre}`}
                            className={`team-card-shield ${logoVariant === 'wide' ? 'team-card-shield--wide' : ''}`}
                        />
                    </span>
                )}
            </div>

            <div className="team-card-info">
                <span className="team-card-stat">
                    <span className="team-card-stat-value">Confirmado</span>
                    <span className="team-card-stat-label">equipo inscrito</span>
                </span>
            </div>
        </article>
    );
}

export default TeamCard;
