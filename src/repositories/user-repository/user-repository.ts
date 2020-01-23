import { Injectable, BadRequestException } from '@nestjs/common';
import { UserViewModel } from 'src/domain/user.viewmodel';

@Injectable()
export class UserRepository {

    db: UserViewModel[] = [
        new UserViewModel('cadastro0', 'cadastro0', 'senha0'),
        new UserViewModel('cadastro1', 'cadastro1', 'senha1'),
        new UserViewModel('cadastro2', 'cadastro2', 'senha2'),
        new UserViewModel('cadastro3', 'cadastro3', 'senha3')
    ];

    getUsers() {
        return this.db;
    }

    createUser(newUser: UserViewModel) {
        this.db.push(newUser);
        return 'User successfully added!';
    }
    dell(id: number) {
        return this.db.splice(id, id);
    }
    change(user: UserViewModel) {

        const idUser = this.db.findIndex(x => x.userLogin === user.userLogin);

        if (idUser == -1 || idUser === undefined || idUser === null) {
            throw new BadRequestException('Invalid user');
        } else {
            this.db[idUser].userName = user.userName;
            this.db[idUser].userPassword = user.userPassword;

            return this.db[idUser];
        }

    }
}
