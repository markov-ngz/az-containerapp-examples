import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import cosmosconfiguration from './contact/config/cosmosConfig.interface';
import { ContactModule } from './contact/contact.module';
import { ContactController } from './contact/contact.controller';
import { ContactService } from './contact/contact.service';
@Module({
  imports: [    
    ConfigModule.forRoot({
       isGlobal: true,
       envFilePath: '.env',
       load: [cosmosconfiguration, ]
    }),
    ContactModule,
  ],
  controllers: [AppController, ContactController],
  providers: [AppService, ContactService],
})
export class AppModule {}
