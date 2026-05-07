import { useEffect, useMemo, useState } from 'react';
import baseMatches from '../data/MatchData.jsx';
import teams from '../data/TeamData.jsx';
import { insforge, isInsforgeConfigured } from '../lib/insforge.js';

const REFRESH_INTERVAL_MS = 10000;

function getTeamById(id) {
    return teams.find((team) => team.id === Number(id)) ?? null;
}

function buildTeam(baseTeam, overrideTeamId, score) {
    const selectedTeam = overrideTeamId ? getTeamById(overrideTeamId) : null;
    const team = selectedTeam ?? baseTeam;

    return {
        ...team,
        puntuacion: score
    };
}

function hasOverrideScore(override) {
    return Number.isFinite(override?.home_score) && Number.isFinite(override?.away_score);
}

function mergeMatches(matches, remoteResults, remoteOverrides) {
    const resultsByMatchId = new Map(remoteResults.map((result) => [Number(result.match_id), result]));
    const overridesByMatchId = new Map(remoteOverrides.map((override) => [Number(override.match_id), override]));

    return matches.map((match) => {
        const savedResult = resultsByMatchId.get(match.id);
        const override = overridesByMatchId.get(match.id);

        const useOverrideScore = hasOverrideScore(override);
        const hasClearedResult = override?.result_cleared === true;
        const resultSource = useOverrideScore
            ? override
            : hasClearedResult
                ? null
                : savedResult;

        const homeScore = resultSource ? resultSource.home_score : null;
        const awayScore = resultSource ? resultSource.away_score : null;

        return {
            ...match,
            fecha: override?.fecha ?? match.fecha,
            hora: override?.hora ?? match.hora,
            horaFin: override?.hora_fin ?? match.horaFin,
            titulo: override?.titulo ?? match.titulo,
            resultadoConfirmado: useOverrideScore || Boolean(savedResult),
            updatedAt: override?.updated_at ?? savedResult?.updated_at ?? null,
            equipos: [
                buildTeam(match.equipos[0], override?.home_team_id, homeScore),
                buildTeam(match.equipos[1], override?.away_team_id, awayScore)
            ]
        };
    });
}

export function useMatches() {
    const [remoteResults, setRemoteResults] = useState([]);
    const [remoteOverrides, setRemoteOverrides] = useState([]);
    const [isLoading, setIsLoading] = useState(isInsforgeConfigured);
    const [syncError, setSyncError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    async function loadRemoteState() {
        const [{ data: resultData, error: resultError }, { data: overrideData, error: overrideError }] = await Promise.all([
            insforge.database
                .from('match_results')
                .select('*')
                .order('match_id', { ascending: true }),
            insforge.database
                .from('match_admin_overrides')
                .select('*')
                .order('match_id', { ascending: true })
        ]);

        if (resultError || overrideError) {
            return {
                ok: false,
                error: resultError?.message ?? overrideError?.message ?? 'No se han podido cargar los partidos compartidos.'
            };
        }

        return {
            ok: true,
            results: resultData ?? [],
            overrides: overrideData ?? []
        };
    }

    useEffect(() => {
        if (!isInsforgeConfigured) {
            return undefined;
        }

        let isDisposed = false;

        async function syncMatches() {
            const remoteState = await loadRemoteState();

            if (isDisposed) return;

            if (!remoteState.ok) {
                setSyncError('No se han podido cargar los resultados compartidos.');
                setIsLoading(false);
                return;
            }

            setRemoteResults(remoteState.results);
            setRemoteOverrides(remoteState.overrides);
            setSyncError('');
            setIsLoading(false);
        }

        syncMatches();
        const intervalId = window.setInterval(syncMatches, REFRESH_INTERVAL_MS);

        return () => {
            isDisposed = true;
            window.clearInterval(intervalId);
        };
    }, []);

    const matches = useMemo(
        () => mergeMatches(baseMatches, remoteResults, remoteOverrides),
        [remoteResults, remoteOverrides]
    );

    async function runAdminAction(body) {
        if (!isInsforgeConfigured) {
            return {
                ok: false,
                error: 'La conexión remota no está configurada en este entorno.'
            };
        }

        setIsSaving(true);

        const { data, error } = await insforge.functions.invoke('save-match-result', {
            body,
            headers: {
                'X-Admin-Pin': body.pin
            }
        });

        setIsSaving(false);

        if (error) {
            return {
                ok: false,
                error: error.message ?? 'No se ha podido completar la operación.'
            };
        }

        return {
            ok: true,
            data
        };
    }

    async function refreshResults() {
        if (!isInsforgeConfigured) return;

        const remoteState = await loadRemoteState();

        if (!remoteState.ok) {
            setSyncError('No se han podido refrescar los partidos compartidos.');
            return;
        }

        setRemoteResults(remoteState.results);
        setRemoteOverrides(remoteState.overrides);
        setSyncError('');
    }

    async function saveResult(matchId, homeScore, awayScore, adminPin) {
        const result = await runAdminAction({
            action: 'save',
            pin: adminPin ?? '',
            matchId,
            homeScore,
            awayScore
        });

        if (!result.ok) return result;

        await refreshResults();
        return { ok: true };
    }

    async function clearResult(matchId, adminPin) {
        const result = await runAdminAction({
            action: 'clear',
            pin: adminPin ?? '',
            matchId
        });

        if (!result.ok) return result;

        await refreshResults();
        return { ok: true };
    }

    async function updateMatch(payload, adminPin) {
        const result = await runAdminAction({
            action: 'update-match',
            pin: adminPin ?? '',
            ...payload
        });

        if (!result.ok) return result;

        await refreshResults();
        return { ok: true };
    }

    return {
        matches,
        saveResult,
        clearResult,
        updateMatch,
        isSaving,
        isLoading,
        syncError,
        isRemoteMode: isInsforgeConfigured,
        refreshResults
    };
}
