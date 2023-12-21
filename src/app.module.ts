import { Module } from '@nestjs/common';
import { authmodule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { postmodule } from './get-post-name/post.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),authmodule, postmodule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
