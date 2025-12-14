package handlers

import (
	"russ-rentals/internal/database"
)

// Handler holds dependencies for HTTP handlers
type Handler struct {
	DB *database.DB
}

// NewHandler creates a new Handler with dependencies
func NewHandler(db *database.DB) *Handler {
	return &Handler{
		DB: db,
	}
}
