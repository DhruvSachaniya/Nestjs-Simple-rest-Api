import { Module } from "@nestjs/common";
import { getuserController } from "./user.controller";

@Module({
    controllers: [getuserController],
})

export class getusermodule {}