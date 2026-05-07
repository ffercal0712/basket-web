import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import teams from '../../data/TeamData.jsx';
import { formatearFechaCorta, estadoPartido, partidoTieneResultado } from '../../data/MatchData.jsx';

function formatDateForInput(fecha) {
    const [day, month, year] = fecha.split('-');
    return `${year}-${month}-${day}`;
}

function formatDateForStorage(fecha) {
    if (!fecha) return null;
    const [year, month, day] = fecha.split('-');
    return `${day}-${month}-${year}`;
}

function getDraftFromMatch(match) {
    return {
        fecha: formatDateForInput(match.fecha),
        hora: match.hora,
        horaFin: match.horaFin,
        titulo: match.titulo ?? '',
        nota: match.nota ?? '',
        homeTeamId: match.equipos[0].placeholder ? '' : String(match.equipos[0].id),
        awayTeamId: match.equipos[1].placeholder ? '' : String(match.equipos[1].id),
        homeScore: Number.isFinite(match.equipos[0].puntuacion) ? String(match.equipos[0].puntuacion) : '',
        awayScore: Number.isFinite(match.equipos[1].puntuacion) ? String(match.equipos[1].puntuacion) : ''
    };
}

function getTeamById(id) {
    return teams.find((team) => team.id === Number(id)) ?? null;
}

function buildPreviewTeam(baseTeam, selectedId, scoreValue) {
    const selectedTeam = selectedId ? getTeamById(selectedId) : null;
    const nextScore = scoreValue === '' ? null : Number(scoreValue);

    return {
        ...(selectedTeam ?? baseTeam),
        puntuacion: Number.isFinite(nextScore) ? nextScore : baseTeam.puntuacion
    };
}

function MatchCard({
    partido,
    adminMode = false,
    onAdminSave,
    onAdminClearResult,
    isSaving = false
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(() => getDraftFromMatch(partido));
    const [adminMessage, setAdminMessage] = useState('');
    const baseDraft = useMemo(() => getDraftFromMatch(partido), [partido]);

    const previewPartido = useMemo(() => {
        if (!adminMode || !isEditing) {
            return partido;
        }

        return {
            ...partido,
            fecha: formatDateForStorage(draft.fecha) ?? partido.fecha,
            hora: draft.hora || partido.hora,
            horaFin: draft.horaFin || partido.horaFin,
            titulo: draft.titulo.trim() || partido.titulo,
            nota: draft.nota.trim() || partido.nota,
            equipos: [
                buildPreviewTeam(partido.equipos[0], draft.homeTeamId, draft.homeScore),
                buildPreviewTeam(partido.equipos[1], draft.awayTeamId, draft.awayScore)
            ]
        };
    }, [adminMode, draft, isEditing, partido]);

    const { id, fecha, hora, horaFin, equipos, titulo, nota } = previewPartido;
    const [equipo1, equipo2] = equipos;
    const tieneCrucePendiente = equipo1.placeholder || equipo2.placeholder;
    const tieneResultado = partidoTieneResultado(previewPartido);

    const estado = estadoPartido(previewPartido);
    const esEnJuego = estado === 'en-juego';
    const esFinalizados = estado === 'finalizado';

    const ganador = esFinalizados && tieneResultado
        ? equipo1.puntuacion > equipo2.puntuacion
            ? equipo1.id
            : equipo2.puntuacion > equipo1.puntuacion
                ? equipo2.id
                : null
        : null;

    function cornerColor(equipoId) {
        if (esEnJuego) return 'soft';
        if (estado === 'proximo') return 'white';
        if (!tieneResultado) return 'soft';
        if (ganador === null) return 'soft';
        return ganador === equipoId ? 'accent' : 'soft';
    }

    function getScoreLabel() {
        if (tieneResultado) return `${equipo1.puntuacion} — ${equipo2.puntuacion}`;
        if (esFinalizados) return '—';
        return 'X';
    }

    function updateDraft(field, value) {
        if ((field === 'homeScore' || field === 'awayScore') && value !== '' && !/^\d+$/.test(value)) {
            return;
        }

        setDraft((currentDraft) => ({
            ...currentDraft,
            [field]: value
        }));
    }

    async function handleSaveChanges() {
        if (!onAdminSave) return;

        if ((draft.homeScore === '' && draft.awayScore !== '') || (draft.homeScore !== '' && draft.awayScore === '')) {
            setAdminMessage('Para guardar marcador, completa ambos resultados o usa "Limpiar resultado".');
            return;
        }

        const result = await onAdminSave({
            matchId: id,
            fecha: formatDateForStorage(draft.fecha),
            hora: draft.hora,
            horaFin: draft.horaFin,
            titulo: draft.titulo,
            nota: draft.nota,
            homeTeamId: draft.homeTeamId === '' ? null : Number(draft.homeTeamId),
            awayTeamId: draft.awayTeamId === '' ? null : Number(draft.awayTeamId),
            homeScore: draft.homeScore === '' ? null : Number(draft.homeScore),
            awayScore: draft.awayScore === '' ? null : Number(draft.awayScore)
        });

        setAdminMessage(result?.ok ? 'Cambios guardados.' : result?.error ?? 'No se ha podido guardar el partido.');

        if (result?.ok) {
            setIsEditing(false);
        }
    }

    async function handleClearResult() {
        if (!onAdminClearResult) return;

        const result = await onAdminClearResult(id);
        setAdminMessage(result?.ok ? 'Resultado eliminado.' : result?.error ?? 'No se ha podido limpiar el resultado.');

        if (result?.ok) {
            setDraft((currentDraft) => ({
                ...currentDraft,
                homeScore: '',
                awayScore: ''
            }));
        }
    }

    const cardContent = (
        <div className="match-card">
            <div className={`match-card-corner match-card-corner--top match-card-corner--${cornerColor(equipo1.id)}`}></div>
            <div className={`match-card-corner match-card-corner--bottom match-card-corner--${cornerColor(equipo2.id)}`}></div>
            {equipo1.escudo && (
                <span className={`match-card-shield-frame match-card-shield-frame--top ${equipo1.logoVariant === 'wide' ? 'match-card-shield-frame--wide' : ''}`}>
                    <img
                        src={equipo1.escudo}
                        alt={equipo1.equipo}
                        className={`match-card-shield ${equipo1.logoVariant === 'wide' ? 'match-card-shield--wide' : ''}`}
                    />
                </span>
            )}
            {equipo2.escudo && (
                <span className={`match-card-shield-frame match-card-shield-frame--bottom ${equipo2.logoVariant === 'wide' ? 'match-card-shield-frame--wide' : ''}`}>
                    <img
                        src={equipo2.escudo}
                        alt={equipo2.equipo}
                        className={`match-card-shield ${equipo2.logoVariant === 'wide' ? 'match-card-shield--wide' : ''}`}
                    />
                </span>
            )}

            <div className="match-card-meta">
                <span className="match-card-date">{formatearFechaCorta(fecha)}</span>
                <span className="match-card-separator">·</span>
                <span className="match-card-time">{hora} - {horaFin}</span>
            </div>

            {titulo && (
                <p className={`match-card-stage ${tieneCrucePendiente ? 'match-card-stage--pending' : ''}`}>
                    {titulo}
                </p>
            )}

            {esEnJuego ? (
                <>
                    <div className="match-card-teams">
                        <span className={`match-card-team ${ganador === equipo1.id ? 'match-card-team--winner' : ''} ${equipo1.placeholder ? 'match-card-team--placeholder' : ''}`}>
                            {equipo1.equipo}
                        </span>
                        <span className="match-card-score">
                            {getScoreLabel()}
                        </span>
                        <span className={`match-card-team ${ganador === equipo2.id ? 'match-card-team--winner' : ''} ${equipo2.placeholder ? 'match-card-team--placeholder' : ''}`}>
                            {equipo2.equipo}
                        </span>
                    </div>
                    <div className="match-card-live">
                        <span className="match-card-badge match-card-badge--live">En juego</span>
                    </div>
                </>
            ) : (
                <div className="match-card-teams">
                    <span className={`match-card-team ${ganador === equipo1.id ? 'match-card-team--winner' : ''} ${equipo1.placeholder ? 'match-card-team--placeholder' : ''}`}>
                        {equipo1.equipo}
                    </span>
                    <span className="match-card-score">
                        {getScoreLabel()}
                    </span>
                    <span className={`match-card-team ${ganador === equipo2.id ? 'match-card-team--winner' : ''} ${equipo2.placeholder ? 'match-card-team--placeholder' : ''}`}>
                        {equipo2.equipo}
                    </span>
                </div>
            )}

            {nota && (
                <p className="match-card-note">{nota}</p>
            )}

            {esFinalizados && ganador === null && (
                tieneResultado
                    ? <span className="match-card-badge match-card-badge--draw">Empate</span>
                    : <span className="match-card-badge match-card-badge--pending-result">Resultado pendiente</span>
            )}
            {estado === 'proximo' && (
                <span className="match-card-badge match-card-badge--upcoming">Próximamente</span>
            )}

            {adminMode && (
                <div className="match-card-admin">
                    <div className="match-card-admin-actions">
                        <button
                            type="button"
                            className="admin-result-action admin-result-action--secondary"
                            onClick={() => {
                                setIsEditing((currentValue) => !currentValue);
                                setAdminMessage('');
                                setDraft(baseDraft);
                            }}
                        >
                            {isEditing ? 'Cerrar edición' : 'Editar partido'}
                        </button>
                        <Link to={`/partidos/${id}`} className="match-card-admin-link">
                            Ver detalle
                        </Link>
                    </div>

                    {isEditing && (
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

                                <label className="admin-score-field admin-score-field--full">
                                    <span className="admin-score-label">Nota</span>
                                    <textarea
                                        className="admin-score-input admin-score-input--textarea"
                                        value={draft.nota}
                                        onChange={(event) => updateDraft('nota', event.target.value)}
                                        rows="3"
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
                                    onClick={handleSaveChanges}
                                    disabled={isSaving}
                                >
                                    Guardar cambios
                                </button>
                                <button
                                    type="button"
                                    className="admin-result-action admin-result-action--secondary"
                                    onClick={handleClearResult}
                                    disabled={isSaving}
                                >
                                    Limpiar resultado
                                </button>
                            </div>

                            {adminMessage && (
                                <p className="admin-results-message admin-results-message--inline">{adminMessage}</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    if (adminMode) {
        return <article className="card-link">{cardContent}</article>;
    }

    return (
        <Link to={`/partidos/${id}`} className="card-link">
            {cardContent}
        </Link>
    );
}

export default MatchCard;
