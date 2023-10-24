import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity('events') -- Giving name for the table
// @Entity('events', {name: events}) -- Giving name and other options for the table
@Entity()
export class Event {
  @PrimaryGeneratedColumn() // Primary key to auto generated id,uuid,etc
  id: number;

  // @Column('varchar') -- simple columns of table with types being explicity given
  @Column({ length: 100 }) // simple columns of table with other options
  name: string;

  @Column()
  description: string;

  @Column({ name: 'when_date' }) // changing column name from when to when_date
  when: Date;

  @Column()
  address: string;
}
