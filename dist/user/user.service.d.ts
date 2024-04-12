import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { user } from './entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
export declare class UserService {
    private readonly repository;
    constructor(repository: Repository<user>);
    create(dto: CreateUserDto): Promise<user>;
    findAll(): Promise<user[]>;
    findOne(id: string): Promise<user>;
    update(id: string, dto: UpdateUserDto): Promise<user>;
    remove(id: string): Promise<user>;
}
