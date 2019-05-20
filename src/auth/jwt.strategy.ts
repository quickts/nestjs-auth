import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AUTH_SECRET_OR_KEY } from "./auth.constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(AUTH_SECRET_OR_KEY) secretOrKey: string | Buffer) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secretOrKey
        });
    }

    async validate(user: any) {
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
