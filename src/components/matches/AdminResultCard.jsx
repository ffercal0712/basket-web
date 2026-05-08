import { formatearFechaCorta } from '../../data/MatchData.jsx';

function AdminResultCard({ match, draft, updateDraft, onSave, onClear, isSaving }) {
    const hasSavedResult = Number.isFinite(match.equipos[0].puntuacion) && Number.isFinite(match.equipos[1].puntuacion);

    return (
        <article className="admin-result-card">
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
                    onClick={() => onSave(match.id)}
                    disabled={draft.homeScore === '' || draft.awayScore === '' || isSaving}
                >
                    Guardar resultado
                </button>
                <button
                    type="button"
                    className="admin-result-action admin-result-action--secondary"
                    onClick={() => onClear(match.id)}
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
}

export default AdminResultCard;
