import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { users } from './users';
const USERS_PATH = path.join(__dirname, 'users.json');

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
        return {
            access_token: jwt.sign(payload, this.configService.get<string>('JWT_SECRET'), { expiresIn: '1h' }),
        };
    }
}
