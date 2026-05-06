/**
 * Logo individual de un organizador del torneo.
 *
 * @param {string} src - Ruta de la imagen del logo.
 * @param {string} alt - Texto alternativo del logo.
 * @param {string} [href] - Enlace opcional al sitio web del organizador.
 * @returns {React.JSX.Element}
 */
function OrganizerLogo({ src, alt, href }) {
    const logo = <img src={src} alt={alt} className="organizer-logo" />;

    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className="organizer-link">
                {logo}
            </a>
        );
    }

    return logo;
}

export default OrganizerLogo;