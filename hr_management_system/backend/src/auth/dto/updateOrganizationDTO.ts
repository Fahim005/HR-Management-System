import { IsString, IsEmail } from "class-validator";

export class UpdateOrganizationDTO{
    @IsString()
    Name?: string;

    @IsEmail()
    Email?: string;

    @IsString()
    Password?: string;
}