package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/timotejGerzelj/backend/controllers"
)

func RegisterItemRoutes(r *gin.Engine) {
	items := r.Group("/items")
	{
		//Handlers declared in the controllers this one is for item.go
		items.GET("", controllers.GetItems)
		//items.GET("/:id", handlers.GetItem)
		//items.POST("", handlers.CreateItem)
		//items.PUT("/:id", handlers.UpdateItem)
		//items.DELETE("/:id", handlers.DeleteItem)
	}
}
