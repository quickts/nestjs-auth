# nestjs-auth

## Installation

    $ npm install @quickts/nestjs-auth

## Usage

```ts
// file: app.module.ts
import { Module } from "@nestjs/common";
import { AuthModule } from "@quickts/nestjs-auth";

const pubKey = `
-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKmndpB7Teiziw283cLtpTyW1Br9qegd
C7zDLJCkpEP0MMZTsciXQLShQaz0IsppmU2YSztLjjQe/5KYJtB58p8CAwEAAQ==
-----END PUBLIC KEY-----
`;

const priKey = `
-----BEGIN PRIVATE KEY-----
MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAqad2kHtN6LOLDbzd
wu2lPJbUGv2p6B0LvMMskKSkQ/QwxlOxyJdAtKFBrPQiymmZTZhLO0uONB7/kpgm
0HnynwIDAQABAkBDD0fFaofsMHQJlRsPPwJuhawHkzcC4eBO19MYxYuMtCeBJvNj
UsRLlYw/RCY3R48W5SYkbvZAsCE+Nj821P/JAiEA07gfKdvjBCPM29VDbZeyR3q4
8mx9BX5Cxwy2A6bMgNMCIQDNIxeAXKsmD3PhIq7OPtL3b6HmDJwCVbjIn2yVaS3H
hQIhAIFIVmdGKVr2zXqTwKfkUO4LB3KpQrKfBgHsRhz2trwXAiAWjWYXCZkTTR2b
QbngGM4Ov+oXpYk9RHlVLRm971tGFQIgQRrltq6er2Kh2EXseewR4k9ixc5gM2PS
mA/bjYL6AJ8=
-----END PRIVATE KEY-----
`;

@Module({
    imports: [
        AuthModule.forRoot("quickts"), // 指定secret, 其他参数默认
        AuthModule.forRoot({
            secret: "quickts",
            signOptions: {
                noTimestamp: true
            }
        }), // 指定secret, 其他参数自定义
        AuthModule.forRoot({
            publicKey: pubKey,
            privateKey: priKey,
            signOptions: {
                algorithm: "RS256",
                noTimestamp: true
            }
        }) // 使用非对称加密
    ],
    controllers: []
})
export class ApplicationModule {}

// file: other.ts
import { Controller, Post, Get, Body } from "@nestjs/common";
import { AuthService } from "@quickts/nestjs-auth";
import { User, AuthCheck } from "@quickts/nestjs-auth";

@Controller()
class OtherController {
    constructor(private readonly authService: AuthService) {}

    @Post("create")
    create(@Body() data: { uid: number; name: string }) {
        const accessToken = this.authService.createToken(data, { expiresIn: 3600 }); // 创建token
        return accessToken;
    }

    @AuthCheck() // 使用装饰器验证token
    @Get("check")
    async check(
        @User("uid") uid: number //使用装饰器提取用户信息
    ) {
        return uid;
    }
}
```

http 请求时添加请求头 Authorization: Bearer \${token}
