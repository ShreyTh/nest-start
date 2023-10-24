import { IsDateString, IsString, Length } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @Length(5, 255, { message: 'The name length is wrong' })
  name: string;
  @Length(5, 255)
  description: string;
  @IsDateString()
  when: string;

  // We are using global ValidationPipe so wont need such ValidationGroups:

  // @Length(5, 255, { groups: ['create'] })
  // @Length(10, 20, { groups: ['update'] })
  @Length(5, 255)
  @Length(10, 20)
  address: string;
}
