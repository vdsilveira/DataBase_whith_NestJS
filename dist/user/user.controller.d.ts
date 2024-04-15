import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").user>;
    findAll(): Promise<import("./entities/user.entity").user[]>;
    findOne(email: string, senha: string): Promise<import("./entities/user.entity").user>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("./entities/user.entity").user>;
    remove(id: string): Promise<import("./entities/user.entity").user>;
}
