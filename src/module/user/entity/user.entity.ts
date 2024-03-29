import { UserInterface } from '../interface/user.interface';

import { hash }                                                                                             from 'bcrypt';
import { IsEmail, Min }                                                                                     from 'class-validator';
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('user')
@Unique(['email'])
export class User implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  @Min(8)
  password: string;

  @Column()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({nullable: true})
  lastLogin?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
