import { createClient } from 'npm:@insforge/sdk';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Pin'
};

type ActionPayload =
  | { action: 'verify'; pin: string }
  | { action: 'save'; pin: string; matchId: number; homeScore: number; awayScore: number }
  | { action: 'clear'; pin: string; matchId: number }
  | {
      action: 'update-match';
      pin: string;
      matchId: number;
      fecha?: string | null;
      hora?: string | null;
      horaFin?: string | null;
      titulo?: string | null;
      homeTeamId?: number | null;
      awayTeamId?: number | null;
      homeScore?: number | null;
      awayScore?: number | null;
      clearResult?: boolean;
    };

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json'
    }
  });
}

function extractPin(req: Request, payload: Partial<ActionPayload>) {
  return req.headers.get('X-Admin-Pin') ?? payload.pin ?? '';
}

function normalizeText(value: unknown) {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}

function normalizeOptionalNumber(value: unknown) {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const normalized = Number(value);
  return Number.isFinite(normalized) ? normalized : Number.NaN;
}

export default async function(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  const payload = await req.json() as Partial<ActionPayload>;
  const expectedPin = Deno.env.get('ADMIN_PANEL_PIN');
  const pin = extractPin(req, payload);

  if (!expectedPin || pin !== expectedPin) {
    return jsonResponse({ error: 'PIN de administrador no válido.' }, 401);
  }

  if (!payload.action) {
    return jsonResponse({ error: 'Acción no válida.' }, 400);
  }

  if (payload.action === 'verify') {
    return jsonResponse({ ok: true });
  }

  const client = createClient({
    baseUrl: Deno.env.get('INSFORGE_BASE_URL'),
    edgeFunctionToken: Deno.env.get('INSFORGE_API_KEY') ?? Deno.env.get('API_KEY')
  });

  if (payload.action === 'save') {
    const matchId = Number(payload.matchId);
    const homeScore = Number(payload.homeScore);
    const awayScore = Number(payload.awayScore);

    if (!Number.isFinite(matchId) || !Number.isFinite(homeScore) || !Number.isFinite(awayScore)) {
      return jsonResponse({ error: 'Datos de resultado no válidos.' }, 400);
    }

    const { error } = await client.database
      .from('match_admin_overrides')
      .upsert([{
        match_id: matchId,
        home_score: homeScore,
        away_score: awayScore,
        result_cleared: false,
        updated_at: new Date().toISOString()
      }], {
        onConflict: 'match_id'
      });

    if (error) {
      return jsonResponse({ error: error.message ?? 'No se ha podido guardar el resultado.' }, 500);
    }

    return jsonResponse({ ok: true });
  }

  if (payload.action === 'clear') {
    const matchId = Number(payload.matchId);

    if (!Number.isFinite(matchId)) {
      return jsonResponse({ error: 'Partido no válido.' }, 400);
    }

    const { error } = await client.database
      .from('match_admin_overrides')
      .upsert([{
        match_id: matchId,
        home_score: null,
        away_score: null,
        result_cleared: true,
        updated_at: new Date().toISOString()
      }], {
        onConflict: 'match_id'
      });

    if (error) {
      return jsonResponse({ error: error.message ?? 'No se ha podido limpiar el resultado.' }, 500);
    }

    return jsonResponse({ ok: true });
  }

  if (payload.action === 'update-match') {
    const matchId = Number(payload.matchId);

    if (!Number.isFinite(matchId)) {
      return jsonResponse({ error: 'Partido no válido.' }, 400);
    }

    const homeTeamId = normalizeOptionalNumber(payload.homeTeamId);
    const awayTeamId = normalizeOptionalNumber(payload.awayTeamId);
    const homeScore = normalizeOptionalNumber(payload.homeScore);
    const awayScore = normalizeOptionalNumber(payload.awayScore);

    if (Number.isNaN(homeTeamId) || Number.isNaN(awayTeamId) || Number.isNaN(homeScore) || Number.isNaN(awayScore)) {
      return jsonResponse({ error: 'Hay datos del partido con un formato no válido.' }, 400);
    }

    if (
      homeTeamId !== null &&
      awayTeamId !== null &&
      homeTeamId === awayTeamId
    ) {
      return jsonResponse({ error: 'Un partido no puede tener el mismo equipo a ambos lados.' }, 400);
    }

    const { data: existingOverride, error: existingOverrideError } = await client.database
      .from('match_admin_overrides')
      .select('*')
      .eq('match_id', matchId)
      .maybeSingle();

    if (existingOverrideError) {
      return jsonResponse({ error: existingOverrideError.message ?? 'No se ha podido leer el partido.' }, 500);
    }

    const shouldClearResult = payload.clearResult === true;
    const nextHomeScore = shouldClearResult ? null : homeScore;
    const nextAwayScore = shouldClearResult ? null : awayScore;

    const row = {
      ...(existingOverride ?? {}),
      match_id: matchId,
      fecha: normalizeText(payload.fecha) ?? existingOverride?.fecha ?? null,
      hora: normalizeText(payload.hora) ?? existingOverride?.hora ?? null,
      hora_fin: normalizeText(payload.horaFin) ?? existingOverride?.hora_fin ?? null,
      titulo: normalizeText(payload.titulo) ?? existingOverride?.titulo ?? null,
      home_team_id: homeTeamId ?? existingOverride?.home_team_id ?? null,
      away_team_id: awayTeamId ?? existingOverride?.away_team_id ?? null,
      home_score: nextHomeScore ?? existingOverride?.home_score ?? null,
      away_score: nextAwayScore ?? existingOverride?.away_score ?? null,
      result_cleared: shouldClearResult ? true : existingOverride?.result_cleared ?? false,
      updated_at: new Date().toISOString()
    };

    if (homeScore !== null && awayScore !== null) {
      row.home_score = homeScore;
      row.away_score = awayScore;
      row.result_cleared = false;
    }

    const { error } = await client.database
      .from('match_admin_overrides')
      .upsert([row], {
        onConflict: 'match_id'
      });

    if (error) {
      return jsonResponse({ error: error.message ?? 'No se ha podido actualizar el partido.' }, 500);
    }

    return jsonResponse({ ok: true });
  }

  return jsonResponse({ error: 'Acción no válida.' }, 400);
}
