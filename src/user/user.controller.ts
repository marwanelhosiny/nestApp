import { Controller, Delete, Get, Put, Req, Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import { AuthGuard } from "src/guards/auth.guard";




@Controller("user")

export class UserController {
    constructor(private readonly userService: UserService ) { 

     }

    @UseGuards(AuthGuard)
    @Get()
    async getUserData(
        @Req() req: Request,
        @Res() res: Response,
    ){

        const Response = await this.userService.getUserData(req);
        res.status(200).json(Response);
    } 

    @UseGuards(AuthGuard)
    @Put("updateUser")
    async updateUser(
        @Req() req: Request,
        @Res() res: Response){
            const Response = await this.userService.updateUser(req);
            res.status(200).json(Response);
        }

    @UseGuards(AuthGuard)
    @Delete("deleteUser")
    async deleteUser(
        @Req() req: Request,
        @Res() res: Response){
            const Response = await this.userService.deleteUser(req);
            res.status(200).json(Response);
        }

}   
