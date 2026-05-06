import InfoCard from "./InfoCard.jsx";
import DateBadge from "./DateBadge.jsx";

/**
 * Tarjeta de fechas del torneo.
 * Muestra los días en los que se celebra y badges visuales.
 *
 * @returns {React.JSX.Element}
 */
function DatesCard() {
    return (
        <InfoCard
            imageClassName="dates-card-image"
            label="¿Cuándo?"
            title="16 y 17 de mayo"
        >
            <p className="info-card-text">
                Sábado y Domingo<br />
                Dos días de torneo
            </p>

            <div className="dates-badges">
                <DateBadge day={16} month="MAY" />
                <DateBadge day={17} month="MAY" />
            </div>
        </InfoCard>
    );
}

export default DatesCard;