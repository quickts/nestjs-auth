import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>("roles", context.getHandler());
        if (!roles || !roles.length) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return user && user.roles && user.roles.some((role: string) => roles.includes(role));
    }
}
