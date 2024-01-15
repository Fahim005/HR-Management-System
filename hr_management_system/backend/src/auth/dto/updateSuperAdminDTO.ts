import { IsString, IsEmail } from "class-validator";

export class UpdateSuperAdminDTO{
    @IsString()
    Name?: string;

    @IsEmail()
    Email?: string;

    @IsString()
    Gender?: string;

    
    DOB?: Date;

    @IsString()
    PhoneNum?: string;

    @IsString()
    Password?: string;
}