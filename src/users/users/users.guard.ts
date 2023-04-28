import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userWanted = this.extractUserId(request);

        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_SECRET'),

            });
            if(payload.id !== userWanted){
                throw new UnauthorizedException();
              }
              return true;
        }
        catch(err){
            throw new UnauthorizedException(err.message);
        }


    }
    private extractUserId(request: FastifyRequest) {
        const id = request.params["id"];
        return (id) ? parseInt(id) : undefined;
    }
    private extractTokenFromHeader(request: FastifyRequest): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
