package user

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

func (s *PocketbaseUserService) CreateUser(user models.User) error {
	layout := "2006-01-02 15:04:05.000Z"
	parsedTime, _ := time.Parse(layout, "2025-07-10 08:59:35.842Z")

	_, errorCreate := s.pb.DB().NewQuery(`
		INSERT INTO Users (email, password, phoneNumber, IBAN, role, createdAt) VALUES (
    	{:email}, 
    	{:password},
    	{:phoneNumber},
    	{:iban},
    	{:role},
    	{:createdAt}
		);
	`).Bind(dbx.Params{
		"email":       user.Email,
		"password":    user.Password,
		"phoneNumber": user.PhoneNumber,
		"iban":        user.Iban,
		"role":        false,
		"createdAt":   parsedTime,
	}).Execute()

	if errorCreate != nil {
		return errorCreate
	}

	return nil
}

func (s *PocketbaseUserService) UpdateUser(userToUpdate models.User) error {
	layout := "2006-01-02 15:04:05.000Z"
	parsedTime, _ := time.Parse(layout, "2025-07-10 08:59:35.842Z")
	println(userToUpdate.PhoneNumber)
	_, err := s.pb.DB().NewQuery(`
		UPDATE Users
		SET email = {:email}, password = {:password}, phoneNumber = {:phoneNumber}, IBAN = {:iban}, updatedAt = {:updatedAt}
		WHERE id = {:id}
	`).Bind(dbx.Params{
		"email":       userToUpdate.Email,
		"password":    userToUpdate.Password,
		"phoneNumber": userToUpdate.PhoneNumber,
		"iban":        userToUpdate.Iban,
		"updatedAt":   parsedTime,
		"id":          userToUpdate.ID,
	}).Execute()

	if err != nil {
		return err
	}

	return nil
}

func (s *PocketbaseUserService) DeleteUser(ctx context.Context, userId string) error {
	_, err := s.pb.DB().NewQuery(`DELETE FROM Users WHERE id = {:id}`).Bind(dbx.Params{"id": userId}).Execute()
	if err != nil {
		return err
	}
	return err
}
