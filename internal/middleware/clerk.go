package middleware

import (
	"net/http"
	"os"
	"strings"

	"github.com/clerk/clerk-sdk-go/v2"
	"github.com/clerk/clerk-sdk-go/v2/jwt"
	"github.com/labstack/echo/v4"
)

type UserClaims struct {
	UserID string
	Email  string
}

// ClerkAuth is middleware that requires authentication
func ClerkAuth() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			claims, err := verifySession(c)
			if err != nil {
				return c.Redirect(http.StatusTemporaryRedirect, "/sign-in")
			}

			c.Set("userID", claims.Subject)
			c.Set("sessionClaims", claims)

			return next(c)
		}
	}
}

// OptionalClerkAuth checks for auth but doesn't require it
func OptionalClerkAuth() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			claims, err := verifySession(c)
			if err == nil {
				c.Set("userID", claims.Subject)
				c.Set("sessionClaims", claims)
				c.Set("isAuthenticated", true)
			} else {
				c.Set("isAuthenticated", false)
			}
			return next(c)
		}
	}
}

func verifySession(c echo.Context) (*clerk.SessionClaims, error) {
	// Initialize Clerk if not already done
	clerk.SetKey(os.Getenv("CLERK_SECRET_KEY"))

	sessionToken := ""

	// Check cookie first
	cookie, err := c.Cookie("__session")
	if err == nil {
		sessionToken = cookie.Value
	}

	// Fallback to Authorization header
	if sessionToken == "" {
		authHeader := c.Request().Header.Get("Authorization")
		if strings.HasPrefix(authHeader, "Bearer ") {
			sessionToken = strings.TrimPrefix(authHeader, "Bearer ")
		}
	}

	if sessionToken == "" {
		return nil, echo.ErrUnauthorized
	}

	// Verify the session token
	claims, err := jwt.Verify(c.Request().Context(), &jwt.VerifyParams{
		Token: sessionToken,
	})
	if err != nil {
		return nil, err
	}

	return claims, nil
}

// GetUserID retrieves the user ID from context
func GetUserID(c echo.Context) string {
	if userID, ok := c.Get("userID").(string); ok {
		return userID
	}
	return ""
}

// IsAuthenticated checks if user is authenticated
func IsAuthenticated(c echo.Context) bool {
	if auth, ok := c.Get("isAuthenticated").(bool); ok {
		return auth
	}
	return false
}
