import { useEffect, useMemo, useState } from 'react';
import baseMatches from '../data/MatchData.jsx';
import { insforge, isInsforgeConfigured } from '../lib/insforge.js';

const REFRESH_INTERVAL_MS = 10000;

function mergeMatchesWithResults(matches, remoteResults) {
    const resultsByMatchId = new Map(remoteResults.map((result) => [Number(result.match_id), result]));

    return matches.map((match) => {
        const savedResult = resultsByMatchId.get(match.id);

        if (!savedResult) {
            return match;
        }

        return {
            ...match,
            resultadoConfirmado: true,
            updatedAt: savedResult.updated_at ?? null,
            equipos: match.equipos.map((equipo, index) => ({
                ...equipo,
                puntuacion: index === 0 ? savedResult.home_score : savedResult.away_score
            }))
        };
    });
}

export function useMatches() {
    const [remoteResults, setRemoteResults] = useState([]);
    const [isLoading, setIsLoading] = useState(isInsforgeConfigured);
    const [syncError, setSyncError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!isInsforgeConfigured) {
            return undefined;
        }

        let isDisposed = false;

        async function loadResults() {
            const { data, error } = await insforge.database
                .from('match_results')
                .select('*')
                .order('match_id', { ascending: true });

            if (isDisposed) return;

            if (error) {
                setSyncError('No se han podido cargar los resultados compartidos.');
                setIsLoading(false);
                return;
            }

            setRemoteResults(data ?? []);
            setSyncError('');
            setIsLoading(false);
        }

        loadResults();
        const intervalId = window.setInterval(loadResults, REFRESH_INTERVAL_MS);

        return () => {
            isDisposed = true;
            window.clearInterval(intervalId);
        };
    }, []);

    const matches = useMemo(
        () => mergeMatchesWithResults(baseMatches, remoteResults),
        [remoteResults]
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

        const { data, error } = await insforge.database
            .from('match_results')
            .select('*')
            .order('match_id', { ascending: true });

        if (error) {
            setSyncError('No se han podido refrescar los resultados compartidos.');
            return;
        }

        setRemoteResults(data ?? []);
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

    return {
        matches,
        saveResult,
        clearResult,
        isSaving,
        isLoading,
        syncError,
        isRemoteMode: isInsforgeConfigured,
        refreshResults
    };
}
