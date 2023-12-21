import { Body, Controller,Get, Post } from "@nestjs/common";
import { authservice } from "./auth.service";
import { Authdto } from "./dto";


@Controller("auth")
export class authcontroller {
    constructor(private authservice: authservice) {
    }
    @Post("signup")
    signup(@Body() dto: Authdto) {
        return this.authservice.signup(dto);
    }
    @Post("signin")
    signin(@Body() dto: Authdto) {
        return this.authservice.signin(dto);
    }
}