import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, MoreThan, Repository } from 'typeorm';

@Controller('/events')
export class EventsController {
  // private events: Event[] = [];
  private readonly logger = new Logger(EventsController.name);
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  @Get()
  async findAll() {
    // return this.events;
    this.logger.log(`Hit the findAll route`);
    const events = await this.repository.find();
    this.logger.debug(`Found ${events.length} events`);
    return events;
  }

  @Get('/practice')
  async practice() {
    return await this.repository.find({
      select: ['id', 'when'],
      where: [
        {
          id: MoreThan(3),
          when: MoreThan(new Date('2021-02-12T13:00:00')),
        },
        {
          description: Like('%meet%'),
        },
      ],
      take: 2,
      order: {
        id: 'DESC',
      },
    });
  }

  @Get('/practice2')
  async practice2() {
    return await this.repository.findOne({
      where: { id: 1 },
      relations: ['attendees'],
      // loadEagerRelations: false,
    });
    // return await this.repository.findOneBy({ id: 1 });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    /* const event = this.events.find((event) => event.id === parseInt(id));
    return event; */
    console.log(typeof id);

    const event = await this.repository.findOneBy({ id });

    if (!event) {
      throw new NotFoundException();
    }

    return event;
  }

  @Post()
  // To use global ValidationPipe we can remove this ValidationPipe from here:

  // async create(@Body(ValidationPipe) input: CreateEventDto) {
  // async create(
  //   @Body(new ValidationPipe({ groups: ['create'] })) input: CreateEventDto,
  // ) {
  async create(@Body() input: CreateEventDto) {
    // const event = {
    //   ...input,
    //   when: new Date(input.when),
    //   id: this.events.length + 1,
    // };
    // this.events.push(event);
    // return event;

    // If tried to save a already existing value, it will just update it
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
    });
  }
  @Patch(':id')
  // We are using Global ValidationPipe so currently commenting below line:

  // async update(
  //   @Param('id') id,
  //   @Body(new ValidationPipe({ groups: ['update'] })) input: UpdateEventDto,
  // ) {
  async update(@Param('id') id, @Body() input: UpdateEventDto) {
    // const index = this.events.findIndex((event) => event.id === parseInt(id));
    // this.events[index] = {
    //   ...this.events[index],
    //   ...input,
    //   when: input.when ? new Date(input.when) : this.events[index].when,
    // };

    // return this.events[index];
    const index = await this.repository.findOne(id);
    return await this.repository.save({
      ...index,
      ...input,
      when: input.when ? new Date(input.when) : index.when,
    });
  }
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id) {
    // this.events = this.events.filter((event) => event.id !== parseInt(id));
    const event = await this.repository.findOneBy({ id });

    if (!event) {
      throw new NotFoundException();
    }

    await this.repository.remove(event);
  }
}
