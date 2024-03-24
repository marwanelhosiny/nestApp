import { Module } from "@nestjs/common";
import { models } from "src/DB/Model.generation";
import { UserController } from "../user/user.controller";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";





@Module({
    imports: [models],
    controllers: [UserController],
    providers: [UserService,JwtService],
    exports: []
})

export class UserModule { }