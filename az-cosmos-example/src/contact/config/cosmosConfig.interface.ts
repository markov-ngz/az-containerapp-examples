import { registerAs } from "@nestjs/config";

export interface CosmosConfig {
  endpoint: string;
  clientId: string;
  clientSecret: string;
  tenantId: string;
  databaseId: string,
  containerId:string
}

function getRequiredEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}
export default registerAs('cosmosconfiguration',()=> ({
    endpoint: getRequiredEnvVar('AZURE_COSMOS_ENDPOINT'),
    clientId: getRequiredEnvVar('AZURE_COSMOS_CLIENT_ID'),
    clientSecret: getRequiredEnvVar('AZURE_COSMOS_CLIENT_SECRET'),
    tenantId: getRequiredEnvVar('AZURE_COSMOS_TENANT_ID'),
    databaseId:getRequiredEnvVar('AZURE_COSMOS_DATABASE_ID'),
    containerId:getRequiredEnvVar('AZURE_COSMOS_CONTAINER_ID'),
}));

// export interface HelloInterface {
//   hello : string
// }
// example
// export const hello = registerAs<HelloInterface>('hello',()=>({hello : 'Dzien Dobry'})) ; 
