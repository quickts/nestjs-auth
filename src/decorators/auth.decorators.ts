import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export function AuthCheck() {
    return UseGuards(AuthGuard("jwt"));
}
