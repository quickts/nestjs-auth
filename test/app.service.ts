import { Injectable } from "@nestjs/common";
import { AuthService } from "./../src";

@Injectable()
export class AppService {
    constructor(private readonly authService: AuthService) {}

    async createToken() {
        const token = this.authService.createToken(
            {
                uid: 10
            },
            { expiresIn: 60 }
        );
        return {
            expiresIn: 60,
            token
        };
    }
}
