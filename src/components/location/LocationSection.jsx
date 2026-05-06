import LocationCard from "./LocationCard.jsx";
import DatesCard from "./DatesCard.jsx";
import ParkingBlock from "./ParkingBlock.jsx";
import RestaurantsBlock from "./RestaurantsBlock.jsx";
import { useReveal } from "../../hooks/useReveal.js";

function LocationSection() {
    const cardsRef = useReveal();
    const parkingRef = useReveal('-40px 0px');
    return (
        <section className="location-section">
            <div ref={cardsRef} className="location-cards reveal">
                <LocationCard />
                <DatesCard />
            </div>
            <div ref={parkingRef} className="reveal">
                <ParkingBlock />
            </div>
            <RestaurantsBlock />
        </section>
    );
}

export default LocationSection;