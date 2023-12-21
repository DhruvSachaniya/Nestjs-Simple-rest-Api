import { ForbiddenException, Injectable } from "@nestjs/common";
import { postdto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ConfigService } from "@nestjs/config";
import { jwtstrategy } from "src/strategy";

@Injectable()
export class postservice {
    constructor(private prisma: PrismaService,
                private config: ConfigService,
                private jwt: jwtstrategy    
    ) { }
    async sendname(dto: postdto) {
        try {
            const user = await this.prisma.name.create({
                data: {
                    name: dto.name
                },
            })
            return user;
        } catch (erorr) {
            if (erorr instanceof PrismaClientKnownRequestError) {
                if (erorr.code === 'P2002') {
                    throw new ForbiddenException("Credentials taken");
                }
            } throw erorr
        }
    }

    async getname(dto: postdto) {
        const user = await this.prisma.name.findUnique({
            where: {
                name: dto.name,
            },
        });

        if (!user)
            throw new ForbiddenException(
                "Credentials incorrect?",
            );
        return user;
    }
}