/**
 * Tarjeta genérica con imagen de fondo, overlay y contenido.
 * Sirve como base reutilizable para tarjetas de información destacada.
 *
 * @param {string} imageClassName - Clase de la imagen de fondo (ej: "location-card-image")
 * @param {string} imageHref - Enlace opcional para hacer clic sobre la imagen
 * @param {string} imageLinkLabel - Texto accesible del enlace de la imagen
 * @param {string} label - Etiqueta superior pequeña (ej: "¿Dónde?")
 * @param {string} title - Título principal
 * @param {React.ReactNode} children - Contenido adicional (texto, badges, botones, etc.)
 * @returns {React.JSX.Element}
 */
function InfoCard({ imageClassName, imageHref, imageLinkLabel, label, title, children }) {
    const contentClassName = imageHref
        ? 'info-card-content info-card-content--with-media-link'
        : 'info-card-content';

    const media = (
        <>
            <div className={`info-card-image ${imageClassName}`}></div>
            <div className="info-card-overlay"></div>
        </>
    );

    return (
        <div className="info-card">
            {imageHref ? (
                <a
                    className="info-card-media-link"
                    href={imageHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={imageLinkLabel ?? title}
                >
                    {media}
                </a>
            ) : (
                media
            )}
            <div className={contentClassName}>
                <span className="info-card-label">{label}</span>
                <h2 className="info-card-title">{title}</h2>
                {children}
            </div>
        </div>
    );
}

export default InfoCard;
