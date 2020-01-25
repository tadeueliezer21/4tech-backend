import { Injectable, BadRequestException } from '@nestjs/common';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/domain/schemas/user.schema';

@Injectable()
export class UserRepository {
    constructor(@InjectModel('User') private readonly userCollection: Model<User>) {

    }

    async getById(userId: string): Promise<User> {
        try {
            return await this.userCollection
                .findOne({ _id: userId })
                .lean();
        } catch (e) {
            throw new BadRequestException('Invalid user');
        }
    }

    async getByCredentials(userLoginFromViewModel: string, passwordLoginFromViewModel: string) {
        return await this.userCollection
            .findOne({
                userLogin: userLoginFromViewModel,
                userPassword: passwordLoginFromViewModel,
            })
    }

    async getUsers(): Promise<User[]> {
        return await this.userCollection
            .find()
            .select({ __v: false, userPassword: false })
            .lean();
    }

    async createUser(newUser: UserViewModel) {
        const user = this.userCollection(newUser);
        return await user.save();
    }
    dell(id: number) {
        return
    }
    change(user: UserViewModel) {

        // const idUser = this.db.findIndex(x => x.userLogin === user.userLogin);

        // if (idUser == -1 || idUser === undefined || idUser === null) {
        //     throw new BadRequestException('Invalid user');
        // } else {
        //     this.db[idUser].userName = user.userName;
        //     this.db[idUser].userPassword = user.userPassword;

        //     return this.db[idUser];
        // }
        return
    }
    // addUserList(list: UserViewModel[]) {
    //     return list;
    // }
}
