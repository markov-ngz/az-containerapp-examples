export class ContactReadCosmosDto {
    id: string;
    firstName: string;  // Correspond à "firstName" dans le JSON
    lastName: string;   // Correspond à "lastName" dans le JSON
    email: string;
    _rid: string;
    _self: string;
    _etag: string;
    _attachments: string;
    _ts: number;
}
