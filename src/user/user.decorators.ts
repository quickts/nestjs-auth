import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request, Response } from 'express';
export const User = createParamDecorator((data: string, context: ExecutionContext) => {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();
    const user: any = req.user;
    if (!user) {
        throw new Error(`Can't get user, you must use '@AuthCheck()'!`);
    }
    if (data) {
        return user[data];
    } else {
        return user;
    }
});
