package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/items", getAlbums)

	router.Run("localhost:8080")
}

type Item struct {
	ID          string  `json:"id"`
	Name        string  `json:"title"`
	Price       float64 `json:"artist"`
	Description string  `json:"price"`
}

var albums = []Item{
	{ID: "1", Name: "Blue Train", Description: "John Coltrane", Price: 56.99},
	{ID: "2", Name: "Jeru", Description: "Gerry Mulligan", Price: 17.99},
	{ID: "3", Name: "Sarah Vaughan and Clifford Brown", Description: "Sarah Vaughan", Price: 39.99},
}

func getAlbums(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, albums)
}
