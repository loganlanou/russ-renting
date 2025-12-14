-- +goose Up
CREATE TYPE room_type AS ENUM (
    'exterior', 'living', 'kitchen', 'bedroom',
    'bathroom', 'dining', 'backyard', 'garage', 'other'
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

CREATE INDEX idx_images_property ON property_images(property_id);
CREATE INDEX idx_images_room ON property_images(room);
CREATE INDEX idx_images_order ON property_images(property_id, display_order);

-- +goose Down
DROP TABLE IF EXISTS property_images;
DROP TYPE IF EXISTS room_type;
