import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { jwtguard } from "src/guard";
import { Userdeco } from "./user-decorator";
import { User } from "@prisma/client";

@Controller("users")
export class getuserController {
    constructor() {}

    @UseGuards(jwtguard)
    @Get("mine")
    //req is coming from jwtstrategy by validate fucntion it can convert data into express request
    getuser(@Userdeco() user: User, @Userdeco('email') email: string) {
        console.log({
            email,
        })
        return user
    }
}