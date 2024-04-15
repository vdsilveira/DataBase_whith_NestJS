"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const Repository_1 = require("typeorm/repository/Repository");
const typeorm_1 = require("@nestjs/typeorm");
let UserService = class UserService {
    constructor(repository) {
        this.repository = repository;
    }
    create(dto) {
        const User = this.repository.create(dto);
        return this.repository.save(User);
    }
    findAll() {
        return this.repository.find();
    }
    async findOne(email, senha) {
        const user = await this.repository.findOne({ where: { email, senha } });
        if (!user)
            return null;
        return user;
    }
    async update(id, dto) {
        const user = await this.repository.findOne({ where: { id } });
        if (!user)
            return null;
        this.repository.merge(user, dto);
        return this.repository.save(user);
    }
    async remove(id) {
        const user = await this.repository.findOne({ where: { id } });
        if (!user)
            return null;
        return this.repository.remove(user);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.user)),
    __metadata("design:paramtypes", [Repository_1.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map