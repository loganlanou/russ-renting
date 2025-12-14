package handlers

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"

	"russ-rentals/internal/middleware"
	"russ-rentals/internal/models"
	"russ-rentals/templates/components"
	"russ-rentals/templates/pages"
)

func (h *Handler) Properties(c echo.Context) error {
	isAuth := middleware.IsAuthenticated(c)

	// Get filter params
	propertyType := c.QueryParam("type")
	minPrice := c.QueryParam("minPrice")
	maxPrice := c.QueryParam("maxPrice")
	bedrooms := c.QueryParam("bedrooms")

	properties := h.getFilteredProperties(propertyType, minPrice, maxPrice, bedrooms)

	return Render(c, http.StatusOK, pages.Properties(properties, isAuth, propertyType, minPrice, maxPrice, bedrooms))
}

func (h *Handler) FilterProperties(c echo.Context) error {
	// Get filter params
	propertyType := c.QueryParam("type")
	minPrice := c.QueryParam("minPrice")
	maxPrice := c.QueryParam("maxPrice")
	bedrooms := c.QueryParam("bedrooms")

	properties := h.getFilteredProperties(propertyType, minPrice, maxPrice, bedrooms)

	// Return just the grid for HTMX swap
	return Render(c, http.StatusOK, components.PropertyGrid(properties))
}

func (h *Handler) PropertyDetail(c echo.Context) error {
	slug := c.Param("slug")
	isAuth := middleware.IsAuthenticated(c)

	property := h.getPropertyBySlug(slug)
	if property == nil {
		return c.String(http.StatusNotFound, "Property not found")
	}

	return Render(c, http.StatusOK, pages.PropertyDetail(*property, isAuth))
}

func (h *Handler) PropertyGallery(c echo.Context) error {
	slug := c.Param("slug")
	room := c.QueryParam("room")
	indexStr := c.QueryParam("index")

	property := h.getPropertyBySlug(slug)
	if property == nil {
		return c.String(http.StatusNotFound, "Property not found")
	}

	index := 0
	if indexStr != "" {
		if i, err := strconv.Atoi(indexStr); err == nil {
			index = i
		}
	}

	images := property.Images
	if room != "" && room != "all" {
		images = property.ImagesByRoom(models.RoomType(room))
	}

	if index >= len(images) {
		index = 0
	}

	return Render(c, http.StatusOK, components.GalleryContent(images, index, property.Title, slug))
}

// Helper functions - these will be replaced with database queries
func (h *Handler) getFilteredProperties(propertyType, minPrice, maxPrice, bedrooms string) []models.Property {
	properties := GetSampleProperties()

	var filtered []models.Property
	for _, p := range properties {
		// Filter by type
		if propertyType != "" && string(p.Type) != propertyType {
			continue
		}

		// Filter by min price
		if minPrice != "" {
			if min, err := strconv.Atoi(minPrice); err == nil && p.Price < min {
				continue
			}
		}

		// Filter by max price
		if maxPrice != "" {
			if max, err := strconv.Atoi(maxPrice); err == nil && p.Price > max {
				continue
			}
		}

		// Filter by bedrooms
		if bedrooms != "" {
			if beds, err := strconv.Atoi(bedrooms); err == nil && p.Bedrooms < beds {
				continue
			}
		}

		filtered = append(filtered, p)
	}

	return filtered
}

func (h *Handler) getPropertyBySlug(slug string) *models.Property {
	properties := GetSampleProperties()
	for _, p := range properties {
		if p.Slug == slug {
			return &p
		}
	}
	return nil
}

func (h *Handler) getFeaturedProperties() []models.Property {
	properties := GetSampleProperties()
	var featured []models.Property
	for _, p := range properties {
		if p.Featured && p.Available {
			featured = append(featured, p)
		}
	}
	if len(featured) == 0 {
		// Return first 3 available properties if no featured ones
		for _, p := range properties {
			if p.Available {
				featured = append(featured, p)
				if len(featured) >= 3 {
					break
				}
			}
		}
	}
	return featured
}
