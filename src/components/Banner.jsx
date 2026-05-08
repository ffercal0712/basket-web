import cabecera from "../assets/cabecera2.png";

function Banner() {
    return (
        <section className="banner">
            {/* Capa 1 (fondo): cancha en azul hielo */}
            <svg className="banner-court" viewBox="0 0 280 400" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="276" height="396" stroke="currentColor" strokeWidth="2"/>
                <line x1="2" y1="200" x2="278" y2="200" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="140" cy="200" r="40" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="26" y1="398" x2="26" y2="318" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="254" y1="398" x2="254" y2="318" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M 26 318 A 123 123 0 0 0 254 318" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <rect x="96" y="238" width="88" height="160" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M 96 238 A 44 44 0 0 0 184 238" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M 96 238 A 44 44 0 0 1 184 238" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 4" fill="none"/>
                <circle cx="140" cy="363" r="9" stroke="currentColor" strokeWidth="2"/>
                <path d="M 119 363 A 21 21 0 0 0 161 363" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>

            <img src={cabecera} alt="" className="banner-cabecera" aria-hidden="true" />

            {/* Capa 3 (frente): título */}
            <div className="banner-content">
                <h1 className="banner-title">
                    <span className="banner-title-sub">Veteranos Basket 2026</span>
                    2º Torneo<br />
                    <span className="banner-title-glow">OKSAP</span>
                </h1>
            </div>
        </section>
    );
}

export default Banner;
