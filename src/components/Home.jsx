import Banner from "./Banner.jsx";
import LocationSection from "./Location/LocationSection.jsx";
import Organizers from "./Organizers/Organizers.jsx";
import HomeNextMatches from "./matches/HomeNextMatches.jsx";
import HomeTopTeams from "./HomeTopTeams.jsx";
import VideoSection from "./VideoSection.jsx";
import { partidoToDate, partidoYaJugado, partidoTieneResultado } from "../data/MatchData.jsx";
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

    const topTeams = (() => {
        const totals = {};
        matches
            .filter(p => partidoYaJugado(p) && partidoTieneResultado(p))
            .forEach(p => {
                p.equipos.forEach(e => {
                    if (!e.placeholder && Number.isFinite(e.puntuacion)) {
                        if (!totals[e.id]) totals[e.id] = { equipo: e, points: 0 };
                        totals[e.id].points += e.puntuacion;
                    }
                });
            });
        return Object.values(totals)
            .sort((a, b) => b.points - a.points)
            .slice(0, 3);
    })();

    const showTopTeams = sinResultado.length === 0 && topTeams.length > 0;

    return (
        <>
            <Banner />
            <Organizers />
            {showTopTeams && <HomeTopTeams topTeams={topTeams} />}
            <HomeNextMatches nextMatches={sinResultado} lastMatches={ultimosJugados} />
            <LocationSection />
            <NormativaSection />
            <VideoSection />
        </>
    );
}

export default Home;
