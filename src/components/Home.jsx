import Banner from "./Banner.jsx";
import LocationSection from "./Location/LocationSection.jsx";
import Organizers from "./Organizers/Organizers.jsx";
import HomeNextMatches from "./matches/HomeNextMatches.jsx";
import NormativaSection from "./normativa/NormativaSection.jsx";
import partidos, { partidoToDate, partidoYaJugado } from "../data/MatchData.jsx";

function Home() {
    const sinResultado = [...partidos]
        .filter(p => !partidoYaJugado(p))
        .sort((a, b) =>
            partidoToDate(a.fecha, a.hora) - partidoToDate(b.fecha, b.hora)
        );

    return (
        <>
            <Banner />
            <Organizers />
            <HomeNextMatches nextMatches={sinResultado} />
            <LocationSection />
            <NormativaSection />
        </>
    );
}

export default Home;