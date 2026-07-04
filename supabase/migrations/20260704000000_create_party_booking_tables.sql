-- Party booking schema: packages + reservations with dynamic availability.

CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE TABLE party_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  price_cents INTEGER NOT NULL CHECK (price_cents >= 0),
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE party_reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES party_packages (id),
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL CHECK (ends_at > starts_at),
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  guest_count INTEGER CHECK (guest_count IS NULL OR guest_count > 0),
  child_name TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE party_reservations
  ADD CONSTRAINT party_reservations_no_overlap
  EXCLUDE USING gist (
    tstzrange(starts_at, ends_at, '[)') WITH &&
  )
  WHERE (status != 'cancelled');

CREATE INDEX party_reservations_starts_at_idx
  ON party_reservations (starts_at);

CREATE INDEX party_reservations_status_idx
  ON party_reservations (status);

CREATE INDEX party_reservations_package_id_idx
  ON party_reservations (package_id);

INSERT INTO party_packages (slug, name, price_cents, duration_minutes)
VALUES ('glow', 'The Glow Package', 24900, 90);

ALTER TABLE party_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE party_reservations ENABLE ROW LEVEL SECURITY;
