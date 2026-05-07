import { estadoPartido, partidoToDate } from "../../data/MatchData.jsx";
import MatchCard from "./MatchCard.jsx";
import MatchesNext from "./MatchesNext.jsx";
import { useReveal } from "../../hooks/useReveal.js";
import { useMatches } from "../../hooks/useMatches.js";
import { useAdminSession } from "../../hooks/useAdminSession.js";

function Matches() {
    const {
        matches,
        clearResult,
        updateMatch,
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

    async function handleClearResult(matchId) {
        const result = await clearResult(matchId, adminPin);

        if (!result?.ok && result?.error?.toLowerCase().includes('pin')) {
            lockAdmin();
        }

        return result;
    }

    async function handleUpdateMatch(payload) {
        const result = await updateMatch(payload, adminPin);

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

            {syncError && (
                <p className="admin-results-error admin-results-error--page">{syncError}</p>
            )}

            <MatchesNext
                nextMatches={sinResultado}
                adminMode={isAdminUnlocked && isRemoteMode}
                onAdminSave={handleUpdateMatch}
                onAdminClearResult={handleClearResult}
                isSaving={isSaving || isLoading}
            />

            {finalizados.length > 0 && (
                <section className="matches-section">
                    <h2 className="matches-section-title">
                        <span className="matches-section-dot matches-section-dot--played"></span>
                        Partidos finalizados
                    </h2>
                    <div ref={resultsGridRef} className="cards-grid stagger-grid">
                        {finalizados.map((partido) => (
                            <MatchCard
                                key={partido.id}
                                partido={partido}
                                adminMode={isAdminUnlocked && isRemoteMode}
                                onAdminSave={handleUpdateMatch}
                                onAdminClearResult={handleClearResult}
                                isSaving={isSaving || isLoading}
                            />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}

export default Matches;
