-- name: GetPropertyBySlug :one
SELECT * FROM properties WHERE slug = $1;

-- name: GetPropertyByID :one
SELECT * FROM properties WHERE id = $1;

-- name: ListProperties :many
SELECT * FROM properties ORDER BY created_at DESC;

-- name: ListAvailableProperties :many
SELECT * FROM properties WHERE available = true ORDER BY created_at DESC;

-- name: ListFeaturedProperties :many
SELECT * FROM properties WHERE featured = true AND available = true ORDER BY created_at DESC LIMIT $1;

-- name: ListPropertiesByType :many
SELECT * FROM properties WHERE type = $1 ORDER BY created_at DESC;

-- name: FilterProperties :many
SELECT * FROM properties
WHERE
    (CASE WHEN @type_filter::text = '' THEN true ELSE type::text = @type_filter END)
    AND (CASE WHEN @min_price::int = 0 THEN true ELSE price >= @min_price END)
    AND (CASE WHEN @max_price::int = 0 THEN true ELSE price <= @max_price END)
    AND (CASE WHEN @min_bedrooms::int = 0 THEN true ELSE bedrooms >= @min_bedrooms END)
ORDER BY created_at DESC;

-- name: CreateProperty :one
INSERT INTO properties (
    slug, title, type, address, city, state, zip_code,
    price, deposit, application_fee, bedrooms, bathrooms, square_feet,
    description, features, available, available_date, pet_friendly,
    pet_deposit, pet_rent, parking, laundry, year_built, utilities,
    lease_terms, featured
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26
) RETURNING *;

-- name: UpdateProperty :one
UPDATE properties SET
    title = $2,
    type = $3,
    address = $4,
    city = $5,
    state = $6,
    zip_code = $7,
    price = $8,
    deposit = $9,
    application_fee = $10,
    bedrooms = $11,
    bathrooms = $12,
    square_feet = $13,
    description = $14,
    features = $15,
    available = $16,
    available_date = $17,
    pet_friendly = $18,
    pet_deposit = $19,
    pet_rent = $20,
    parking = $21,
    laundry = $22,
    year_built = $23,
    utilities = $24,
    lease_terms = $25,
    featured = $26,
    updated_at = NOW()
WHERE id = $1 RETURNING *;

-- name: DeleteProperty :exec
DELETE FROM properties WHERE id = $1;

-- name: CountProperties :one
SELECT COUNT(*) FROM properties;

-- name: CountAvailableProperties :one
SELECT COUNT(*) FROM properties WHERE available = true;
