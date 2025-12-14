-- name: GetImagesByPropertyID :many
SELECT * FROM property_images
WHERE property_id = $1
ORDER BY display_order ASC;

-- name: GetImagesByPropertyIDAndRoom :many
SELECT * FROM property_images
WHERE property_id = $1 AND room = $2
ORDER BY display_order ASC;

-- name: CreateImage :one
INSERT INTO property_images (property_id, url, caption, room, display_order)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: UpdateImage :one
UPDATE property_images SET
    url = $2,
    caption = $3,
    room = $4,
    display_order = $5
WHERE id = $1 RETURNING *;

-- name: DeleteImage :exec
DELETE FROM property_images WHERE id = $1;

-- name: DeleteImagesByPropertyID :exec
DELETE FROM property_images WHERE property_id = $1;

-- name: GetFirstImageByPropertyID :one
SELECT * FROM property_images
WHERE property_id = $1
ORDER BY display_order ASC
LIMIT 1;

-- name: CountImagesByPropertyID :one
SELECT COUNT(*) FROM property_images WHERE property_id = $1;
