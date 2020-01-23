import { Controller, Get, Post, Body, Delete, Param, UseGuards, Put } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    // @UseGuards(AuthGuard('jwt'))
    @Get()
    retornarUsuarios() {
        return this.userService.usersReturn();
    }

    // @UseGuards(AuthGuard('jwt'))
    @Post()
    criarUsuarios(@Body() newUser: UserViewModel) {
        return this.userService.createNewUser(newUser);
    }

    @Delete('remove:id')
    delete(@Param('id') id: number) {
        return this.userService.deleteUser(id);
    }

    @Put('change')
    changeUser(@Body() user: UserViewModel) {
        return this.userService.changeUserService(user);
    }
}