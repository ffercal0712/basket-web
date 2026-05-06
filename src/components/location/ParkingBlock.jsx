import ParkingItem from "./ParkingItem.jsx";
import { GOOGLE_MAPS_URL } from "./LocationCard.jsx";

/**
 * Bloque que muestra una imagen del entorno del pabellón y un listado
 * de los parkings más cercanos superpuesto a la derecha.
 *
 * @returns {React.JSX.Element}
 */
function ParkingBlock() {
    return (
        <div className="parking-block">
            <a
                className="parking-image-link"
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir el Pabellón Elola en Google Maps"
            >
                <div className="parking-image"></div>
            </a>

            <aside className="parking-list">
                <h3 className="parking-title">
                    <span className="parking-icon">🅿️</span>
                    Parkings cercanos
                </h3>

                <ul className="parking-items">
                    <ParkingItem
                        icon="🚗"
                        name="Parking Elola Iberpark"
                        info="C. Menorca, S/N · Cubierto, 24h"
                        distance="A 100 m del pabellón"
                        link="https://maps.app.goo.gl/crmsw8gWCGQN3UMR6"
                    />
                    <ParkingItem
                        icon="🅿️"
                        name="Parking Municipal Elola"
                        info="C. Mallorca, 14 · Acceso fácil"
                        distance="A 150 m del pabellón"
                        link="https://maps.app.goo.gl/5K9NzGQmFuengirolaElola"
                    />
                    <ParkingItem
                        icon="🚙"
                        name="Aparcamiento en superficie"
                        info="Calles colindantes · Gratuito"
                        distance="Disponibilidad limitada"
                    />
                </ul>
            </aside>
        </div>
    );
}

export default ParkingBlock;
