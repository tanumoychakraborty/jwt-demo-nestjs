import { AuthService } from './auth/auth.service';
export declare class AppController {
    private readonly authService;
    constructor(authService: AuthService);
    getProfile(req: any): Promise<string | import("jsonwebtoken").JwtPayload>;
}
