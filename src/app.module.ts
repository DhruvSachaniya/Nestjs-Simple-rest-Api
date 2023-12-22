import { Module } from '@nestjs/common';
import { authmodule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { postmodule } from './get-post-name/post.module';
import { getusermodule } from './get-user/user.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),authmodule, postmodule, PrismaModule, getusermodule],
  controllers: [],
  providers: [],
})
export class AppModule {}
