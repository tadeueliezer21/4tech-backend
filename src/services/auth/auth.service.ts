import { Injectable, BadRequestException } from '@nestjs/common';
import { LoginViewModel } from 'src/domain/login.viewmodel';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    userLogin(login: LoginViewModel) {
        const user = this.userService.attemptLogin(login);
        if (user) {
            return 'Authenticated';
        } else {
            throw new BadRequestException('User Login or Password are Incorrect');
        }
    }
}
