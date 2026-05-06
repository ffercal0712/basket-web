import { createClient } from 'npm:@insforge/sdk';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Admin-Pin'
};

type ActionPayload =
  | { action: 'verify'; pin: string }
  | { action: 'save'; pin: string; matchId: number; homeScore: number; awayScore: number }
  | { action: 'clear'; pin: string; matchId: number };

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
      .from('match_results')
      .upsert([{
        match_id: matchId,
        home_score: homeScore,
        away_score: awayScore,
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
      .from('match_results')
      .delete()
      .eq('match_id', matchId);

    if (error) {
      return jsonResponse({ error: error.message ?? 'No se ha podido limpiar el resultado.' }, 500);
    }

    return jsonResponse({ ok: true });
  }

  return jsonResponse({ error: 'Acción no válida.' }, 400);
}
