import { IsString, IsEmail } from "class-validator";

export class CreateOrganizationDTO{
    @IsString()
    Name: string;

    @IsEmail()
    Email: string;

    @IsString()
    Password: string;
}