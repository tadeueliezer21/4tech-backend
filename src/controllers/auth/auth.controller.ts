import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { LoginViewModel } from 'src/domain/login.viewmodel';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post()
    login(@Body() login: LoginViewModel) {
        return this.authService.userLogin(login);
    }

}
