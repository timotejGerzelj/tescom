package items

import (
	"context"

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
