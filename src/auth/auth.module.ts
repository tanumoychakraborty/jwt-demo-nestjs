import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';
import { readFileSync } from 'fs';

const ACCESS_TOKEN_PUB_KEY = readFileSync(
  './certs/accessTokenPubliKey.pem',
  'utf-8'
);

@Module({
  imports: [UserModule, PassportModule,
    JwtModule.register({
      //secret: ACCESS_TOKEN_PUB_KEY,
      publicKey: ACCESS_TOKEN_PUB_KEY,
    }),
],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
