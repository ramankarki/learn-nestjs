import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';
import { Report } from '../reports/reports.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log(`Inserted user with email: ${this.email}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated user with email: ${this.email}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed user with email: ${this.email}`);
  }
}
