import { Module } from "@nestjs/common";
import { postController } from "./post.controller";
import { postservice } from "./post.service";
import { jwtstrategy } from "src/strategy";

@Module({
    providers: [postservice,jwtstrategy],
    controllers: [postController]
})
export class postmodule {}