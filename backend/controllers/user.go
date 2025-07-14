package controllers

import (
	"net/http"
	"time"

	"github.com/pocketbase/pocketbase/core"
	"github.com/timotejGerzelj/backend/models"
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
	println("HEllo ", id)
	user := h.Service.GetUser(id)

	return c.JSON(200, user)

}

func (h *UserHandlerPocket) CreateUser(c *core.RequestEvent) error {
	var newUser models.User

	if err := c.BindBody(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return c.JSON(500, nil)
	}

	err := h.Service.CreateUser(newUser)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return c.JSON(500, nil)
	}
	return c.JSON(http.StatusCreated, newUser)
}

func (h *UserHandlerPocket) UpdateUser(c *core.RequestEvent) error {
	id := c.Request.PathValue("id")
	var user models.User
	if err := c.BindBody(&user); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return c.JSON(500, nil)
	}

	user.ID = id
	user.UpdatedAt = time.Now()

	err := h.Service.UpdateUser(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, map[string]string{
		"message": "Item was updated",
	})
}

func (h *UserHandlerPocket) DeleteUser(c *core.RequestEvent) error {
	id := c.Request.PathValue("id")

	err := h.Service.DeleteUser(c.Request.Context(), id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "User deleted succesfully"})
}
