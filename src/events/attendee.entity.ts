import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';

@Entity()
export class Attendee {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @ManyToOne(() => Event, (event) => event.attendees, {
    nullable: false,
  })
  @JoinColumn()

  // Below code can be configured to the Many to One defined file only
  // @JoinColumn({
  //   name: 'event_id',
  //   referencedColumnName: 'secondary',
  // })
  event: Event;
}
