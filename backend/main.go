package main

import (
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/pocketbase/pocketbase"
	"github.com/timotejGerzelj/backend/controllers"
	"github.com/timotejGerzelj/backend/routes"
	"github.com/timotejGerzelj/backend/services/item"
	"github.com/timotejGerzelj/backend/services/user"
)

type App struct {
	DBClient *pgxpool.Pool
}

// Declare the items for using them in initialization of other items
var itemService *item.PocketbaseItemService
var itemHandler *controllers.ItemHandlerPocket
var userService *user.PocketbaseUserService
var userHandler *controllers.UserHandlerPocket

func main() {
	app := pocketbase.New()

	//Item
	itemService = item.NewPocketbaseItemService(app)
	if itemService == nil {
		println("ItemService is null")
	}
	itemHandler = controllers.NewItemHandlerPocket(itemService)
	routes.RegisterItemRoutes(app, itemHandler)

	//User
	userService = user.NewPocketbaseUserService(app)
	if userService == nil {
		println("UserService is null")
	}
	userHandler = controllers.NewUserHandlerPocket(userService)
	routes.RegisterUserRoutes(app, userHandler)

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
