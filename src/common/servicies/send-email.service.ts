import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer"





@Injectable()
export class EmailSendingService {
    async sendEmail(
        to: string | string[],
        subject: string,
        message: string,
        attachments?: []
    ) {
        //email configration
        const transporter = nodemailer.createTransport({
            host: "localhost",
            service: "gmail",
            port: 587,
            secure: false,
            auth: {
                user: "elhosinymarwan29@gmail.com",
                pass: "ncewopxgcsdxctgt"
            }
        })

        const info = await transporter.sendMail({
            from: `elhosinymarwan29@gmail.com"`,
            to: to ? to : '',
            subject: subject ? subject : 'No reply',
            html: message ? message : '',
            attachments
        })
        if (info.accepted.length){
            return true
        }

        return false
    }
}