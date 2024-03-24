import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/DB/schemas/user.schema";
import * as bcrypt from "bcrypt";
import { EmailSendingService } from "src/common/servicies/send-email.service";
import { JwtService } from "@nestjs/jwt";




@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>,
        private emailSendingService: EmailSendingService,
        private jwtService: JwtService
    ) { }

    getHello(): string {
        return 'Hello World!';
    }

    //signUp endpoint
    async signUp(req,body: any) {
        const { name, email, password } = body;

        const isIxist = await this.userModel.findOne({ email })
        if (isIxist) { throw new ConflictException('duplicated email') }

        const hashedPassword = bcrypt.hashSync(password, 9)


        //send email confirmation
        const token = this.jwtService.sign(email, { secret: "secret" })
        const confirmationLink = `${req.protocol}://${req.headers.host}/auth/confirm-email/${token}`
        const isEmailSent = await this.emailSendingService.sendEmail(
            email,
            'welcome to our app',
            `<h1>Click on the link bellow to confirm your email</h1>
            <a href="${confirmationLink}">Confirm Email</a>`,
        )
        if (!isEmailSent) {
            throw new InternalServerErrorException('failed to send email')
        }
        const newUser = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
            isVerified: false
        })


        return newUser;
    }

    //confirm email endpoint
    async confirmEmail(req: any) {
        const token = req.params.token;
        const isVerified = await this.jwtService.verify(token, { secret: "secret" })
        if (!isVerified) {
            throw new InternalServerErrorException('failed to verify email')
        }
        console.log(isVerified)
        const user = await this.userModel.findOneAndUpdate({ email: isVerified.email, isVerified: false }, { isVerified: true })
        if (!user) {
            throw new InternalServerErrorException('failed to confirm email')
        }
        return true;

    }

    //signIn endpoint
    async signIn(req: any) {
        const { email, password } = req.body;
        const user = await this.userModel.findOne({ email })
        if (!user) { throw new InternalServerErrorException('user not found') }
        const isMatch = bcrypt.compareSync(password, user.password)
        if (!isMatch) { throw new InternalServerErrorException('invalid password') }
        const token = this.jwtService.sign({ email, _id: user._id }, { secret: "secret" })
        return { token }
    }
}

