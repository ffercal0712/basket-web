/**
 * Badge visual con un día y mes destacado.
 *
 * @param {string|number} day - Día del mes (ej: 16)
 * @param {string} month - Mes abreviado (ej: "MAY")
 * @returns {React.JSX.Element}
 */
function DateBadge({ day, month }) {
    return (
        <span className="date-badge">
            <span className="date-badge-day">{day}</span>
            <span className="date-badge-month">{month}</span>
        </span>
    );
}

export default DateBadge;