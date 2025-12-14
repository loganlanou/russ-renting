-- Schema for sqlc code generation

CREATE TYPE property_type AS ENUM ('house', 'apartment', 'duplex');
CREATE TYPE room_type AS ENUM ('exterior', 'living', 'kitchen', 'bedroom', 'bathroom', 'dining', 'backyard', 'garage', 'other');
CREATE TYPE inquiry_type AS ENUM ('viewing', 'application', 'general');

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

CREATE TABLE property_images (
    id SERIAL PRIMARY KEY,
    property_id INTEGER NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    caption VARCHAR(255) NOT NULL,
    room room_type NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

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

CREATE TABLE newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    unsubscribed_at TIMESTAMPTZ
);
