import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class jwtstrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService, private Prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get("SECRET_KEY"),
        })
    }

    async validate(payload: {userId: number, email:string }) {
        const user = await this.Prisma.user.findUnique({
            where: {
                id: payload.userId
            }
        })
        return user;
    }
} 