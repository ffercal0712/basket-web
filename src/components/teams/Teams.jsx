import equipos from "../../data/TeamData.jsx";
import TeamCard from "./TeamCard.jsx";
import { useReveal } from "../../hooks/useReveal.js";

function Teams() {
    const gridRef = useReveal('-40px 0px');
    return (
        <>
            <div className="page-header page-header--teams">
                <div className="page-header-decoration"></div>
                <p className="page-header-label">Participantes</p>
                <h1 className="page-header-title">Equipos</h1>
                <p className="page-header-subtitle">
                    <span className="page-header-count">{equipos.length}</span> equipos inscritos · 2º Torneo de Veteranos Fuengirola
                </p>
            </div>

            <div ref={gridRef} className="cards-grid cards-grid--teams stagger-grid">
                {equipos.map((equipo, index) => (
                    <TeamCard
                        key={equipo.id}
                        equipo={equipo}
                        accentColor={index % 2 === 0 ? "accent" : "soft"}
                    />
                ))}
            </div>
        </>
    );
}

export default Teams;