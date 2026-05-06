import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from './config/jwt.config';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    /**
     * Inject jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {
    const jwtSecret = jwtConfiguration.secret ?? process.env.JWT_SECRET ?? '';

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
      audience: jwtConfiguration.audience,
      issuer: jwtConfiguration.issuer,
    });
  }

  async validate(payload: { sub: string; email: string }) {
    // 'sub' typically holds the user ID – adjust to your token shape
    console.log('JWT payload:', payload);
    return { id: payload.sub, email: payload.email };
  }
}
