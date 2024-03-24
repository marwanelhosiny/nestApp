import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule, CommonModule, UserModule } from './modules';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/nestApp'), CommonModule,
    AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
