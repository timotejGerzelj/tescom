export interface User 
{
    id: string;
    password: string;
    tokenKey: string,
    email: string;
    verified: boolean;
    phoneNumber: string;
    iban: string;
    role: boolean;
    createdAt: Date;
    updatedAt: Date;
}