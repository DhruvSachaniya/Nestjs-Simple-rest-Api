import { Module } from "@nestjs/common";
import { authcontroller } from "./auth.controller";
import { authservice } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { jwtstrategy } from "src/strategy";

@Module({
    imports: [],
    providers: [authservice, JwtService],
    controllers: [authcontroller]
})
export class authmodule {}