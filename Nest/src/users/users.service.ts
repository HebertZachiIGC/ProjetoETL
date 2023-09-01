import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  //GET USERS
  async getAll() {
    return await this.repo.find();
  }

  getOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  getByAtribute(email: string) {
    return this.repo.find({ where: { email } });
  }

  getById(email: string) {
    return this.repo.find({ where: { email } });
  }

  // getByAtribute(email: string) {
  //   return this.repo.find({email});
  // }

  //CREATE USER

  create(email: string, password: string) {
    const newUser = this.repo.create({ email, password });
    return this.repo.save(newUser);
  }


  //UPDATE USER
  //attrs é um objeto que você pode passar 
  async update(id: number, attrsUser: Partial<UserEntity>){
    const UserEntity = await this.getOne(id);
    if (!UserEntity){
      throw new Error('user not found');
    }
    Object.assign(UserEntity, attrsUser);
    return this.repo.save(UserEntity);
  }

  //DELETE USER
  async delete(id: number){
    const UserEntity = await this.getOne(id);
    if (!UserEntity){
      throw new Error('user not found');
    }
    // C
    return this.repo.remove(UserEntity);
  }


  // remove(id: number) {
  //   return this.repo.delete({ id });
  

}

