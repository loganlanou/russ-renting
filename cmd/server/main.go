package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"russ-rentals/internal/config"
	"russ-rentals/internal/database"
	"russ-rentals/internal/handlers"
	authMiddleware "russ-rentals/internal/middleware"
)

func main() {
	cfg := config.Load()

	// Initialize database
	ctx := context.Background()
	db, err := database.Connect(ctx, cfg.DatabaseURL)
	if err != nil {
		log.Printf("Warning: Database not connected: %v", err)
		db = nil
	}
	if db != nil {
		defer db.Close()
	}

	// Create handler with dependencies
	h := handlers.NewHandler(db)

	// Create Echo instance
	e := echo.New()
	e.HideBanner = true

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.Gzip())
	e.Use(authMiddleware.OptionalClerkAuth())

	// Static files
	e.Static("/static", "static")

	// Setup routes
	setupRoutes(e, h)

	// Start server
	go func() {
		if err := e.Start(":" + cfg.Port); err != nil {
			log.Printf("Server stopped: %v", err)
		}
	}()

	// Graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := e.Shutdown(ctx); err != nil {
		log.Fatal(err)
	}
}

func setupRoutes(e *echo.Echo, h *handlers.Handler) {
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
}
