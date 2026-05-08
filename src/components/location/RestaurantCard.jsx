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

export default RestaurantCard;
