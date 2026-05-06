import { useReveal } from "../../hooks/useReveal.js";

const restaurants = [
    {
        id: 1,
        name: "La Caracola",
        type: "Mariscos y Pescados",
        description: "Clásico de Fuengirola con fresquísimo marisco y una terraza frente al paseo marítimo.",
        distance: "~8 min a pie",
        icon: "🦞",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=La+Caracola+Fuengirola",
    },
    {
        id: 2,
        name: "Malpica",
        type: "Asador · Carnes y Pescados",
        description: "Parrilla de leña reconocida en la zona, ideal para reponer fuerzas tras los partidos.",
        distance: "~10 min a pie",
        icon: "🔥",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=Restaurante+Malpica+Fuengirola",
    },
    {
        id: 3,
        name: "Casa Manolo",
        type: "Cocina Tradicional · Tapas",
        description: "Bar de toda la vida con tapas generosas, menú del día y ambiente muy local.",
        distance: "~6 min a pie",
        icon: "🍽️",
        mapsUrl: "https://www.google.com/maps/search/?api=1&query=Casa+Manolo+Fuengirola",
    },
];

function RestaurantCard({ restaurant }) {
    return (
        <a
            className="restaurant-card"
            href={restaurant.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver ${restaurant.name} en Google Maps`}
        >
            <div className="match-card-corner match-card-corner--top match-card-corner--white" />
            <div className="match-card-corner match-card-corner--bottom match-card-corner--white" />
            <span className="restaurant-card-icon">{restaurant.icon}</span>
            <div className="restaurant-card-body">
                <p className="restaurant-card-type">{restaurant.type}</p>
                <h3 className="restaurant-card-name">{restaurant.name}</h3>
                <p className="restaurant-card-desc">{restaurant.description}</p>
            </div>
            <div className="restaurant-card-footer">
                <span className="restaurant-card-distance">📍 {restaurant.distance}</span>
                <span className="restaurant-card-cta">Ver en Maps →</span>
            </div>
        </a>
    );
}

function RestaurantsBlock() {
    const ref = useReveal('-40px 0px');
    return (
        <div className="restaurants-wrapper">
            <h2 className="restaurants-title">
                <span className="restaurants-title-icon">🍴</span>
                Dónde comer cerca
            </h2>
            <div ref={ref} className="restaurants-grid stagger-grid">
                {restaurants.map(r => (
                    <RestaurantCard key={r.id} restaurant={r} />
                ))}
            </div>
        </div>
    );
}

export default RestaurantsBlock;
