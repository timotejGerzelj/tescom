package items

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/timotejGerzelj/backend/models"
)

type Service struct {
	DB *pgxpool.Pool
}

func NewService(db *pgxpool.Pool) *Service {
	return &Service{DB: db}
}

func (s *Service) GetAllItems(ctx context.Context) ([]models.Item, error) {
	var items []models.Item
	rows, err := s.DB.Query(ctx, `SELECT * FROM Items`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var item models.Item
		err := rows.Scan(
			&item.ID,
			&item.Name,
			&item.Quantity,
			&item.Price,
			&item.Description,
			&item.CreatedAt,
			&item.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		items = append(items, item)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return items, nil
}

func (s *Service) GetItem(ctx context.Context, itemId string) models.Item {
	var item models.Item
	row := s.DB.QueryRow(ctx, `SELECT * FROM Items WHERE ID=$1`, itemId)
	row.Scan(&item.ID,
		&item.Name,
		&item.Quantity,
		&item.Price,
		&item.Description,
		&item.CreatedAt,
		&item.UpdatedAt)
	return item
}

func (s *Service) UpdateItem(ctx context.Context, itemToUpdate models.Item) error {
	query := `
		UPDATE Items
		SET name = $1, quantity = $2, price = $3, description = $4, updated_at = NOW()
		WHERE ID=$5
	`

	cmdTag, err := s.DB.Exec(ctx, query,
		itemToUpdate.Name,
		itemToUpdate.Quantity,
		itemToUpdate.Price,
		itemToUpdate.Description,
		itemToUpdate.ID,
	)
	if err != nil {
		return err
	}
	if cmdTag.RowsAffected() == 0 {
		return fmt.Errorf("no item found with ID %s", itemToUpdate.ID)
	}

	return nil
}

func (s *Service) DeleteItem(ctx context.Context, itemId string) error {
	query := `DELETE FROM Items WHERE $1=ID`
	cmdTag, err := s.DB.Exec(ctx, query, itemId)
	if err != nil {
		return err
	}
	if cmdTag.RowsAffected() == 0 {
		return fmt.Errorf("no item found with ID %s", itemId)
	}
	return err
}

func (s *Service) CreateItem(ctx context.Context, item models.Item) error {
	createdAt := time.Now()
	query := `
		INSERT INTO Items (ID, name, quantity, price, description, created_at) VALUES (
    	$1::UUID,
    	$2,
    	$3,
    	$4,
    	$5,
    	$6
		);
	`

	cmdTag, err := s.DB.Exec(ctx, query,
		item.ID,
		item.Name,
		item.Quantity,
		item.Price,
		item.Description,
		createdAt,
	)
	if err != nil {
		return err
	}
	if cmdTag.RowsAffected() == 0 {
		return fmt.Errorf("no item found with ID %s", item.ID)
	}

	return nil
}
