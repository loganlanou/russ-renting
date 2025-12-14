.PHONY: dev build run clean templ css sqlc migrate test help

# Default target
help:
	@echo "Russ Rentals - Go + Templ + HTMX + Tailwind"
	@echo ""
	@echo "Usage:"
	@echo "  make dev        - Start development server with hot reload"
	@echo "  make build      - Build the application"
	@echo "  make run        - Run the built application"
	@echo "  make templ      - Generate Templ templates"
	@echo "  make css        - Build Tailwind CSS"
	@echo "  make sqlc       - Generate sqlc queries"
	@echo "  make migrate    - Run database migrations"
	@echo "  make test       - Run tests"
	@echo "  make clean      - Clean build artifacts"
	@echo ""

# Development with hot reload
dev: templ css
	@echo "Starting development server..."
	@air

# Build the application
build: templ css
	@echo "Building application..."
	@go build -o bin/server ./cmd/server

# Run the application
run: build
	@echo "Running application..."
	@./bin/server

# Generate Templ templates
templ:
	@echo "Generating Templ templates..."
	@templ generate

# Build Tailwind CSS
css:
	@echo "Building Tailwind CSS..."
	@npx tailwindcss -i static/css/input.css -o static/css/styles.css --minify

# Watch CSS changes
css-watch:
	@echo "Watching Tailwind CSS..."
	@npx tailwindcss -i static/css/input.css -o static/css/styles.css --watch

# Generate sqlc queries
sqlc:
	@echo "Generating sqlc queries..."
	@sqlc generate

# Run database migrations
migrate:
	@echo "Running migrations..."
	@goose -dir migrations postgres "$(DATABASE_URL)" up

# Run migrations down
migrate-down:
	@echo "Rolling back migrations..."
	@goose -dir migrations postgres "$(DATABASE_URL)" down

# Create new migration
migrate-create:
	@read -p "Migration name: " name; \
	goose -dir migrations create $$name sql

# Run tests
test:
	@echo "Running tests..."
	@go test -v ./...

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	@rm -rf bin/
	@rm -rf templates/**/*_templ.go
	@rm -f static/css/styles.css

# Install dependencies
deps:
	@echo "Installing Go dependencies..."
	@go mod download
	@echo "Installing Node dependencies..."
	@npm install
	@echo "Installing tools..."
	@go install github.com/a-h/templ/cmd/templ@latest
	@go install github.com/air-verse/air@latest
	@go install github.com/sqlc-dev/sqlc/cmd/sqlc@latest
	@go install github.com/pressly/goose/v3/cmd/goose@latest

# Setup project
setup: deps templ css
	@echo "Project setup complete!"
	@echo "Run 'make dev' to start development server"

# Format code
fmt:
	@echo "Formatting code..."
	@go fmt ./...
	@templ fmt templates/

# Lint code
lint:
	@echo "Linting code..."
	@golangci-lint run

# Generate all
generate: templ sqlc
	@echo "All code generated!"
