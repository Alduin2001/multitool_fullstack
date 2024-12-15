import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MellmemeModule } from './mellmeme/mellmeme.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './config/jwtConstant';
import { MulterModule } from '@nestjs/platform-express';
import { ThrottlerModule } from '@nestjs/throttler';
import { PostModule } from './post/post.module';
import { OperationSysModule } from './operation_sys/operation_sys.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl:10,
      limit:10
    }]),
    JwtModule.register({
      secret:jwtConstant.secret,
      signOptions:{expiresIn:jwtConstant.expires}
    }),
    UserModule, MellmemeModule, PostModule, OperationSysModule, ApplicationModule],
})
export class AppModule { }
