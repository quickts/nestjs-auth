import { Provider } from "@nestjs/common";
import { AUTH_SECRET_OR_KEY } from "./auth.constants";

export function createAuthOptionProvider(secretOrKey: string | Buffer | undefined): Provider {
    return {
        provide: AUTH_SECRET_OR_KEY,
        useValue: secretOrKey
    };
}
