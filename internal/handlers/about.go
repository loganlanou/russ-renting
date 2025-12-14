package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"

	"russ-rentals/internal/middleware"
	"russ-rentals/templates/pages"
)

func (h *Handler) About(c echo.Context) error {
	isAuth := middleware.IsAuthenticated(c)
	return Render(c, http.StatusOK, pages.About(isAuth))
}
