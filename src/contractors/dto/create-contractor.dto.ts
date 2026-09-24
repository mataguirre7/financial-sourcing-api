import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class CreateContractorDto {
    @IsNotEmpty()
    @MaxLength(128)
    name!: string;

    @IsEmail()
    email!: string;
}