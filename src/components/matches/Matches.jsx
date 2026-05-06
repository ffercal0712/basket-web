import { estadoPartido, partidoToDate } from "../../data/MatchData.jsx";
import MatchCard from "./MatchCard.jsx";
import MatchesNext from "./MatchesNext.jsx";
import AdminResultsPanel from "./AdminResultsPanel.jsx";
import { useReveal } from "../../hooks/useReveal.js";
import { useMatches } from "../../hooks/useMatches.js";
import { useAdminSession } from "../../hooks/useAdminSession.js";

function Matches() {
    const {
        matches,
        saveResult,
        clearResult,
        isSaving,
        isLoading,
        syncError,
        isRemoteMode
    } = useMatches();
    const { adminPin, isAdminUnlocked, lockAdmin } = useAdminSession();
    const sinResultado = [...matches]
        .filter(p => {
            const estado = estadoPartido(p);
            return estado === "proximo" || estado === "en-juego";
        })
        .sort((a, b) =>
            partidoToDate(a.fecha, a.hora) - partidoToDate(b.fecha, b.hora)
        );

    const finalizados = [...matches]
        .filter(p => estadoPartido(p) === "finalizado")
        .sort((a, b) =>
            partidoToDate(b.fecha, b.hora) - partidoToDate(a.fecha, a.hora)
        );

    const resultsGridRef = useReveal('-40px 0px');

    async function handleSaveResult(matchId, homeScore, awayScore) {
        const result = await saveResult(matchId, homeScore, awayScore, adminPin);

        if (!result?.ok && result?.error?.toLowerCase().includes('pin')) {
            lockAdmin();
        }

        return result;
    }

    async function handleClearResult(matchId) {
        const result = await clearResult(matchId, adminPin);

        if (!result?.ok && result?.error?.toLowerCase().includes('pin')) {
            lockAdmin();
        }

        return result;
    }

    return (
        <>
            <div className="page-header">
                <p className="page-header-label">Torneo</p>
                <h1 className="page-header-title">Partidos</h1>
                <p className="page-header-subtitle">
                    16 y 17 de mayo · Pabellón Elola, Fuengirola
                </p>
            </div>

            {isAdminUnlocked && isRemoteMode && (
                <AdminResultsPanel
                    matches={finalizados}
                    onSaveResult={handleSaveResult}
                    onClearResult={handleClearResult}
                    onLogout={lockAdmin}
                    isSaving={isSaving}
                    isLoading={isLoading}
                    syncError={syncError}
                />
            )}

            <MatchesNext nextMatches={sinResultado} />

            {finalizados.length > 0 && (
                <section className="matches-section">
                    <h2 className="matches-section-title">
                        <span className="matches-section-dot matches-section-dot--played"></span>
                        Partidos finalizados
                    </h2>
                    <div ref={resultsGridRef} className="cards-grid stagger-grid">
                        {finalizados.map((partido) => (
                            <MatchCard key={partido.id} partido={partido} />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}

export default Matches;
