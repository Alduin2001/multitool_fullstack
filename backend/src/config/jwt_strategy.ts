import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstant } from "./jwtConstant";
import { RequestCookie } from "src/interfaces/request_cookie";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: RequestCookie) => {
                    return request.cookies.jwt;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: jwtConstant.secret
        })
    }
    async validate(payload: any) {
        return { id: payload.id, role: payload.role }
    }
}