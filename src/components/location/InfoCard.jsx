/**
 * Tarjeta genérica con imagen de fondo, overlay y contenido.
 * Sirve como base reutilizable para tarjetas de información destacada.
 *
 * @param {string} imageClassName - Clase de la imagen de fondo (ej: "location-card-image")
 * @param {string} label - Etiqueta superior pequeña (ej: "¿Dónde?")
 * @param {string} title - Título principal
 * @param {React.ReactNode} children - Contenido adicional (texto, badges, botones, etc.)
 * @returns {React.JSX.Element}
 */
function InfoCard({ imageClassName, label, title, children }) {
    return (
        <div className="info-card">
            <div className={`info-card-image ${imageClassName}`}></div>
            <div className="info-card-overlay"></div>
            <div className="info-card-content">
                <span className="info-card-label">{label}</span>
                <h2 className="info-card-title">{title}</h2>
                {children}
            </div>
        </div>
    );
}

export default InfoCard;