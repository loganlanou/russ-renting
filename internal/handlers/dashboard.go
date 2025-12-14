package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"

	"russ-rentals/internal/middleware"
	"russ-rentals/templates/pages"
)

func (h *Handler) Dashboard(c echo.Context) error {
	userID := middleware.GetUserID(c)
	return Render(c, http.StatusOK, pages.Dashboard(userID))
}
