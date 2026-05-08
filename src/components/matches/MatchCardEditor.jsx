import teams from '../../data/TeamData.jsx';

function MatchCardEditor({ draft, updateDraft, onSave, onClearResult, isSaving, adminMessage }) {
    return (
        <div className="match-card-admin-editor">
            <div className="admin-result-card-grid admin-result-card-grid--schedule">
                <label className="admin-score-field">
                    <span className="admin-score-label">Fecha</span>
                    <input
                        type="date"
                        className="admin-score-input"
                        value={draft.fecha}
                        onChange={(event) => updateDraft('fecha', event.target.value)}
                    />
                </label>

                <label className="admin-score-field">
                    <span className="admin-score-label">Hora inicio</span>
                    <input
                        type="time"
                        className="admin-score-input"
                        value={draft.hora}
                        onChange={(event) => updateDraft('hora', event.target.value)}
                    />
                </label>

                <label className="admin-score-field">
                    <span className="admin-score-label">Hora fin</span>
                    <input
                        type="time"
                        className="admin-score-input"
                        value={draft.horaFin}
                        onChange={(event) => updateDraft('horaFin', event.target.value)}
                    />
                </label>
            </div>

            <div className="admin-result-card-grid admin-result-card-grid--teams">
                <label className="admin-score-field">
                    <span className="admin-score-label">Equipo local</span>
                    <select
                        className="admin-score-input"
                        value={draft.homeTeamId}
                        onChange={(event) => updateDraft('homeTeamId', event.target.value)}
                    >
                        <option value="">Mantener actual</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>{team.equipo}</option>
                        ))}
                    </select>
                </label>

                <label className="admin-score-field">
                    <span className="admin-score-label">Equipo visitante</span>
                    <select
                        className="admin-score-input"
                        value={draft.awayTeamId}
                        onChange={(event) => updateDraft('awayTeamId', event.target.value)}
                    >
                        <option value="">Mantener actual</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>{team.equipo}</option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="admin-result-card-grid admin-result-card-grid--schedule">
                <label className="admin-score-field">
                    <span className="admin-score-label">Título</span>
                    <input
                        type="text"
                        className="admin-score-input"
                        value={draft.titulo}
                        onChange={(event) => updateDraft('titulo', event.target.value)}
                    />
                </label>
            </div>

            <div className="admin-result-card-grid">
                <label className="admin-score-field">
                    <span className="admin-score-label">Resultado local</span>
                    <input
                        type="text"
                        inputMode="numeric"
                        className="admin-score-input"
                        value={draft.homeScore}
                        onChange={(event) => updateDraft('homeScore', event.target.value)}
                        placeholder="0"
                    />
                </label>

                <span className="admin-score-divider">-</span>

                <label className="admin-score-field">
                    <span className="admin-score-label">Resultado visitante</span>
                    <input
                        type="text"
                        inputMode="numeric"
                        className="admin-score-input"
                        value={draft.awayScore}
                        onChange={(event) => updateDraft('awayScore', event.target.value)}
                        placeholder="0"
                    />
                </label>
            </div>

            <div className="admin-result-card-actions">
                <button
                    type="button"
                    className="admin-result-action admin-result-action--primary"
                    onClick={onSave}
                    disabled={isSaving}
                >
                    Guardar cambios
                </button>
                <button
                    type="button"
                    className="admin-result-action admin-result-action--secondary"
                    onClick={onClearResult}
                    disabled={isSaving}
                >
                    Limpiar resultado
                </button>
            </div>

            {adminMessage && (
                <p className="admin-results-message admin-results-message--inline">{adminMessage}</p>
            )}
        </div>
    );
}

export default MatchCardEditor;
