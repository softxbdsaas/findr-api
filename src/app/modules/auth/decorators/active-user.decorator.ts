import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { REQUEST_USER_KEY } from '../constants/auth.constants';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ActiveUserData = request[REQUEST_USER_KEY];

    // If a user passes a field to the decorator use only that field
    return field ? user?.[field] : user;
  },
);
