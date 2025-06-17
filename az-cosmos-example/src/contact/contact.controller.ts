import { Controller, Get, Param } from "@nestjs/common";
import { ContactDto } from "./dtos/contact.dto";
import { ContactService } from "./contact.service";

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async findAll(): Promise<ContactDto[]> {
    // raw list returned here, note that it is better practice to encapsulate the list within an item like  {"itemsNumber":42, "items":[<your list>]}
    return this.contactService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ContactDto> {
    return this.contactService.findOne(id);
  }

}