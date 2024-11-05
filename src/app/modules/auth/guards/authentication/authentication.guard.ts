import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';
import { ENUM_ROLES } from 'src/common/enums/user.enum';
import { ROLES_KEY } from 'src/common/constants/user.constant';
import { REQUEST_USER_KEY } from '../../constants/auth.constants';
import jwtConfig from '../../config/jwt.config';


@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);

    // Skip access token verification for the /api/v1/refresh-token route
    if (request.path === '/api/v1/auth/refresh-tokens') {
      return true;
    }

    // Authentication: Verify the JWT token
    const token = this.extractTokenFromHeader(request);

    // Role-based authorization: Check for required roles
    const requiredRoles = this.reflector.getAllAndOverride<ENUM_ROLES[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (token) {
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          this.jwtConfiguration,
        );
        // Attach the payload to the request
        request[REQUEST_USER_KEY] = payload;
      } catch (error) {
        console.log(error)
        throw new UnauthorizedException('Invalid or expired token.');
      }
    } else if (requiredRoles?.length > 0) {
      throw new UnauthorizedException(
        'Authentication required for this route.',
      );
    }

    // If roles are defined, ensure the user has the required roles
    if (requiredRoles?.length > 0) {
      const user = request[REQUEST_USER_KEY];
      const hasRole = requiredRoles.some((role) => user.role === role);
      if (!hasRole) {
        throw new ForbiddenException('You do not have the required role.');
      }
    }

    return true;
  }

  private getRequest(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
