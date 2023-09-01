import { Entity, Column, PrimaryGeneratedColumn, AfterInsert } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;


  @AfterInsert()
  logInset() {
    console.log('Inserted new user with id: ' + this.id);
  }
}
