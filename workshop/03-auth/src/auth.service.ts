import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { users } from './users';

const refreshTokensStore: Record<string, string> = {};

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        return users.find((u: any) => u.username === username && u.password === password);
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        const accessToken = this.generateAccessToken(payload);
        const refreshToken = this.generateRefreshToken(payload);
        refreshTokensStore[user.id] = refreshToken;
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    async refreshToken(userId: string, refreshToken: string) {
        const storedToken = refreshTokensStore[userId];
        if (!storedToken || storedToken !== refreshToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        try {
            const payload = jwt.verify(refreshToken, this.configService.get<string>('JWT_REFRESH_SECRET')) as any;
            const newAccessToken = this.generateAccessToken({ username: payload.username, sub: payload.sub });
            return {
                access_token: newAccessToken,
            };
        } catch (err) {
            throw new UnauthorizedException('Refresh token expired or invalid');
        }
    }

    private generateAccessToken(payload: any): string {
        return jwt.sign(payload, this.configService.get<string>('JWT_SECRET'), {
            expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
        });
    }

    private generateRefreshToken(payload: any): string {
        return jwt.sign(payload, this.configService.get<string>('JWT_REFRESH_SECRET'), {
            expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
        });
    }
}
