import Banner from "./Banner.jsx";
import LocationSection from "./Location/LocationSection.jsx";
import Organizers from "./Organizers/Organizers.jsx";
import HomeNextMatches from "./matches/HomeNextMatches.jsx";
import { partidoToDate, partidoYaJugado } from "../data/MatchData.jsx";
import { useMatches } from "../hooks/useMatches.js";

function Home() {
    const { matches } = useMatches();

    const sinResultado = [...matches]
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
        </>
    );
}

export default Home;
