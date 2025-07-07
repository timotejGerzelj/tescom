package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/timotejGerzelj/backend/controllers"
)

func RegisterItemRoutes(r *gin.Engine, handler *controllers.ItemHandler) {
	items := r.Group("/items")
	{
		//Handlers declared in the controllers this one is for item.go
		items.GET("", handler.GetItems)          //tested
		items.GET("/:id", handler.GetItem)       //tested
		items.POST("", handler.CreateItem)       //tested
		items.PUT("/:id", handler.UpdateItem)    //tested
		items.DELETE("/:id", handler.DeleteItem) //tested
	}
}
