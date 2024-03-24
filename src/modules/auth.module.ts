import { Module } from "@nestjs/common";
import { AuthController } from "../auth/auth.controller";
import { AuthService } from "../auth/auth.service";
import { models } from "src/DB/Model.generation";
import { JwtService } from "@nestjs/jwt";



@Module({
    imports: [models],
    controllers: [AuthController],
    providers: [AuthService,JwtService]
})
export class AuthModule {}