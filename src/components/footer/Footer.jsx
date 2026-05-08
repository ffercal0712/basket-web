import { Link } from "react-router-dom";
import { LuGlobe } from "react-icons/lu";
import { SiInstagram, SiFacebook, SiX } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import FooterSocialGroup from "./FooterSocialGroup.jsx";

const SOCIAL_GROUPS = [
    {
        label: "OKSAP",
        links: [
            { href: "https://oksap.es", label: "Web de OKSAP", icon: <LuGlobe /> },
            { href: "https://www.instagram.com/oksap.spain/", label: "Instagram de OKSAP", icon: <SiInstagram /> },
            { href: "https://www.linkedin.com/company/oksap-spain", label: "LinkedIn de OKSAP", icon: <FaLinkedin /> },
        ],
    },
    {
        label: "Ayuntamiento de Fuengirola",
        links: [
            { href: "https://www.fuengirola.es", label: "Web del Ayuntamiento de Fuengirola", icon: <LuGlobe /> },
            { href: "https://www.instagram.com/aytofuengirola/", label: "Instagram del Ayuntamiento de Fuengirola", icon: <SiInstagram /> },
            { href: "https://www.facebook.com/ayuntamientofuengirola", label: "Facebook del Ayuntamiento de Fuengirola", icon: <SiFacebook /> },
            { href: "https://twitter.com/fuengirola", label: "Twitter del Ayuntamiento de Fuengirola", icon: <SiX /> },
        ],
    },
    {
        label: "Torneo",
        links: [
            { href: "https://www.instagram.com/2_torneo_veteranos_fuengirola/", label: "Publicación del torneo en Instagram", icon: <SiInstagram /> },
        ],
    },
];

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-columns">
                    <div className="footer-column">
                        <h3 className="footer-column-title">Navegación</h3>
                        <ul className="footer-links">
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/equipos">Equipos</Link></li>
                            <li><Link to="/partidos">Partidos</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3 className="footer-column-title">Síguenos</h3>
                        {SOCIAL_GROUPS.map((group) => (
                            <FooterSocialGroup key={group.label} label={group.label} links={group.links} />
                        ))}
                    </div>

                    <div className="footer-column">
                        <h3 className="footer-column-title">Información legal</h3>
                        <ul className="footer-links">
                            <li><Link to="/aviso-legal">Aviso legal</Link></li>
                            <li><Link to="/privacidad">Política de privacidad</Link></li>
                        </ul>
                        <p className="footer-disclaimer">
                            Esta web no recoge datos personales ni usa cookies de terceros.
                        </p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        © 2026 <a href="https://oksap.es" target="_blank" rel="noopener noreferrer">OKSAP</a> · Organizado en colaboración con el <a href="https://www.fuengirola.es" target="_blank" rel="noopener noreferrer">Ayuntamiento de Fuengirola</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
