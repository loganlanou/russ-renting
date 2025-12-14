package handler

import (
	"context"
	"log"
	"net/http"
	"os"
	"sync"

	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"russ-rentals/internal/database"
	"russ-rentals/internal/handlers"
	authMiddleware "russ-rentals/internal/middleware"
)

var (
	e    *echo.Echo
	once sync.Once
)

func init() {
	once.Do(func() {
		// Initialize Clerk
		if key := os.Getenv("CLERK_SECRET_KEY"); key != "" {
			clerk.SetKey(key)
		}

		// Initialize database
		var db *database.DB
		if dbURL := os.Getenv("DATABASE_URL"); dbURL != "" {
			var err error
			db, err = database.Connect(context.Background(), dbURL)
			if err != nil {
				log.Printf("Warning: Database not connected: %v", err)
			}
		}

		// Create handler with dependencies
		h := handlers.NewHandler(db)

		// Create Echo instance
		e = echo.New()
		e.HideBanner = true

		// Middleware
		e.Use(middleware.Logger())
		e.Use(middleware.Recover())
		e.Use(middleware.Gzip())
		e.Use(authMiddleware.OptionalClerkAuth())

		// Static files
		e.Static("/static", "static")

		// Public routes
		e.GET("/", h.Home)
		e.GET("/properties", h.Properties)
		e.GET("/properties/filter", h.FilterProperties)
		e.GET("/properties/:slug", h.PropertyDetail)
		e.GET("/properties/:slug/gallery", h.PropertyGallery)
		e.GET("/contact", h.Contact)
		e.POST("/contact", h.SubmitContact)
		e.GET("/about", h.About)
		e.POST("/api/newsletter", h.Newsletter)

		// Auth routes
		e.GET("/sign-in", h.SignIn)
		e.GET("/sign-up", h.SignUp)

		// Carousel HTMX endpoints
		e.GET("/carousel/next", h.CarouselNext)
		e.GET("/carousel/prev", h.CarouselPrev)

		// Protected routes
		dashboard := e.Group("/dashboard")
		dashboard.Use(authMiddleware.ClerkAuth())
		dashboard.GET("", h.Dashboard)
	})
}

// Handler is the Vercel serverless function entry point
func Handler(w http.ResponseWriter, r *http.Request) {
	e.ServeHTTP(w, r)
}
