package main

import (
	"github.com/gin-gonic/gin"
	"github.com/timotejGerzelj/backend/routes"
)

func main() {
	router := gin.Default()
	//register all routes available to be called for item
	routes.RegisterItemRoutes(router)
	router.Run("localhost:8080")
}
