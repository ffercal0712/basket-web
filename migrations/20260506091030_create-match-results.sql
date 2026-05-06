CREATE TABLE match_results (
  match_id BIGINT PRIMARY KEY,
  home_score INTEGER NOT NULL CHECK (home_score >= 0),
  away_score INTEGER NOT NULL CHECK (away_score >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE match_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_match_results" ON match_results
  FOR SELECT
  USING (true);
