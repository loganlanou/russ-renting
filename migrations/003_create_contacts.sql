-- +goose Up
CREATE TYPE inquiry_type AS ENUM ('viewing', 'application', 'general');

CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    property_id INTEGER REFERENCES properties(id) ON DELETE SET NULL,
    inquiry_type inquiry_type NOT NULL DEFAULT 'general',
    preferred_date DATE,
    preferred_time VARCHAR(50),
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contacts_property ON contact_submissions(property_id);
CREATE INDEX idx_contacts_email ON contact_submissions(email);
CREATE INDEX idx_contacts_created ON contact_submissions(created_at);

-- +goose Down
DROP TABLE IF EXISTS contact_submissions;
DROP TYPE IF EXISTS inquiry_type;
