import { Module } from "@nestjs/common";
import { AuthModule } from "./../src";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

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
        AuthModule.forRoot({
            publicKey: pubKey,
            privateKey: priKey,
            signOptions: {
                algorithm: "RS256",
                noTimestamp: true
            }
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class ApplicationModule {}
