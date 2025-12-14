-- +goose Up
CREATE TYPE property_type AS ENUM ('house', 'apartment', 'duplex');

CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    type property_type NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    price INTEGER NOT NULL,
    deposit INTEGER NOT NULL,
    application_fee INTEGER NOT NULL,
    bedrooms INTEGER NOT NULL,
    bathrooms DECIMAL(3,1) NOT NULL,
    square_feet INTEGER NOT NULL,
    description TEXT NOT NULL,
    features TEXT[] NOT NULL DEFAULT '{}',
    available BOOLEAN NOT NULL DEFAULT true,
    available_date DATE,
    pet_friendly BOOLEAN NOT NULL DEFAULT false,
    pet_deposit INTEGER,
    pet_rent INTEGER,
    parking VARCHAR(255),
    laundry VARCHAR(255),
    year_built INTEGER,
    utilities TEXT[] DEFAULT '{}',
    lease_terms TEXT[] DEFAULT '{}',
    featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_properties_type ON properties(type);
CREATE INDEX idx_properties_available ON properties(available);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_bedrooms ON properties(bedrooms);
CREATE INDEX idx_properties_featured ON properties(featured);
CREATE INDEX idx_properties_slug ON properties(slug);

-- +goose Down
DROP TABLE IF EXISTS properties;
DROP TYPE IF EXISTS property_type;
