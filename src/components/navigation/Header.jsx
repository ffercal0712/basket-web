import { useEffect, useState } from "react";
import NavMenu from "./NavMenu.jsx";
import NavItem from "./NavItem.jsx";

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const PX_BEFORE_VISIBLE = 20;

    useEffect(() => {
        function handleScroll() {
            setScrolled(window.scrollY > PX_BEFORE_VISIBLE);
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Cierra el menú al hacer clic fuera del drawer (pero no dentro de él)
    useEffect(() => {
        if (!menuOpen) return;
        function handleOutsideClick(e) {
            if (
                !e.target.closest(".nav-wrapper") &&
                !e.target.closest(".menu-toggle")
            ) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, [menuOpen]);

    const close = () => setMenuOpen(false);

    return (
        <header className={`header${scrolled ? " header-scrolled" : ""}`}>

            <button
                className="menu-toggle"
                onClick={() => setMenuOpen(o => !o)}
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
            >
                {menuOpen ? "✕" : "☰"}
            </button>

            <div className={`nav-wrapper${menuOpen ? " nav-open" : ""}`}>
                <button className="menu-close" onClick={close} aria-label="Cerrar menú">
                    ✕
                </button>
                <NavMenu>
                    <NavItem link="/"          title="INICIO"   onClose={close} />
                    <NavItem link="/equipos"   title="EQUIPOS"  onClose={close} />
                    <NavItem link="/partidos"  title="PARTIDOS" onClose={close} />
                </NavMenu>
            </div>

        </header>
    );
}

export default Header;
