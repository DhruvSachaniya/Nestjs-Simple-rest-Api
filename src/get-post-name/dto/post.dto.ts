import { IsNotEmpty, IsString } from "class-validator";

export class postdto {
    @IsString()
    @IsNotEmpty()
    name: string
}