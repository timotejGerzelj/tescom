package routes

import (
	"net/http"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/timotejGerzelj/backend/controllers"
)

func RegisterItemRoutes(app *pocketbase.PocketBase, handler *controllers.ItemHandlerPocket) {
	if handler != nil {
		println("Item handler is nil")
	}
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		corsConfig := apis.CORSConfig{
			AllowOrigins: []string{"http://localhost:4200"}, // your Angular dev origin
			AllowHeaders: []string{"Content-Type", "Authorization"},
			AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete, http.MethodOptions},
		}
		itemsGroup := se.Router.Group("/items")
		itemsGroup.Bind(apis.CORS(corsConfig))
		itemsGroup.GET("/", handler.GetItems)
		itemsGroup.GET("/{id}", handler.GetItem)
		itemsGroup.POST("/create", handler.CreateItem)
		itemsGroup.PUT("/{id}", handler.UpdateItem)
		itemsGroup.DELETE("/{id}", handler.DeleteItem)

		return se.Next()
	})
}

func RegisterUserRoutes(app *pocketbase.PocketBase, handler *controllers.UserHandlerPocket) {
	if handler != nil {
		println("User handler is nil")
	}
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		corsConfig := apis.CORSConfig{
			AllowOrigins: []string{"http://localhost:4200"}, // your Angular dev origin
			AllowHeaders: []string{"Content-Type", "Authorization"},
			AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete, http.MethodOptions},
		}
		userGroup := se.Router.Group("/user")
		userGroup.Bind(apis.CORS(corsConfig))
		userGroup.GET("/{id}", handler.GetUser)
		userGroup.POST("/create", handler.CreateUser)
		userGroup.PUT("/{id}", handler.UpdateUser)
		userGroup.DELETE("/{id}", handler.DeleteUser)

		return se.Next()
	})
}
