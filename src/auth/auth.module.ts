import { Global, Module, DynamicModule } from "@nestjs/common";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { createAuthOptionProvider } from "./auth.provider";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({})
export class AuthModule {
    static forRoot(options: JwtModuleOptions | string): DynamicModule {
        const optionProvider = createAuthOptionProvider(typeof options == "string" ? options : options.publicKey || options.secret);
        return {
            module: AuthModule,
            providers: [optionProvider, AuthService, JwtStrategy],
            exports: [AuthService],
            imports: [PassportModule.register({}), JwtModule.register(typeof options == "string" ? { secret: options } : options)]
        };
    }
}

@Global()
@Module({})
export class AuthGlobalModule {
    static forRoot(options: JwtModuleOptions | string): DynamicModule {
        const optionProvider = createAuthOptionProvider(typeof options == "string" ? options : options.publicKey || options.secret);
        return {
            module: AuthGlobalModule,
            providers: [optionProvider, AuthService, JwtStrategy],
            exports: [AuthService],
            imports: [PassportModule.register({}), JwtModule.register(typeof options == "string" ? { secret: options } : options)]
        };
    }
}
