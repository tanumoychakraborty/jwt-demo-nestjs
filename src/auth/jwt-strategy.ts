import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

const ACCESS_TOKEN_PUB_KEY = readFileSync(
  './certs/accessTokenPubliKey.pem',
  'utf-8'
);


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: ACCESS_TOKEN_PUB_KEY,
        }
    );
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }

  async verify(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
