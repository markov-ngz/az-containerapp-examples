import { Injectable, Logger } from "@nestjs/common";
import { ContactDto } from "./dtos/contact.dto";
import { ConfigService } from "@nestjs/config";
import { CosmosConfig } from "./config/cosmosConfig.interface";
import { Container, CosmosClient, Database } from '@azure/cosmos';
import { ClientSecretCredential } from '@azure/identity'; 
import { ContactReadCosmosDto } from "./dtos/contact-read-cosmos.dto";
@Injectable()
export class ContactService {

  private readonly logger = new Logger(ContactService.name);

  private readonly cosmosConfig: CosmosConfig;

  private client: CosmosClient;
  private database: Database;
  private container: Container;


  constructor(private configService: ConfigService) {
    this.cosmosConfig = this.configService.get<CosmosConfig>('cosmosconfiguration')!;
    this.initializeClient();
  }

  private async initializeClient(): Promise<void> {
    try {
      this.logger.log('Init connection to Cosmos DB');
      // Création des credentials avec l'inscription d'application
      const credential = new ClientSecretCredential(
        this.cosmosConfig.tenantId,
        this.cosmosConfig.clientId,
        this.cosmosConfig.clientSecret
      );
      this.client = new CosmosClient({
        endpoint: this.cosmosConfig.endpoint,
        aadCredentials: credential
      });

      this.database = this.client.database( this.cosmosConfig.databaseId);
      this.container = this.database.container(this.cosmosConfig.containerId);

      this.logger.log('Connexion to CosmosDB established');

    }catch (error) {
      this.logger.fatal(`Failed to connect to CosmosDB : ${error}`);
      throw error;
    }
  }


  async findAll(): Promise<ContactDto[]> {
    const result  = await this.container.items
    .query('SELECT * FROM c')
    .fetchAll();
    if(! result?.resources){
      this.logger.error('Key resources could not be found from Cosmos Query response');
      throw new Error('Key resources could not be found from Cosmos Query response');
    }
    const contacts : ContactDto[] = result.resources.map(contact =>( {
      id: contact.id , 
      lastName: contact.lastName ,
      firstName: contact.firstName ,
      email: contact.email
    })); 
    return contacts ; 
  }

  async findOne(id: string): Promise<ContactDto> {
    this.logger.log(`Fetching information for source ${id}`);
    const result = await this.container.items.query({
        query: 'SELECT * FROM c WHERE c.id = @id',
        parameters: [{ name: '@id', value: id }]
    }).fetchAll();

    if(! result?.resources){
      this.logger.error('Key resources could not be found from Cosmos Query response');
      throw new Error('Key resources could not be found from Cosmos Query response');
    }

    const resource = result.resources ; 

    if (resource.length > 0) {
        this.logger.log(`successfully fetched contact : ${id}`);
        return {
          id: resource[0].id , 
          lastName: resource[0].lastName ,
          firstName: resource[0].firstName ,
          email: resource[0].email
        };
    } else {
      this.logger.error(`Contact with Id ${id} not found`);
      throw new Error(`Contact with Id ${id} not found`); 
    }
  }
}