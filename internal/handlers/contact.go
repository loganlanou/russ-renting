package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"

	"russ-rentals/internal/middleware"
	"russ-rentals/internal/models"
	"russ-rentals/templates/components"
	"russ-rentals/templates/pages"
)

func (h *Handler) Contact(c echo.Context) error {
	isAuth := middleware.IsAuthenticated(c)
	propertySlug := c.QueryParam("property")

	properties := GetSampleProperties()
	var selectedProperty *models.Property

	if propertySlug != "" {
		for _, p := range properties {
			if p.Slug == propertySlug {
				selectedProperty = &p
				break
			}
		}
	}

	return Render(c, http.StatusOK, pages.Contact(properties, selectedProperty, isAuth))
}

func (h *Handler) SubmitContact(c echo.Context) error {
	// Parse form data
	name := c.FormValue("name")
	email := c.FormValue("email")
	phone := c.FormValue("phone")
	propertySlug := c.FormValue("property")
	inquiryType := c.FormValue("inquiryType")
	preferredDate := c.FormValue("preferredDate")
	preferredTime := c.FormValue("preferredTime")
	message := c.FormValue("message")

	// Validate required fields
	if name == "" || email == "" || phone == "" || message == "" {
		return Render(c, http.StatusBadRequest, components.ContactFormError("Please fill in all required fields"))
	}

	// In a real app, save to database and send email here
	_ = models.ContactSubmission{
		Name:          name,
		Email:         email,
		Phone:         phone,
		Message:       message,
		InquiryType:   models.InquiryType(inquiryType),
		PreferredTime: preferredTime,
	}
	_ = propertySlug
	_ = preferredDate

	// Return success message for HTMX swap
	return Render(c, http.StatusOK, components.ContactFormSuccess(inquiryType))
}
