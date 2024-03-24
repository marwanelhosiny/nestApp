import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../DB/schemas/user.schema";
import { Model } from "mongoose";



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try{const req = context.switchToHttp().getRequest()
        const { accesstoken } = req.headers
        if (!accesstoken) { throw new BadRequestException('missing accesstoken') }

        const prefix = accesstoken.startsWith("xDfeDp")
        if (!prefix) { throw new BadRequestException('invalid prefix') }

        const token = accesstoken.slice(6)
        const verifiedToken = this.jwtService.verify(token, { secret: 'secret' })

        if (!verifiedToken || !verifiedToken._id) { throw new BadRequestException('invalid token payload') }

        //checking if user is deleted or role updated while using an old valid token
        const stillExist = await this.userModel.findById(verifiedToken._id, 'name email _id')
        if (!stillExist) { throw new BadRequestException('invalid token payload') }
        req.authUser = stillExist
        return req}catch (err) {
            throw new BadRequestException('authentication error')
        }
    }
}