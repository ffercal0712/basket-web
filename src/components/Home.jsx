import Banner from "./Banner.jsx";
import LocationSection from "./Location/LocationSection.jsx";
import Organizers from "./Organizers/Organizers.jsx";
import HomeNextMatches from "./matches/HomeNextMatches.jsx";
import VideoSection from "./VideoSection.jsx";
import { partidoToDate, partidoYaJugado } from "../data/MatchData.jsx";
import { useMatches } from "../hooks/useMatches.js";
import NormativaSection from "./normativa/NormativaSection.jsx";

function Home() {
    const { matches } = useMatches();

    const sinResultado = [...matches]
        .filter(p => !partidoYaJugado(p))
        .sort((a, b) =>
            partidoToDate(a.fecha, a.hora) - partidoToDate(b.fecha, b.hora)
        );

    const ultimosJugados = [...matches]
        .filter(p => partidoYaJugado(p))
        .sort((a, b) =>
            partidoToDate(b.fecha, b.hora) - partidoToDate(a.fecha, a.hora)
        )
        .slice(0, 4);

    return (
        <>
            <Banner />
            <Organizers />
            <HomeNextMatches nextMatches={sinResultado} lastMatches={ultimosJugados} />
            <LocationSection />
            <NormativaSection />
            <VideoSection />
        </>
    );
}

export default Home;
