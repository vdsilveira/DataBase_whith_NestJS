import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { user } from './entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(user)
    private readonly repository: Repository<user>,
  ) {}

  create(dto: CreateUserDto) {
    const User = this.repository.create(dto);
    return this.repository.save(User);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(email: string, senha: string) {
    const user = await this.repository.findOne({ where: { email, senha } });
    if (!user) throw new  UnauthorizedException();
    
    return user;
}


  async update(id: string, dto: UpdateUserDto) {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) return null;
    this.repository.merge(user, dto);
    return this.repository.save(user);
  }

  async remove(id: string) {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) return null;
    return this.repository.remove(user);
  }
}
