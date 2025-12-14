package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"

	"russ-rentals/templates/components"
)

func (h *Handler) Newsletter(c echo.Context) error {
	email := c.FormValue("email")
	firstName := c.FormValue("firstName")

	if email == "" {
		return Render(c, http.StatusBadRequest, components.NewsletterError("Please enter your email address"))
	}

	// In a real app, save to database here
	_ = firstName

	return Render(c, http.StatusOK, components.NewsletterSuccess())
}
