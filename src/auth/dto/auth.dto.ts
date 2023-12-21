import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class Authdto {
    @IsString()
    @IsNotEmpty()
    email: string

    @IsNumber()
    @IsNotEmpty()
    password: string
}