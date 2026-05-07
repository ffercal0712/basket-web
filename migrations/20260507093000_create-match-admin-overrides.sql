CREATE TABLE match_admin_overrides (
  match_id BIGINT PRIMARY KEY,
  fecha TEXT,
  hora TEXT,
  hora_fin TEXT,
  titulo TEXT,
  nota TEXT,
  home_team_id BIGINT,
  away_team_id BIGINT,
  home_score INTEGER CHECK (home_score >= 0),
  away_score INTEGER CHECK (away_score >= 0),
  result_cleared BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE match_admin_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_match_admin_overrides" ON match_admin_overrides
  FOR SELECT
  USING (true);
