import { useState, useEffect } from 'react';
import { SiInstagram, SiFacebook } from 'react-icons/si';

const INSTAGRAM_URL = 'https://www.instagram.com/torneooksap_veteranosbasket/';
const FACEBOOK_URL = 'https://fb.me/e/4wmS10aWF';
const STORAGE_KEY = 'social-popup-shown';

function SocialPopup() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem(STORAGE_KEY)) {
            const timer = setTimeout(() => setVisible(true), 800);
            return () => clearTimeout(timer);
        }
    }, []);

    function close() {
        setVisible(false);
        sessionStorage.setItem(STORAGE_KEY, '1');
    }

    if (!visible) return null;

    return (
        <div className="social-popup-backdrop" onClick={close}>
            <div
                className="social-popup"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="Síguenos en redes sociales"
            >
                <button className="social-popup-close" onClick={close} aria-label="Cerrar">
                    ✕
                </button>

                <p className="social-popup-label">2º Torneo OKSAP</p>
                <h2 className="social-popup-title">¡Síguenos!</h2>
                <p className="social-popup-subtitle">Mantente al día con todas las novedades del torneo</p>

                <div className="social-popup-buttons">
                    <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-popup-btn social-popup-btn--instagram"
                        aria-label="Seguir en Instagram"
                    >
                        <SiInstagram className="social-popup-btn-icon" />
                        <span>Instagram</span>
                    </a>
                    <a
                        href={FACEBOOK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-popup-btn social-popup-btn--facebook"
                        aria-label="Seguir en Facebook"
                    >
                        <SiFacebook className="social-popup-btn-icon" />
                        <span>Facebook</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default SocialPopup;
