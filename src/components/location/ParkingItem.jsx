/**
 * Item individual de la lista de parkings cercanos.
 *
 * @param {string} icon - Emoji o icono a mostrar a la izquierda
 * @param {string} name - Nombre del parking (en negrita)
 * @param {string} info - Texto secundario (dirección, horario, etc.)
 * @param {string} distance - Distancia hasta el pabellón
 * @param link - Enlace a Google Maps de la localización del parking
 * @returns {React.JSX.Element}
 */
function ParkingItem({ icon, name, info, distance, link = null }) {
    const inner = (
        <>
            <div className="parking-item-icon">{icon}</div>
            <div className="parking-item-text">
                <strong>{name}</strong>
                <span>{info}</span>
                <span className="parking-distance">{distance}</span>
                {link && <span className="parking-item-cta">Ver en Maps →</span>}
            </div>
        </>
    );

    return (
        <li className="parking-item">
            {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer" className="parking-item-link">
                    {inner}
                </a>
            ) : (
                <div className="parking-item-inner">{inner}</div>
            )}
        </li>
    );
}

export default ParkingItem;