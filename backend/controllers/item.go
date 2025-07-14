package controllers

import (
	"net/http"
	"time"

	"github.com/pocketbase/pocketbase/core"
	"github.com/timotejGerzelj/backend/models"
	"github.com/timotejGerzelj/backend/services/item"
)

type ItemHandlerPocket struct {
	Service *item.PocketbaseItemService
}

func NewItemHandlerPocket(service *item.PocketbaseItemService) *ItemHandlerPocket {
	return &ItemHandlerPocket{Service: service}
}

func (h *ItemHandlerPocket) GetItems(c *core.RequestEvent) error {
	items, err := h.Service.GetAllItems()
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "Item not found"})
	}

	return c.JSON(http.StatusOK, items)
}

func (h *ItemHandlerPocket) GetItem(c *core.RequestEvent) error {
	id := c.Request.PathValue("id")
	// Search for item by ID
	item := h.Service.GetItem(id)

	return c.JSON(200, item)
}

func (h *ItemHandlerPocket) CreateItem(c *core.RequestEvent) error {
	var newItem models.Item

	if err := c.BindBody(&newItem); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return c.JSON(500, nil)
	}
	err := h.Service.CreateItem(newItem)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return c.JSON(500, nil)
	}
	return c.JSON(http.StatusCreated, newItem)
}

func (h *ItemHandlerPocket) UpdateItem(c *core.RequestEvent) error {
	id := c.Request.PathValue("id")
	var item models.Item

	if err := c.BindBody(&item); err != nil {
		c.JSON(http.StatusBadRequest, err.Error())
		return c.JSON(500, nil)
	}

	item.ID = id
	item.UpdatedAt = time.Now().UTC()

	err := h.Service.UpdateItem(item)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, map[string]string{
		"message": "Item was updated",
	})
}

func (h *ItemHandlerPocket) DeleteItem(c *core.RequestEvent) error {
	id := c.Request.PathValue("id")

	err := h.Service.DeleteItem(c.Request.Context(), id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "Item deleted succesfully"})
}
