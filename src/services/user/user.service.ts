import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository/user-repository';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { LoginViewModel } from 'src/domain/login.viewmodel';

@Injectable()
export class UserService {
    constructor(readonly userRepository: UserRepository) {

    }
    usersReturn() {
        return this.userRepository.getUsers();
    }
    createNewUser(newUser: UserViewModel) {
        const userList = this.userRepository.getUsers();

        const existingUser = userList.find(x => x.userName === newUser.userName);
        if (existingUser) {
            throw new BadRequestException('This username alread exists');
        }
        return this.userRepository.createUser(newUser);
    }

    attemptLogin(login: LoginViewModel) {
        const userList = this.userRepository.getUsers();

        const foundLogin = userList.find(
            x =>
                x.userName === login.userLogin &&
                x.userPassword === login.userPassword
        )
        if(foundLogin){
            return foundLogin;
        }
    }
}
