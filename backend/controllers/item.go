package controllers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/timotejGerzelj/backend/models"
	"github.com/timotejGerzelj/backend/services/items"
)

var albums = []models.Item{
	{ID: "1", Name: "Blue Train", Description: "John Coltrane", Price: 56.99},
	{ID: "2", Name: "Jeru", Description: "Gerry Mulligan", Price: 17.99},
	{ID: "3", Name: "Sarah Vaughan and Clifford Brown", Description: "Sarah Vaughan", Price: 39.99},
}

type ItemHandler struct {
	Service *items.Service
}

func NewItemHandler(service *items.Service) *ItemHandler {
	return &ItemHandler{Service: service}
}

func (h *ItemHandler) GetItems(c *gin.Context) {
	ctx := c.Request.Context()

	items, err := h.Service.GetAllItems(ctx)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, items)
}

func (h *ItemHandler) GetItem(c *gin.Context) {
	ctx := c.Request.Context()
	id := c.Param("id") // get ID from URL path
	// Search for item by ID
	item := h.Service.GetItem(ctx, id)

	c.JSON(200, item)
}

func (h *ItemHandler) CreateItem(c *gin.Context) {
	var newItem models.Item

	if err := c.ShouldBindJSON(&newItem); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := h.Service.CreateItem(c.Request.Context(), newItem)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, newItem)
}

func (h *ItemHandler) UpdateItem(c *gin.Context) {
	id := c.Param("id")
	var item models.Item

	if err := c.ShouldBindJSON(&item); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	item.ID = id
	item.UpdatedAt = time.Now().UTC()

	err := h.Service.UpdateItem(c.Request.Context(), item)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Item updated successfully"})
}

func (h *ItemHandler) DeleteItem(c *gin.Context) {
	id := c.Param("id")

	err := h.Service.DeleteItem(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Item deleted succesfully"})
}
