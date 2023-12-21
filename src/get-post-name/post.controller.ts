import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { postservice } from "./post.service";
import { postdto } from "./dto";
import { jwtguard } from "src/guard";

@Controller("post")
export class postController {
    constructor(private postname: postservice) {}
    @Post("name")
    sendname(@Body() dto: postdto) {
        return this.postname.sendname(dto);
    }
    @UseGuards(jwtguard)
    @Get("name")
    getname(@Body() dto: postdto) {
        return this.postname.getname(dto);
    }
} 