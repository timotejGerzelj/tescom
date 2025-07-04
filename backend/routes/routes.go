package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/timotejGerzelj/backend/controllers"
)

func RegisterItemRoutes(r *gin.Engine, handler *controllers.ItemHandler) {
	items := r.Group("/items")
	{
		//Handlers declared in the controllers this one is for item.go
		items.GET("", handler.GetItems)
		items.GET("/:id", controllers.GetItem)
		items.POST("", controllers.CreateItem)
		items.PUT("/:id", controllers.UpdateItem)
		items.DELETE("/:id", controllers.DeleteItem)
	}
}
