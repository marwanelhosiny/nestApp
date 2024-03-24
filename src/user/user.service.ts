import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../DB/schemas/user.schema";
import { EmailSendingService } from "src/common/servicies/send-email.service";
import { JwtService } from "@nestjs/jwt";




@Injectable()

export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private emailSendingService: EmailSendingService,
        private jwtService: JwtService 
    ){

    }
    //get user data endpoint
    async getUserData(req) {
        const  _id  = req.authUser._id
        const user = await this.userModel.findById(_id)
        if (!user) { throw new BadRequestException('somthing went wrong') }
        return user
    }

    //update user endpoint
    async updateUser(req) {
        const { name , email } = req.body
        const { _id  } = req.authUser
        
        let user:{} ;
        if(name){
             user = await this.userModel.findByIdAndUpdate(_id, { name }, { new: true })
            if (!user) { throw new BadRequestException('somthing went wrong') }
        }
        if(email){
            const checkEmail = await this.userModel.findOne({ email: email})
            if(checkEmail){
                throw new BadRequestException('email already exist')
            }
             user = await this.userModel.findByIdAndUpdate(_id, { email , isVerified:false }, { new: true })
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
            if (!user) { throw new BadRequestException('somthing went wrong') }
        }

        return user
    }

    //delete user endpoint
    async deleteUser(req) {
        const { _id } = req.authUser
        const user = await this.userModel.findByIdAndDelete(_id)
        if (!user) { throw new BadRequestException('somthing went wrong') }
        return user
    }

}