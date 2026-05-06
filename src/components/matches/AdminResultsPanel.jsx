import { useState } from 'react';
import { formatearFechaCorta } from '../../data/MatchData.jsx';

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
                    matches.map((match) => {
                        const draft = drafts[match.id] ?? getDefaultDraft(match);
                        const hasSavedResult = Number.isFinite(match.equipos[0].puntuacion) && Number.isFinite(match.equipos[1].puntuacion);

                        return (
                            <article key={match.id} className="admin-result-card">
                                <div className="admin-result-card-meta">
                                    <span>{formatearFechaCorta(match.fecha)}</span>
                                    <span>·</span>
                                    <span>{match.hora}</span>
                                    {match.titulo && (
                                        <>
                                            <span>·</span>
                                            <span>{match.titulo}</span>
                                        </>
                                    )}
                                </div>

                                <div className="admin-result-card-grid">
                                    <label className="admin-score-field">
                                        <span className="admin-score-label">{match.equipos[0].equipo}</span>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            className="admin-score-input"
                                            value={draft.homeScore}
                                            onChange={(event) => updateDraft(match.id, 'homeScore', event.target.value)}
                                            placeholder="0"
                                        />
                                    </label>

                                    <span className="admin-score-divider">-</span>

                                    <label className="admin-score-field">
                                        <span className="admin-score-label">{match.equipos[1].equipo}</span>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            className="admin-score-input"
                                            value={draft.awayScore}
                                            onChange={(event) => updateDraft(match.id, 'awayScore', event.target.value)}
                                            placeholder="0"
                                        />
                                    </label>
                                </div>

                                <div className="admin-result-card-actions">
                                    <button
                                        type="button"
                                        className="admin-result-action admin-result-action--primary"
                                        onClick={() => handleSave(match.id)}
                                        disabled={draft.homeScore === '' || draft.awayScore === '' || isSaving}
                                    >
                                        Guardar resultado
                                    </button>
                                    <button
                                        type="button"
                                        className="admin-result-action admin-result-action--secondary"
                                        onClick={() => handleClear(match.id)}
                                        disabled={isSaving}
                                    >
                                        Limpiar
                                    </button>
                                    <span className={`admin-result-status ${hasSavedResult ? 'admin-result-status--saved' : ''}`}>
                                        {hasSavedResult ? 'Resultado cargado' : 'Sin resultado todavía'}
                                    </span>
                                </div>
                            </article>
                        );
                    })
                )}
            </div>
        </section>
    );
}

export default AdminResultsPanel;
