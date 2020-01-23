import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

//Nunca deve ser exposta publicamente
//
// A chave secreta só está a mostra a fins de deixar claro o que 
// o codigo está fazendo. Em um ambiente de produção, a chave deve
// estar protegita por medidas apropriadas ( como por exemplo )
//secret vaults, variaveis de ambiente ou serviços de configurações

export const secretKey = 'ronaldinho';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secretKey,
        });
    }

    async validate(playload: any) {
        return { userId: playload.userLogin }
    }
}