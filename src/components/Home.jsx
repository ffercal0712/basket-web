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

    // Puntos totales de cada equipo en todos los partidos con resultado
    const totals = (() => {
        const t = {};
        matches
            .filter(p => partidoYaJugado(p) && partidoTieneResultado(p))
            .forEach(p => {
                p.equipos.forEach(e => {
                    if (!e.placeholder && Number.isFinite(e.puntuacion)) {
                        if (!t[e.id]) t[e.id] = { equipo: e, points: 0 };
                        t[e.id].points += e.puntuacion;
                    }
                });
            });
        return t;
    })();

    // Ranking por ganadores de partidos del domingo
    const topTeamsByResult = (() => {
        // Los últimos 4 partidos ordenados cronológicamente:
        // índice 0 → 7º/8º, 1 → 5º/6º, 2 → 3º/4º, 3 → 1º/2º (la final)
        const partidosDomingo = [...matches]
            .sort((a, b) => partidoToDate(a.fecha, a.hora) - partidoToDate(b.fecha, b.hora))
            .slice(-4);

        const ranked = new Array(8).fill(null);
        partidosDomingo.forEach((partido, i) => {
            const posGanador = (3 - i) * 2;
            const posPerdedor = posGanador + 1;

            if (partidoTieneResultado(partido) && partido.equipos.every(e => !e.placeholder)) {
                const [e1, e2] = partido.equipos;
                const ganador = e1.puntuacion >= e2.puntuacion ? e1 : e2;
                const perdedor = e1.puntuacion >= e2.puntuacion ? e2 : e1;
                if (totals[ganador.id]) ranked[posGanador] = totals[ganador.id];
                if (totals[perdedor.id]) ranked[posPerdedor] = totals[perdedor.id];
            }
        });

        const clasificados = new Set(ranked.filter(Boolean).map(r => r.equipo.id));
        const sinClasificar = Object.values(totals)
            .filter(t => !clasificados.has(t.equipo.id))
            .sort((a, b) => b.points - a.points);
        let si = 0;
        return ranked.map(slot => slot ?? sinClasificar[si++]).filter(Boolean);
    })();

    // Ranking por puntos totales
    const topTeamsByPoints = Object.values(totals).sort((a, b) => b.points - a.points);

    const showTopTeams = sinResultado.length === 0 && topTeamsByResult.length > 0;

    return (
        <>
            <Banner />
            <Organizers />
            {showTopTeams && (
                <HomeTopTeams
                    topTeamsByResult={topTeamsByResult}
                    topTeamsByPoints={topTeamsByPoints}
                />
            )}
            <HomeNextMatches nextMatches={sinResultado} lastMatches={ultimosJugados} />
            <LocationSection />
            <NormativaSection />
            <VideoSection />
        </>
    );
}

export default Home;
