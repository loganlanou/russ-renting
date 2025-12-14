package config

import (
	"os"
)

type Config struct {
	DatabaseURL          string
	ClerkSecretKey       string
	ClerkPublishableKey  string
	Port                 string
	Environment          string
}

func Load() *Config {
	return &Config{
		DatabaseURL:          getEnv("DATABASE_URL", ""),
		ClerkSecretKey:       getEnv("CLERK_SECRET_KEY", ""),
		ClerkPublishableKey:  getEnv("CLERK_PUBLISHABLE_KEY", ""),
		Port:                 getEnv("PORT", "3000"),
		Environment:          getEnv("ENVIRONMENT", "development"),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func (c *Config) IsDevelopment() bool {
	return c.Environment == "development"
}

func (c *Config) IsProduction() bool {
	return c.Environment == "production"
}
