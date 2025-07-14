package item

import (
	"context"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/timotejGerzelj/backend/models"
)

type Service struct {
	DB *pgxpool.Pool
}

func NewService(db *pgxpool.Pool) *Service {
	return &Service{DB: db}
}

type PocketbaseItemService struct {
	pb *pocketbase.PocketBase
}

func NewPocketbaseItemService(app *pocketbase.PocketBase) *PocketbaseItemService {
	return &PocketbaseItemService{pb: app}
}

func (s *PocketbaseItemService) GetAllItems() ([]models.Item, error) {
	var items []models.Item
	err := s.pb.DB().NewQuery("SELECT * FROM Items").All(&items)

	if err != nil {
		return nil, err
	}
	return items, nil
}

func (s *PocketbaseItemService) GetItem(itemId string) models.Item {
	var item models.Item
	s.pb.DB().NewQuery("SELECT * FROM Items WHERE id = {:id}").Bind(dbx.Params{"id": itemId}).One(&item)

	return item
}

func (s *PocketbaseItemService) CreateItem(item models.Item) error {
	createdAt := time.Now()
	_, err := s.pb.DB().NewQuery(`
		INSERT INTO Items (name, quantity, price, unitOfMeasure, description, createdAt) VALUES (
    	{:name}, 
    	{:quantity},
    	{:price},
    	{:unitOfMeasure},
    	{:description},
    	{:createdAt}
		);
	`).Bind(dbx.Params{
		"name":          item.Name,
		"quantity":      item.Quantity,
		"price":         item.Price,
		"unitOfMeasure": item.UnitOfMeasure,
		"description":   item.Description,
		"createdAt":     createdAt,
	}).Execute()

	if err != nil {
		return err
	}

	return nil
}

func (s *PocketbaseItemService) UpdateItem(itemToUpdate models.Item) error {
	updatedAt := time.Now()
	_, err := s.pb.DB().NewQuery(`
		UPDATE Items
		SET name = {:name}, quantity = {:quantity}, price = {:price}, description = {:description}, unitOfMeasure = {:unitOfMeasure}, updatedAt = {:updatedAt}
		WHERE id = {:id}
	`).Bind(dbx.Params{
		"name":          itemToUpdate.Name,
		"quantity":      itemToUpdate.Quantity,
		"price":         itemToUpdate.Price,
		"unitOfMeasure": itemToUpdate.UnitOfMeasure,
		"description":   itemToUpdate.Description,
		"updatedAt":     updatedAt,
		"id":            itemToUpdate.ID,
	}).Execute()

	if err != nil {
		return err
	}

	return nil
}

func (s *PocketbaseItemService) DeleteItem(ctx context.Context, itemId string) error {
	_, err := s.pb.DB().NewQuery(`DELETE FROM Items WHERE id = {:id}`).Bind(dbx.Params{"id": itemId}).Execute()
	if err != nil {
		return err
	}
	return err
}
