import InfoCard from "./InfoCard.jsx";

export const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Pabell%C3%B3n+Elola+Fuengirola";

/**
 * Tarjeta de ubicación del torneo.
 * Muestra el lugar, dirección y enlace a Google Maps.
 *
 * @returns {React.JSX.Element}
 */
function LocationCard() {
    return (
        <InfoCard
            imageClassName="location-card-image"
            label="¿Dónde?"
            title="Pabellón Elola"
        >
            <p className="info-card-text">
                Calle Miguel Bueno, 9<br />
                29640 Fuengirola, Málaga
            </p>

            <a
                className="info-card-cta"
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
            >
                Ver en Google Maps →
            </a>
        </InfoCard>
    );
}

export default LocationCard;
