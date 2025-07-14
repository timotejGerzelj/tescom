package user

import (
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

type PocketbaseUserService struct {
	pb *pocketbase.PocketBase
}

func NewPocketbaseUserService(app *pocketbase.PocketBase) *PocketbaseUserService {
	return &PocketbaseUserService{pb: app}
}

func (s *PocketbaseUserService) GetUser(itemId string) models.User {
	var user models.User
	s.pb.DB().NewQuery("SELECT * FROM Users WHERE id = {:id}").Bind(dbx.Params{"id": itemId}).One(&user)

	return user
}
