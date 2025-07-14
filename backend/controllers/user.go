package controllers

import (
	"github.com/pocketbase/pocketbase/core"
	"github.com/timotejGerzelj/backend/services/user"
)

type UserHandlerPocket struct {
	Service *user.PocketbaseUserService
}

func NewUserHandlerPocket(service *user.PocketbaseUserService) *UserHandlerPocket {
	return &UserHandlerPocket{Service: service}
}

func (h *UserHandlerPocket) GetUser(c *core.RequestEvent) error {
	id := c.Request.PathValue("id")
	// Search for item by ID
	user := h.Service.GetUser(id)

	return c.JSON(200, user)

}
