package controllers

import (
	"net/http"

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

func GetItem(c *gin.Context) {
	id := c.Param("id") // get ID from URL path
	// Search for item by ID
	for _, item := range albums {
		if item.ID == id {
			c.JSON(http.StatusOK, item)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
}

func CreateItem(c *gin.Context) {
	var newItem models.Item

	if err := c.ShouldBindJSON(&newItem); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	albums = append(albums, newItem)

	c.JSON(http.StatusCreated, newItem)
}

func UpdateItem(c *gin.Context) {
	id := c.Param("id")
	var updatedItem models.Item

	if err := c.ShouldBindJSON(&updatedItem); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	for i, item := range albums {
		if item.ID == id {
			updatedItem.ID = id
			albums[i] = updatedItem
			c.JSON(http.StatusOK, updatedItem)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
}

func DeleteItem(c *gin.Context) {
	id := c.Param("id")

	for i, item := range albums {
		if item.ID == id {
			albums = append(albums[:i], albums[i+1:]...)
			c.JSON(http.StatusOK, gin.H{"message": "Item deleted"})
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
}
