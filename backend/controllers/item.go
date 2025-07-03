package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/timotejGerzelj/backend/models"
)

var albums = []models.Item{
	{ID: "1", Name: "Blue Train", Description: "John Coltrane", Price: 56.99},
	{ID: "2", Name: "Jeru", Description: "Gerry Mulligan", Price: 17.99},
	{ID: "3", Name: "Sarah Vaughan and Clifford Brown", Description: "Sarah Vaughan", Price: 39.99},
}

func GetItems(c *gin.Context) {
	//calls backend
	//items, err := services.GetAllItems()
	//if err != nil {
	//		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	//		return
	//}
	c.JSON(http.StatusOK, albums)
}
