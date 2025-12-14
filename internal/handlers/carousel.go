package handlers

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"

	"russ-rentals/templates/components"
)

// carouselIndex stores the current carousel position (in-memory for simplicity)
// In production, this would be per-session state
var carouselIndex = 0

func (h *Handler) CarouselNext(c echo.Context) error {
	featured := h.getFeaturedProperties()
	if len(featured) == 0 {
		return c.String(http.StatusNotFound, "No featured properties")
	}

	// Get current index from query param or use stored index
	if idx := c.QueryParam("index"); idx != "" {
		if i, err := strconv.Atoi(idx); err == nil {
			carouselIndex = i
		}
	}

	carouselIndex = (carouselIndex + 1) % len(featured)
	return Render(c, http.StatusOK, components.CarouselSlide(featured, carouselIndex))
}

func (h *Handler) CarouselPrev(c echo.Context) error {
	featured := h.getFeaturedProperties()
	if len(featured) == 0 {
		return c.String(http.StatusNotFound, "No featured properties")
	}

	// Get current index from query param or use stored index
	if idx := c.QueryParam("index"); idx != "" {
		if i, err := strconv.Atoi(idx); err == nil {
			carouselIndex = i
		}
	}

	carouselIndex = (carouselIndex - 1 + len(featured)) % len(featured)
	return Render(c, http.StatusOK, components.CarouselSlide(featured, carouselIndex))
}
