import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserIdentity } from '../../../domain/model/userIdentity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret',
            passReqToCallback: true,
        });
    }

    /**
     * passport-jwt will call this method after validating and decoding the token.
     * This means that at this point we are guaranteed to receive a valid JWT token,
     * all we have to do is create the object we want to set in our "req.user".
     * @param payload
     * @returns
     */
    async validate(payload: any): Promise<UserIdentity> {
        return new UserIdentity(payload.sub, payload.scopes);
    }
}
