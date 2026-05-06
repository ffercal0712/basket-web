import OrganizerLogo from "./OrganizerLogo.jsx";
import oksapLogo from "../../assets/logo-oksap.png";
import ayuntamientoLogo from "../../assets/logo-ayuntamiento.png";

function Organizers() {
    return (
        <section className="organizers">
            <p className="organizers-label">Organizado por</p>
            <div className="organizers-logos">
                <div className="anim-from-left">
                    <OrganizerLogo
                        src={oksapLogo}
                        alt="OKSAP"
                        href="https://oksap.es"
                    />
                </div>
                <div className="anim-from-right">
                    <OrganizerLogo
                        src={ayuntamientoLogo}
                        alt="Ayuntamiento de Fuengirola"
                        href="https://www.fuengirola.es"
                    />
                </div>
            </div>
        </section>
    );
}

export default Organizers;
