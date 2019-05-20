import { Controller, Get } from "@nestjs/common";
import { AuthCheck } from "./../src";
import { AppService } from "./app.service";

@Controller("auth")
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get("token")
    createToken(): Promise<any> {
        return this.appService.createToken();
    }

    // Authorization: Bearer token
    @Get("data")
    @AuthCheck()
    findAll() {
        // this route is restricted by AuthGuard
        // JWT strategy
        return [1, 2, 3];
    }
}
