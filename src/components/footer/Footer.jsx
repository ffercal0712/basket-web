import { Link } from "react-router-dom";
import { LuGlobe } from "react-icons/lu";
import { SiInstagram, SiFacebook, SiX } from "react-icons/si";
import {FaLinkedin} from "react-icons/fa";

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

                        <div className="footer-social-group">
                            <p className="footer-social-label">OKSAP</p>
                            <div className="footer-social-icons">
                                <a href="https://oksap.es" target="_blank" rel="noopener noreferrer" aria-label="Web de OKSAP">
                                    <LuGlobe />
                                </a>
                                <a href="https://www.instagram.com/oksap.spain/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de OKSAP">
                                    <SiInstagram />
                                </a>
                                <a href="https://www.linkedin.com/company/oksap-spain" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de OKSAP">
                                    <FaLinkedin />
                                </a>
                            </div>
                        </div>

                        <div className="footer-social-group">
                            <p className="footer-social-label">Ayuntamiento de Fuengirola</p>
                            <div className="footer-social-icons">
                                <a href="https://www.fuengirola.es" target="_blank" rel="noopener noreferrer" aria-label="Web del Ayuntamiento de Fuengirola">
                                    <LuGlobe />
                                </a>
                                <a href="https://www.instagram.com/aytofuengirola/" target="_blank" rel="noopener noreferrer" aria-label="Instagram del Ayuntamiento de Fuengirola">
                                    <SiInstagram />
                                </a>
                                <a href="https://www.facebook.com/ayuntamientofuengirola" target="_blank" rel="noopener noreferrer" aria-label="Facebook del Ayuntamiento de Fuengirola">
                                    <SiFacebook />
                                </a>
                                <a href="https://twitter.com/fuengirola" target="_blank" rel="noopener noreferrer" aria-label="Twitter del Ayuntamiento de Fuengirola">
                                    <SiX />
                                </a>
                            </div>
                        </div>

                        <div className="footer-social-group">
                            <p className="footer-social-label">Torneo</p>
                            <div className="footer-social-icons">
                                <a href="https://www.instagram.com/2_torneo_veteranos_fuengirola/" target="_blank" rel="noopener noreferrer" aria-label="Publicación del torneo en Instagram">
                                    <SiInstagram />
                                </a>
                            </div>
                        </div>
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