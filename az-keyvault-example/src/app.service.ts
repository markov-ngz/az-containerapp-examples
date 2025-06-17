import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  private readonly logger = new Logger(AppService.name);
  
  constructor(private configService: ConfigService) {}
  
  getHello(): string {
    // get example from configuration 
    const example = this.configService.get('example') ;

    // log an error message to be used for Log based alerts 
    this.logger.error("Simple error log message");
    
    // return the environment variable EXAMPLE value 
    return `Dzien dobry ! Jestem ${example.example}`;
  }
}
