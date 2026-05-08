import { useState } from 'react';
import AdminResultCard from './AdminResultCard.jsx';

function getDefaultDraft(match) {
    return {
        homeScore: Number.isFinite(match.equipos[0].puntuacion) ? String(match.equipos[0].puntuacion) : '',
        awayScore: Number.isFinite(match.equipos[1].puntuacion) ? String(match.equipos[1].puntuacion) : ''
    };
}

function AdminResultsPanel({
    matches,
    onSaveResult,
    onClearResult,
    isSaving,
    isLoading,
    syncError,
    onLogout
}) {
    const [drafts, setDrafts] = useState({});
    const [panelMessage, setPanelMessage] = useState('');

    function updateDraft(matchId, field, value) {
        if (value !== '' && !/^\d+$/.test(value)) {
            return;
        }

        setDrafts((currentDrafts) => ({
            ...currentDrafts,
            [matchId]: {
                ...(currentDrafts[matchId] ?? {}),
                [field]: value
            }
        }));
    }

    async function handleSave(matchId) {
        const draft = drafts[matchId];
        if (!draft || draft.homeScore === '' || draft.awayScore === '') {
            return;
        }

        const result = await onSaveResult(matchId, Number(draft.homeScore), Number(draft.awayScore));
        setPanelMessage(result?.ok ? 'Resultado guardado correctamente.' : result?.error ?? 'No se ha podido guardar el resultado.');
        if (result?.ok) {
            setDrafts((currentDrafts) => {
                const nextDrafts = { ...currentDrafts };
                delete nextDrafts[matchId];
                return nextDrafts;
            });
        }
    }

    async function handleClear(matchId) {
        setDrafts((currentDrafts) => ({
            ...currentDrafts,
            [matchId]: {
                homeScore: '',
                awayScore: ''
            }
        }));
        const result = await onClearResult(matchId);
        setPanelMessage(result?.ok ? 'Resultado eliminado.' : result?.error ?? 'No se ha podido limpiar el resultado.');
    }

    return (
        <section className="admin-results-panel">
            <div className="admin-results-panel-header">
                <div>
                    <p className="admin-results-panel-label">Admin</p>
                    <h2 className="admin-results-panel-title">Cargar resultados</h2>
                    <p className="admin-results-panel-copy">
                        Este panel guarda resultados compartidos para que se vean en cualquier dispositivo.
                    </p>
                </div>

                <button
                    type="button"
                    className="admin-result-action admin-result-action--secondary"
                    onClick={onLogout}
                >
                    Cerrar sesión admin
                </button>
            </div>

            <div className="admin-results-list">
                {isLoading && (
                    <p className="admin-results-empty">Conectando con los resultados compartidos...</p>
                )}

                {syncError && (
                    <p className="admin-results-error">{syncError}</p>
                )}

                {panelMessage && (
                    <p className="admin-results-message">{panelMessage}</p>
                )}

                {matches.length === 0 ? (
                    <p className="admin-results-empty">
                        El panel se activará cuando haya partidos terminados.
                    </p>
                ) : (
                    matches.map((match) => (
                        <AdminResultCard
                            key={match.id}
                            match={match}
                            draft={drafts[match.id] ?? getDefaultDraft(match)}
                            updateDraft={updateDraft}
                            onSave={handleSave}
                            onClear={handleClear}
                            isSaving={isSaving}
                        />
                    ))
                )}
            </div>
        </section>
    );
}

export default AdminResultsPanel;
