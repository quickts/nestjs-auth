import { createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator((data, req) => {
    if (!req.user) {
        throw new Error(`Can't get user, you must use '@AuthCheck()'!`);
    }
    if (data) {
        return req.user[data];
    } else {
        return req.user;
    }
});
