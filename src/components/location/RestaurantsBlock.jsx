import { useReveal } from "../../hooks/useReveal.js";

const restaurants = [
    {
        id: 1,
        name: "El Repipi",
        type: "Marisquería · Pescados",
        description: "Marisquería muy popular en Fuengirola, conocida por su marisco fresco y precio justo.",
        distance: "~5 min a pie",
        icon: "🦞",
        mapsUrl: "https://maps.app.goo.gl/4TiGQtQAjNqL7NMx7",
    },
    {
        id: 2,
        name: "Freiduría El Choco",
        type: "Freiduría · Pulpería",
        description: "Referente de Los Boliches: pescado frito del día y pulpo a la gallega en ambiente informal.",
        distance: "~8 min a pie",
        icon: "🐙",
        mapsUrl: "https://maps.app.goo.gl/H3CBF4sqry9QQDdL6",
    },
    {
        id: 3,
        name: "Casa Los Manueles",
        type: "Cocina Tradicional · Tapas",
        description: "Restaurante - Bar de toda la vida con tapas generosas, menú del día y ambiente muy local.",
        distance: "~6 min a pie",
        icon: "🍽️",
        mapsUrl: "https://maps.app.goo.gl/sMPyaWX2Pu9Xm9gf7",
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
