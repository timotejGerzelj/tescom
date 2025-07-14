package models

import (
	"time"
)

type Item struct {
	ID            string  `json:"id"`
	Name          string  `json:"name"`
	Quantity      float64 `json:"quantity"`
	UnitOfMeasure string  `json:"unitOfMeasure"`
	Price         float64 `json:"price"`
	Description   string  `json:"description"`
	CreatedAt     string  `json:"createdAt"`
	UpdatedAt     string  `json:"updatedAt"`
}

type User struct {
	ID          string    `json:"id"`
	Password    string    `json:"password"`
	TokenKey    string    `json:"tokenKey"`
	Email       string    `json:"email"`
	Verified    bool      `json:"verified"`
	PhoneNumber string    `json:"phoneNumber"`
	Iban        string    `json:"iban"`
	Role        bool      `json:"role"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

type Chat struct {
	ID        string    `json:"id"`
	ItemId    string    `json:"role"`
	UserId    string    `json:"userID`
	Status    bool      `json:"status"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type ChatMessage struct {
	ID         string    `json:"id"`
	ItemId     string    `json:"itemId"`
	UserId     string    `json:"userId"`
	Message    string    `json:"message"`
	PriceOffer float64   `json:"priceOffer"`
	CreatedAt  time.Time `json:"createdAt"`
	UpdatedAt  time.Time `json:"updatedAt"`
}

type Login struct {
	HashedPassword string
	SessionToken   string
	CSRFToken      string
}
