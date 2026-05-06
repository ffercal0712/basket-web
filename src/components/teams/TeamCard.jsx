function TeamCard({ equipo, accentColor = 'accent' }) {
    const { equipo: nombre, escudo } = equipo;

    return (
        <article className="team-card">
            <div className={`team-card-accent team-card-accent--top team-card-accent--${accentColor}`}></div>

            <div className="team-card-header">
                <h2 className="team-card-name">{nombre}</h2>
                {escudo && (
                    <img
                        src={escudo}
                        alt={`Escudo ${nombre}`}
                        className="team-card-shield"
                    />
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
