import { IsString, IsEmail } from "class-validator";

export class UpdateEmployeeDTO{
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

    @IsString()
    JobCategory?: string;
}