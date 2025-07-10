package routes

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/timotejGerzelj/backend/controllers"
)

func RegisterItemRoutes(app *pocketbase.PocketBase, handler *controllers.ItemHandlerPocket) {
	if handler != nil {
		println("is nil")
	}
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		itemsGroup := se.Router.Group("/items")

		itemsGroup.GET("/", handler.GetItems)
		itemsGroup.GET("/{id}", handler.GetItem)
		itemsGroup.POST("/create", handler.CreateItem)
		itemsGroup.PUT("/{id}", handler.UpdateItem)
		itemsGroup.DELETE("/{id}", handler.DeleteItem)

		return se.Next()
	})
}
