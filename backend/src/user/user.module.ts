import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/config/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from 'src/config/jwtConstant';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/config/jwt_strategy';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:jwtConstant.secret,
      signOptions:{expiresIn:jwtConstant.expires}
    })
  ],
  controllers: [UserController],
  providers: [UserService,PrismaService,JwtStrategy,RolesGuard],
})
export class UserModule {}
