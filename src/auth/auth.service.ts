import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignOptions, VerifyOptions, DecodeOptions } from "jsonwebtoken";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}
    createToken(user: object, options?: SignOptions) {
        const token = this.jwtService.sign(user, options);
        // const result = this.jwtService.verify(token);
        // console.log(result);
        return token;
    }

    verifyToken(token: string, options?: VerifyOptions) {
        return this.jwtService.verify(token, options);
    }

    decodeToken(token: string, options?: DecodeOptions) {
        return this.jwtService.decode(token, options);
    }
}
