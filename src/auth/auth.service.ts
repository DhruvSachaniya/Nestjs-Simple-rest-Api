import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2";
import { Authdto } from "./dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable({})
export class authservice {
    constructor(private Prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }
    async signup(dto: Authdto) {
        const hash = await argon.hash(dto.password);

        try {
            const user = await this.Prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                }
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

    async signin(dto: Authdto) {
        try {
            const user = await this.Prisma.user.findUnique({
                where: {
                    email: dto.email,
                }
            })

            if(!user) {
                throw new ForbiddenException(
                    "user not found!"
                );
            }

            const hashmatch = await argon.verify(user.hash, dto.password);

            if(!hashmatch) {
                throw new ForbiddenException(
                    "password incorect!"
                )
            }
            const payload = {
                userId: user.id,
                email: user.email
            }

            const token = await this.jwt.signAsync(payload, {
                secret: this.config.get("SECRET_KEY")
            })

            return {
                access_token : token
            }
        } catch (erorr) {
            if (erorr instanceof PrismaClientKnownRequestError) {
                if (erorr.code === 'P2002') {
                    throw new ForbiddenException("Credentials taken");
                }
            } throw erorr
        }
    } 

    async signtoken (userId: number, hash: string) {

    }

}