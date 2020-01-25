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
    async createNewUser(newUser: UserViewModel) {
        const userList = await this.userRepository.getUsers();

        const existingUser = userList.find(x => x.userName === newUser.userName || x.userLogin === newUser.userLogin);
        if (existingUser) {
            throw new BadRequestException('This username alread exists');
        }
        return this.userRepository.createUser(newUser);
    }

    async attemptLogin(login: LoginViewModel) {
        const userList = await this.userRepository.getUsers();

        const foundLogin = userList.find(
            x =>
                x.userLogin === login.userLogin &&
                x.userPassword === login.userPassword
        )
        
        if (foundLogin) {
            return foundLogin;
        }
    }
    deleteUser(id: number) {
        return this.userRepository.dell(id);
    }
    changeUserService(user: UserViewModel) {
        return this.userRepository.change(user);
    }
    // addUserList(list: UserViewModel[]){
    //     return list;
    // }
}
