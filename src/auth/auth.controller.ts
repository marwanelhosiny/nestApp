import { Body, Controller, Get, Post, Put, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { signupBodyDto } from "./auth.dto";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Get('test')
    getHello(): string {
        return this.authService.getHello();
    }

    @Post('signUp')
    async signUp(
        @Body() body: signupBodyDto,
        @Req() req: Request,
        @Res() res: Response
    ) {
        const Response = await this.authService.signUp(req,body)
        res.status(200).json({
            message: Response
        });
    }

    @Get('confirm-Email/:token')
    async confirmEmail(
        @Req() req: Request,
        @Res() res: Response
    ) {
        const Response = await this.authService.confirmEmail(req)
        res.status(200).json({
            message: Response
        });
    }

    @Post('signIn')
    async signIn(
        @Req() req: Request,
        @Res() res: Response
    ) {
        const Response = await this.authService.signIn(req)
        res.status(200).json({
            message: Response
        });
    }

}