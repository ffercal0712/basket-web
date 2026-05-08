function ReglaCard({ regla }) {
    return (
        <div className="normativa-card">
            <div className="normativa-card-icon">{regla.icon}</div>
            <h3 className="normativa-card-title">{regla.titulo}</h3>
            <ul className="normativa-card-list">
                {regla.puntos.map((p, i) => (
                    <li key={i}>{p}</li>
                ))}
            </ul>
        </div>
    );
}

export default ReglaCard;
