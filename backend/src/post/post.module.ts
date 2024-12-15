import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstant } from 'src/config/jwtConstant';
import { PrismaService } from 'src/config/prisma.service';
@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:jwtConstant.secret,
      signOptions:{expiresIn:jwtConstant.expires}
    })
  ],
  controllers: [PostController],
  providers: [PostService,PrismaService,JwtService],
})
export class PostModule {}
