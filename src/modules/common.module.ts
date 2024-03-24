import { Global, Module } from "@nestjs/common";
import { EmailSendingService } from "src/common/servicies/send-email.service";



@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [EmailSendingService],
    exports: [EmailSendingService]
})

export class CommonModule {  }