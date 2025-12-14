package handlers

import (
	"net/http"
	"os"

	"github.com/labstack/echo/v4"

	"russ-rentals/templates/pages"
)

func (h *Handler) SignIn(c echo.Context) error {
	clerkPublishableKey := os.Getenv("CLERK_PUBLISHABLE_KEY")
	return Render(c, http.StatusOK, pages.SignIn(clerkPublishableKey))
}

func (h *Handler) SignUp(c echo.Context) error {
	clerkPublishableKey := os.Getenv("CLERK_PUBLISHABLE_KEY")
	return Render(c, http.StatusOK, pages.SignUp(clerkPublishableKey))
}
