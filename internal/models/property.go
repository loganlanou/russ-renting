package models

import (
	"time"
)

type PropertyType string

const (
	PropertyTypeHouse     PropertyType = "house"
	PropertyTypeApartment PropertyType = "apartment"
	PropertyTypeDuplex    PropertyType = "duplex"
)

type RoomType string

const (
	RoomTypeExterior RoomType = "exterior"
	RoomTypeLiving   RoomType = "living"
	RoomTypeKitchen  RoomType = "kitchen"
	RoomTypeBedroom  RoomType = "bedroom"
	RoomTypeBathroom RoomType = "bathroom"
	RoomTypeDining   RoomType = "dining"
	RoomTypeBackyard RoomType = "backyard"
	RoomTypeGarage   RoomType = "garage"
	RoomTypeOther    RoomType = "other"
)

type InquiryType string

const (
	InquiryTypeViewing     InquiryType = "viewing"
	InquiryTypeApplication InquiryType = "application"
	InquiryTypeGeneral     InquiryType = "general"
)

type Property struct {
	ID             int64        `json:"id"`
	Slug           string       `json:"slug"`
	Title          string       `json:"title"`
	Type           PropertyType `json:"type"`
	Address        string       `json:"address"`
	City           string       `json:"city"`
	State          string       `json:"state"`
	ZipCode        string       `json:"zipCode"`
	Price          int          `json:"price"`
	Deposit        int          `json:"deposit"`
	ApplicationFee int          `json:"applicationFee"`
	Bedrooms       int          `json:"bedrooms"`
	Bathrooms      float64      `json:"bathrooms"`
	SquareFeet     int          `json:"squareFeet"`
	Description    string       `json:"description"`
	Features       []string     `json:"features"`
	Available      bool         `json:"available"`
	AvailableDate  *time.Time   `json:"availableDate,omitempty"`
	PetFriendly    bool         `json:"petFriendly"`
	PetDeposit     *int         `json:"petDeposit,omitempty"`
	PetRent        *int         `json:"petRent,omitempty"`
	Parking        string       `json:"parking"`
	Laundry        string       `json:"laundry"`
	YearBuilt      *int         `json:"yearBuilt,omitempty"`
	Utilities      []string     `json:"utilities"`
	LeaseTerms     []string     `json:"leaseTerms"`
	Featured       bool         `json:"featured"`
	CreatedAt      time.Time    `json:"createdAt"`
	UpdatedAt      time.Time    `json:"updatedAt"`
	Images         []PropertyImage `json:"images,omitempty"`
}

type PropertyImage struct {
	ID           int64    `json:"id"`
	PropertyID   int64    `json:"propertyId"`
	URL          string   `json:"url"`
	Caption      string   `json:"caption"`
	Room         RoomType `json:"room"`
	DisplayOrder int      `json:"displayOrder"`
	CreatedAt    time.Time `json:"createdAt"`
}

type ContactSubmission struct {
	ID            int64       `json:"id"`
	Name          string      `json:"name"`
	Email         string      `json:"email"`
	Phone         string      `json:"phone"`
	PropertyID    *int64      `json:"propertyId,omitempty"`
	InquiryType   InquiryType `json:"inquiryType"`
	PreferredDate *time.Time  `json:"preferredDate,omitempty"`
	PreferredTime string      `json:"preferredTime,omitempty"`
	Message       string      `json:"message"`
	CreatedAt     time.Time   `json:"createdAt"`
}

type NewsletterSubscriber struct {
	ID           int64      `json:"id"`
	Email        string     `json:"email"`
	FirstName    string     `json:"firstName,omitempty"`
	SubscribedAt time.Time  `json:"subscribedAt"`
}

// Helper methods for Property
func (p *Property) TypeLabel() string {
	switch p.Type {
	case PropertyTypeHouse:
		return "House"
	case PropertyTypeApartment:
		return "Apartment"
	case PropertyTypeDuplex:
		return "Duplex"
	default:
		return string(p.Type)
	}
}

func (p *Property) BedroomText() string {
	if p.Bedrooms == 0 {
		return "Studio"
	}
	if p.Bedrooms == 1 {
		return "1 Bed"
	}
	return string(rune('0'+p.Bedrooms)) + " Beds"
}

func (p *Property) BathroomText() string {
	if p.Bathrooms == 1 {
		return "1 Bath"
	}
	if p.Bathrooms == float64(int(p.Bathrooms)) {
		return string(rune('0'+int(p.Bathrooms))) + " Baths"
	}
	// Handle .5 bathrooms
	whole := int(p.Bathrooms)
	return string(rune('0'+whole)) + ".5 Baths"
}

func (p *Property) FirstImage() *PropertyImage {
	if len(p.Images) > 0 {
		return &p.Images[0]
	}
	return nil
}

func (p *Property) ImagesByRoom(room RoomType) []PropertyImage {
	var images []PropertyImage
	for _, img := range p.Images {
		if img.Room == room {
			images = append(images, img)
		}
	}
	return images
}

func (p *Property) UniqueRooms() []RoomType {
	roomSet := make(map[RoomType]bool)
	var rooms []RoomType
	for _, img := range p.Images {
		if !roomSet[img.Room] {
			roomSet[img.Room] = true
			rooms = append(rooms, img.Room)
		}
	}
	return rooms
}

// Helper for RoomType
func (r RoomType) Label() string {
	switch r {
	case RoomTypeExterior:
		return "Exterior"
	case RoomTypeLiving:
		return "Living Room"
	case RoomTypeKitchen:
		return "Kitchen"
	case RoomTypeBedroom:
		return "Bedroom"
	case RoomTypeBathroom:
		return "Bathroom"
	case RoomTypeDining:
		return "Dining Room"
	case RoomTypeBackyard:
		return "Backyard"
	case RoomTypeGarage:
		return "Garage"
	case RoomTypeOther:
		return "Other"
	default:
		return string(r)
	}
}
