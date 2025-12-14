-- name: CreateContactSubmission :one
INSERT INTO contact_submissions (
    name, email, phone, property_id, inquiry_type,
    preferred_date, preferred_time, message
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *;

-- name: GetContactSubmission :one
SELECT * FROM contact_submissions WHERE id = $1;

-- name: ListContactSubmissions :many
SELECT * FROM contact_submissions ORDER BY created_at DESC;

-- name: ListContactSubmissionsByProperty :many
SELECT * FROM contact_submissions
WHERE property_id = $1
ORDER BY created_at DESC;

-- name: ListContactSubmissionsByEmail :many
SELECT * FROM contact_submissions
WHERE email = $1
ORDER BY created_at DESC;

-- name: DeleteContactSubmission :exec
DELETE FROM contact_submissions WHERE id = $1;

-- name: CreateNewsletterSubscriber :one
INSERT INTO newsletter_subscribers (email, first_name)
VALUES ($1, $2)
ON CONFLICT (email) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    unsubscribed_at = NULL
RETURNING *;

-- name: GetNewsletterSubscriber :one
SELECT * FROM newsletter_subscribers WHERE email = $1;

-- name: UnsubscribeNewsletter :exec
UPDATE newsletter_subscribers SET unsubscribed_at = NOW() WHERE email = $1;

-- name: ListActiveSubscribers :many
SELECT * FROM newsletter_subscribers
WHERE unsubscribed_at IS NULL
ORDER BY subscribed_at DESC;

-- name: CountActiveSubscribers :one
SELECT COUNT(*) FROM newsletter_subscribers WHERE unsubscribed_at IS NULL;
