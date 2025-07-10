package main

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/pocketbase/pocketbase"
	"github.com/timotejGerzelj/backend/controllers"
	"github.com/timotejGerzelj/backend/routes"
	"github.com/timotejGerzelj/backend/services/items"
)

type App struct {
	DBClient *pgxpool.Pool
}

var dbpool *pgxpool.Pool

// Declare the items for using them in initialization of other items
var ctx = context.Background()
var itemService *items.PocketbaseItemService
var itemHandler *controllers.ItemHandlerPocket

func main() {
	app := pocketbase.New()
	itemService = items.NewPocketbaseItemService(app)
	if itemService == nil {
		println("is null")
	}

	itemHandler = controllers.NewItemHandlerPocket(itemService)
	routes.RegisterItemRoutes(app, itemHandler)
	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
