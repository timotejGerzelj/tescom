package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
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
var itemService *items.Service
var itemHandler *controllers.ItemHandler

func init() {
	// Initialize the connection pool
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	dbpool, err := pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))

	if err != nil {
		log.Fatal("Unable to connect to database:", err)
	}

	// Verify the connection
	if err := dbpool.Ping(ctx); err != nil {
		log.Fatal("Unable to ping database:", err)
	}
	fmt.Println("Connected to PostgreSQL database!")
	itemService = items.NewService(dbpool)
}

func main() {
	router := gin.Default()
	router.Use(cors.Default())
	itemHandler := controllers.NewItemHandler(itemService)

	//register all routes available to be called for item handlers
	routes.RegisterItemRoutes(router, itemHandler)
	router.Run("localhost:8080")
}
